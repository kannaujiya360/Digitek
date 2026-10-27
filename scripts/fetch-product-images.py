"""Download researched product photos; retain an audit manifest, never substitute models."""
import concurrent.futures, hashlib, html, json, re, subprocess, tempfile
from pathlib import Path
from urllib.parse import urljoin, urlparse
ROOT=Path(__file__).resolve().parent.parent
manifest=ROOT/'src/data/image-sources.json'
entries=json.loads(manifest.read_text())

def fetch(url,path):
    result=subprocess.run(['curl','--silent','--show-error','--fail','--location','--max-time','25','--max-filesize','10000000',url,'--output',str(path)],capture_output=True,text=True)
    if result.returncode:raise RuntimeError(result.stderr.strip()[-160:])

def photo_url(entry,temp):
    if entry.get('imageUrl'):return entry['imageUrl']
    page=temp/'page.html';fetch(entry['sourcePage'],page);markup=page.read_text(errors='replace')
    # Only read public product metadata, no login/session/cookie handling.
    for tag in re.findall(r'<meta\b[^>]*>',markup,re.I):
        if re.search(r'(?:property|name)\s*=\s*[\"\'](?:og:image|twitter:image)[\"\']',tag,re.I):
            match=re.search(r'content\s*=\s*[\"\']([^\"\']+)',tag,re.I)
            if match:
                url=urljoin(entry['sourcePage'],html.unescape(match[1]))
                if not re.search(r'logo|placeholder|favicon|banner',url,re.I):return url
    raise RuntimeError('No unambiguous product photo in public page metadata')

def process(entry):
    if entry.get('status')=='unavailable':return entry
    if entry.get('status')=='downloaded' and (ROOT/'public'/entry['localPath'].lstrip('/')).is_file():return entry
    try:
        with tempfile.TemporaryDirectory(prefix='digitek-image-') as d:
            temp=Path(d);url=photo_url(entry,temp);asset=temp/'photo';fetch(url,asset)
            data=asset.read_bytes()
            if data.startswith(b'\xff\xd8\xff'):ext='jpg'
            elif data.startswith(b'\x89PNG\r\n'):ext='png'
            elif data[:4]==b'RIFF' and data[8:12]==b'WEBP':ext='webp'
            else:raise RuntimeError('Response is not a JPEG, PNG or WebP image')
            if len(data)<1500:raise RuntimeError('Image too small to verify')
            info=subprocess.run(['sips','-g','pixelWidth','-g','pixelHeight',str(asset)],capture_output=True,text=True)
            dims=re.findall(r'pixel(?:Width|Height):\s*(\d+)',info.stdout)
            if len(dims)!=2 or min(map(int,dims))<150:raise RuntimeError('Image dimensions unavailable or below 150px')
            path='/images/products/'+entry['key']+'.'+ext
            target=ROOT/'public'/path.lstrip('/');target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(data)
            entry.update(imageUrl=url,localPath=path,status='downloaded',width=int(dims[0]),height=int(dims[1]),sha256=hashlib.sha256(data).hexdigest())
            entry.pop('error',None)
    except Exception as e:
        entry['status']='unavailable';entry['error']=str(e)
    print(entry['key']+': '+entry['status'],flush=True)
    return entry

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:results=list(pool.map(process,entries))
manifest.write_text(json.dumps(results,indent=2,ensure_ascii=False)+'\n')
print('Downloaded:',sum(e['status']=='downloaded' for e in results),'of',len(results))
