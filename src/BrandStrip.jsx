import {useState} from 'react';
import {Pause,Play} from 'lucide-react';
import brands from './data/brands.json';

export default function BrandStrip(){
  const [paused,setPaused]=useState(false);
  return <section className="brands brand-marquee" aria-label="Brands available at DigiTek">
    <div className="brand-strip-heading"><span>THE BRANDS YOU TRUST. ALL UNDER ONE ROOF.</span><button onClick={()=>setPaused(value=>!value)} aria-label={paused?'Play brand animation':'Pause brand animation'}>{paused?<Play size={15}/>:<Pause size={15}/>}<span>{paused?'Play':'Pause'}</span></button></div>
    <div className="brand-marquee-window"><div className={'brand-marquee-track'+(paused?' is-paused':'')}>
      {[0,1].map(copy=><div className="brand-marquee-group" key={copy} aria-hidden={copy===1}>{brands.map(brand=><div key={brand.name} className="brand-logo-card" style={{'--brand-colour':brand.colour}}><img className={['HP','Dell'].includes(brand.name)?'brand-symbol':'brand-wordmark'} src={brand.image} alt={copy===0?brand.name:''} width="128" height="128"/></div>)}</div>)}
    </div></div>
    <small>Explore leading brands for your home and business.</small>
  </section>;
}
