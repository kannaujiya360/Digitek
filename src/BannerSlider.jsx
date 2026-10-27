import {useEffect,useState} from 'react';
import {Pause,Play} from 'lucide-react';
import banners from './data/banners.json';

const SLIDE_INTERVAL=5000;
const TRANSITION_DURATION=650;

export default function BannerSlider(){
  const [position,setPosition]=useState(1);
  const [animate,setAnimate]=useState(false);
  const [paused,setPaused]=useState(()=>typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [pageVisible,setPageVisible]=useState(()=>typeof document==='undefined'||!document.hidden);
  const multiple=banners.length>1;
  const active=(position-1+banners.length)%banners.length;
  const slides=multiple?[banners[banners.length-1],...banners,banners[0]]:banners;

  // After the left-hand clone enters, reset to its identical original without animation.
  useEffect(()=>{
    if(!multiple||position!==0)return;
    const reset=window.setTimeout(()=>{setAnimate(false);setPosition(banners.length)},TRANSITION_DURATION+50);
    return()=>window.clearTimeout(reset);
  },[position,multiple]);

  useEffect(()=>{
    const updateVisibility=()=>setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange',updateVisibility);
    return()=>document.removeEventListener('visibilitychange',updateVisibility);
  },[]);

  useEffect(()=>{
    if(!multiple||paused||!pageVisible)return;
    const timer=window.setInterval(()=>{setAnimate(true);setPosition(current=>current-1)},SLIDE_INTERVAL);
    return()=>window.clearInterval(timer);
  },[multiple,paused,pageVisible]);

  if(!banners.length)return null;
  return <section className="banner-slider banner-autoplay" aria-label="DigiTek featured banners" aria-roledescription="carousel">
    <div className="banner-viewport banner-loop-viewport" style={{aspectRatio:`${banners[0].width} / ${banners[0].height}`}}>
      <div className="banner-track" style={{transform:`translateX(-${multiple?position*100:0}%)`,transition:animate?`transform ${TRANSITION_DURATION}ms cubic-bezier(.22,.61,.36,1)`:'none'}}>
        {slides.map((banner,index)=>{
          const clone=multiple&&(index===0||index===slides.length-1);
          const visible=multiple?index===position:true;
          return <div key={`${banner.id}-${index}`} className="banner-loop-slide" aria-hidden={clone||!visible} role={clone?undefined:'group'} aria-roledescription={clone?undefined:'slide'} aria-label={clone?undefined:`${index} of ${banners.length}`}><img src={banner.image} alt={clone?'':banner.alt} width={banner.width} height={banner.height} loading="eager" fetchPriority={index===1?'high':'auto'}/></div>;
        })}
      </div>
    </div>
    {multiple&&<div className="banner-controls">
      <div className="banner-indicators" aria-hidden="true">{banners.map((banner,index)=><span key={banner.id} className={index===active?'is-active':''}/>)}</div>
      <span className="banner-counter" aria-hidden="true">{active+1} / {banners.length}</span>
      <button className="banner-pause" onClick={()=>setPaused(current=>!current)} aria-label={paused?'Play banner slideshow':'Pause banner slideshow'}>{paused?<Play size={15}/>:<Pause size={15}/>}<span>{paused?'Play':'Pause'}</span></button>
    </div>}
  </section>;
}
