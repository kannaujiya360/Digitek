"""Apply only downloaded, visually reviewed model/colour photographs."""
import csv,json
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
path=ROOT/'src/data/products.json'
products=json.loads(path.read_text())
original={p['id']:{k:v for k,v in p.items() if k not in ('image','images','imageSource','imageNote')} for p in products}
entries=json.loads((ROOT/'src/data/image-sources.json').read_text())
by_id={p['id']:p for p in products}
updated=set()
for entry in entries:
    if entry['status']!='downloaded':continue
    assert (ROOT/'public'/entry['localPath'].lstrip('/')).is_file(),entry['key']
    for product_id in entry['productIds']:
        product=by_id[product_id]
        product['image']=entry['localPath']
        product['imageSource']=entry['sourcePage']
        if entry.get('matchType')=='model-colour-reference' or len(entry['productIds'])>1 or product_id in (1002,1011):
            product['imageNote']='Model and colour reference. Memory, storage and software follow the specifications listed below.'
        else:product.pop('imageNote',None)
        updated.add(product_id)
# User-supplied photos take priority over downloaded images on every run.
override_path=ROOT/'src/data/user-image-overrides.json'
if override_path.exists():
    for product_id,override in json.loads(override_path.read_text()).items():
        product=by_id[int(product_id)]
        assert (ROOT/'public'/override['image'].lstrip('/')).is_file()
        product['image']=override['image']
        product['imageSource']=override['imageSource']
        if override.get('images'):
            assert all((ROOT/'public'/image.lstrip('/')).is_file() for image in override['images'])
            product['images']=override['images']
        if override.get('imageNote'):product['imageNote']=override['imageNote']
        else:product.pop('imageNote',None)
        updated.add(int(product_id))
assert len(products)==len(original)
for p in products:assert {k:v for k,v in p.items() if k not in ('image','images','imageSource','imageNote')}==original[p['id']],p['id']
path.write_text(json.dumps(products,indent=2,ensure_ascii=False)+'\n')
missing=[p for p in products if p.get('active',True) and not (ROOT/'public'/p['image'].lstrip('/')).is_file()]
with (ROOT/'src/data/photos-needed.csv').open('w') as f:
    w=csv.writer(f);w.writerow(['id','product','colour','photo_path'])
    for p in missing:w.writerow([p['id'],p['name'],p.get('specifications',{}).get('Colour','Not specified'),p['image']])
print(f'Applied researched photos to {len(updated)} shop products; {len(missing)} products await confirmed photos.')
print(f'All {len(products)} product IDs, names, prices and specifications preserved.')
