import React,{useState,useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {Facebook,Instagram,MessageCircle,Search,ShoppingBag,Heart,ArrowUpRight,ArrowRight,ChevronRight,MapPin,Phone,ShieldCheck,Truck,Headphones,Monitor,Printer,Camera,Laptop,Keyboard,Armchair,Menu,X,Minus,Plus,Check,Star,SlidersHorizontal} from 'lucide-react';
import './styles.css';
const whatsappContacts=[{number:'919415031468',label:'+91 94150 31468'},{number:'918318351646',label:'+91 83183 51646'}];
const whatsappLink=number=>'https://wa.me/'+number+'?text='+encodeURIComponent('Hello DigiTek! I would like to enquire about your products. Please help me find the right option.');
function XSocialIcon({size=22,...props}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.472l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z"/></svg>}
const socialLinks=[{name:'Facebook',handle:'DigiTek Computer Associate',url:'https://www.facebook.com/digitek.computer.associate',Icon:Facebook,style:'facebook'},{name:'Instagram',handle:'@digitek.12',url:'https://www.instagram.com/digitek.12/',Icon:Instagram,style:'instagram'},{name:'X',handle:'@digitekoficial',url:'https://x.com/digitekoficial',Icon:XSocialIcon,style:'x-social'}];
const money=n=>'₹'+n.toLocaleString('en-IN');
const categories=[['All products',Monitor],['Laptops',Laptop],['Desktops',Monitor],['Printers',Printer],['CCTV & Security',Camera],['Toner & Cartridges',Printer]];
export const products=[
  {
    "id": 1,
    "name": "HP All-in-One Desktop",
    "category": "Desktops",
    "spec": "Desktop \u00b7 Monitor, keyboard & mouse",
    "price": 52990,
    "old": 64990,
    "rating": "4.8",
    "tag": "BESTSELLER",
    "image": "/images/desktop9.jpg",
    "color": "#f1f3ef"
  },
  {
    "id": 2,
    "name": "Canon PIXMA Ink Tank Printer",
    "category": "Printers",
    "spec": "Colour printing \u00b7 Refillable ink tank",
    "price": 13999,
    "old": 17995,
    "rating": "4.8",
    "tag": "GREAT VALUE",
    "image": "/images/printer1.jpg",
    "color": "#f4f0e9"
  },
  {
    "id": 3,
    "name": "Trueview Indoor Security Camera",
    "category": "CCTV & Security",
    "spec": "Indoor camera \u00b7 Home & office monitoring",
    "price": 2499,
    "old": 3499,
    "rating": "4.8",
    "tag": "POPULAR",
    "image": "/images/cctc1.jpg",
    "color": "#edf1f2"
  },
  {
    "id": 4,
    "name": "HP Everyday Laptop",
    "category": "Laptops",
    "spec": "14th Gen Intel Core i5 \u00b7 Everyday productivity",
    "price": 48990,
    "old": 59990,
    "rating": "4.8",
    "tag": "SMART BUY",
    "image": "/images/desktop8.jpg",
    "color": "#f3ede5"
  },
  {
    "id": 5,
    "name": "GPS Laser Toner Cartridge",
    "category": "Toner & Cartridges",
    "spec": "12 / FX9 / 303 \u00b7 Check printer compatibility",
    "price": 799,
    "old": 1199,
    "rating": "4.8",
    "tag": "BESTSELLER",
    "image": "/images/toner1.jpg",
    "color": "#f1f3ef"
  },
  {
    "id": 6,
    "name": "JK Compatible Toner Cartridge",
    "category": "Toner & Cartridges",
    "spec": "Office printing \u00b7 Check printer compatibility",
    "price": 899,
    "old": 1299,
    "rating": "4.8",
    "tag": "GREAT VALUE",
    "image": "/images/toner2.jpg",
    "color": "#f4f0e9"
  },
  {
    "id": 7,
    "name": "HP Smart Tank Printer",
    "category": "Printers",
    "spec": "Colour printing \u00b7 Refillable ink system",
    "price": 16990,
    "old": 20990,
    "rating": "4.8",
    "tag": "POPULAR",
    "image": "/images/printer3.jpg",
    "color": "#edf1f2"
  },
  {
    "id": 8,
    "name": "Acer Aspire One Laptop",
    "category": "Laptops",
    "spec": "Intel Celeron \u00b7 14-inch HD display",
    "price": 24990,
    "old": 31990,
    "rating": "4.8",
    "tag": "SMART BUY",
    "image": "/images/desktop7.jpg",
    "color": "#f3ede5"
  },
  {
    "id": 9,
    "name": "ASUS Vivobook 15",
    "category": "Laptops",
    "spec": "Intel Core 3 \u00b7 Everyday productivity",
    "price": 36990,
    "old": 44990,
    "rating": "4.8",
    "tag": "BESTSELLER",
    "image": "/images/3.jpg",
    "color": "#f1f3ef"
  },
  {
    "id": 10,
    "name": "Acer Aspire Laptop",
    "category": "Laptops",
    "spec": "Portable design \u00b7 Work & study",
    "price": 32990,
    "old": 41990,
    "rating": "4.8",
    "tag": "GREAT VALUE",
    "image": "/images/desktop4.jpg",
    "color": "#f4f0e9"
  },
  {
    "id": 11,
    "name": "HP Chromebook",
    "category": "Laptops",
    "spec": "ChromeOS \u00b7 Lightweight everyday computing",
    "price": 21990,
    "old": 28990,
    "rating": "4.8",
    "tag": "POPULAR",
    "image": "/images/desktop5.jpg",
    "color": "#edf1f2"
  },
  {
    "id": 12,
    "name": "HP 7000 Series Laptop",
    "category": "Laptops",
    "spec": "AMD Ryzen \u00b7 Work, study & entertainment",
    "price": 42990,
    "old": 52990,
    "rating": "4.8",
    "tag": "SMART BUY",
    "image": "/images/desktop6.jpg",
    "color": "#f3ede5"
  },
  {
    "id": 13,
    "name": "ASUS Chromebook",
    "category": "Laptops",
    "spec": "Lightweight design \u00b7 ChromeOS",
    "price": 23990,
    "old": 29990,
    "rating": "4.8",
    "tag": "BESTSELLER",
    "image": "/images/71UhRPa+WsL._SX679_.jpg",
    "color": "#f1f3ef"
  },
  {
    "id": 14,
    "name": "Canon PIXMA Compact Printer",
    "category": "Printers",
    "spec": "Compact design \u00b7 Everyday documents",
    "price": 4999,
    "old": 6499,
    "rating": "4.8",
    "tag": "GREAT VALUE",
    "image": "/images/printer2.jpg",
    "color": "#f4f0e9"
  },
  {
    "id": 15,
    "name": "HP Ink Tank Printer",
    "category": "Printers",
    "spec": "Home & office \u00b7 Colour printing",
    "price": 11990,
    "old": 15990,
    "rating": "4.8",
    "tag": "POPULAR",
    "image": "/images/printer4.jpg",
    "color": "#edf1f2"
  },
  {
    "id": 16,
    "name": "HP Compact Laser Printer",
    "category": "Printers",
    "spec": "Space-saving design \u00b7 Document printing",
    "price": 9990,
    "old": 12990,
    "rating": "4.8",
    "tag": "SMART BUY",
    "image": "/images/printer5.jpg",
    "color": "#f3ede5"
  },
  {
    "id": 17,
    "name": "CP PLUS Indoor Camera",
    "category": "CCTV & Security",
    "spec": "Indoor monitoring \u00b7 Compact design",
    "price": 2299,
    "old": 3299,
    "rating": "4.8",
    "tag": "BESTSELLER",
    "image": "/images/cctv2.jpg",
    "color": "#f1f3ef"
  },
  {
    "id": 18,
    "name": "Qubo Home Camera Duo",
    "category": "CCTV & Security",
    "spec": "Two-camera set \u00b7 Indoor monitoring",
    "price": 4999,
    "old": 6999,
    "rating": "4.8",
    "tag": "GREAT VALUE",
    "image": "/images/cctv3.jpg",
    "color": "#f4f0e9"
  },
  {
    "id": 19,
    "name": "Hikvision Turret Camera",
    "category": "CCTV & Security",
    "spec": "Turret design \u00b7 Business security",
    "price": 2999,
    "old": 3999,
    "rating": "4.8",
    "tag": "POPULAR",
    "image": "/images/cctv4.jpg",
    "color": "#edf1f2"
  },
  {
    "id": 20,
    "name": "Frontech Bullet Camera",
    "category": "CCTV & Security",
    "spec": "Bullet design \u00b7 Security monitoring",
    "price": 1499,
    "old": 2199,
    "rating": "4.8",
    "tag": "SMART BUY",
    "image": "/images/cctv5.jpg",
    "color": "#f3ede5"
  },
  {
    "id": 21,
    "name": "Laser Printer Toner Cartridge",
    "category": "Toner & Cartridges",
    "spec": "Replacement cartridge \u00b7 Check compatibility",
    "price": 699,
    "old": 999,
    "rating": "4.8",
    "tag": "BESTSELLER",
    "image": "/images/toner3.jpg",
    "color": "#f1f3ef"
  },
  {
    "id": 22,
    "name": "JK TN Series Toner Cartridge",
    "category": "Toner & Cartridges",
    "spec": "Office essentials \u00b7 Check compatibility",
    "price": 999,
    "old": 1499,
    "rating": "4.8",
    "tag": "GREAT VALUE",
    "image": "/images/toner4.jpg",
    "color": "#f4f0e9"
  }
];
function App(){
const [showWhatsapp,setShowWhatsapp]=useState(false),[whatsappOpen,setWhatsappOpen]=useState(false);
useEffect(()=>{const onScroll=()=>{const visible=window.scrollY>240;setShowWhatsapp(visible);if(!visible)setWhatsappOpen(false)};onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);

const [category,setCategory]=useState('All products'),[query,setQuery]=useState(''),[cart,setCart]=useState(()=>{try{return JSON.parse(localStorage.getItem('digitek-cart'))||{}}catch{return {}}}),[wish,setWish]=useState(()=>{try{return JSON.parse(localStorage.getItem('digitek-wish'))||[]}catch{return []}}),[panel,setPanel]=useState(null),[sort,setSort]=useState('featured'),[detail,setDetail]=useState(null),[toast,setToast]=useState(''),[menu,setMenu]=useState(false);
useEffect(()=>{const handle=e=>{if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();document.querySelector('.search input')?.focus()}if(e.key==='Escape'){setPanel(null);setDetail(null);setMenu(false);setWhatsappOpen(false)}};window.addEventListener('keydown',handle);return()=>window.removeEventListener('keydown',handle)},[]);
const count=Object.values(cart).reduce((a,b)=>a+b,0),total=products.reduce((a,p)=>a+p.price*(cart[p.id]||0),0);
function notify(t){setToast(t);setTimeout(()=>setToast(''),2500)}
function changeCart(id,amount){setCart(prev=>{const next={...prev,[id]:Math.max(0,(prev[id]||0)+amount)};localStorage.setItem('digitek-cart',JSON.stringify(next));return next});if(amount>0)notify('Added to your bag')}
function toggleWish(id){setWish(prev=>{const next=prev.includes(id)?prev.filter(x=>x!==id):[...prev,id];localStorage.setItem('digitek-wish',JSON.stringify(next));return next})}
function browse(cat='All products'){setCategory(cat);setPanel(null);setMenu(false);setTimeout(()=>document.getElementById('products').scrollIntoView({behavior:'smooth'}),20)}
let shown=products.filter(p=>(category==='All products'||category===p.category)&&(`${p.name} ${p.spec} ${p.category}`.toLowerCase().includes(query.toLowerCase())));if(sort==='low')shown.sort((a,b)=>a.price-b.price);if(sort==='high')shown.sort((a,b)=>b.price-a.price);
return <><div className="announcement">Your neighbourhood tech experts. Your next upgrade. <span>Visit our Jhansi showroom <ArrowUpRight size={12}/></span></div><header><div className="main-header wrap"><a className="logo" href="#" aria-label="DigiTek home"><span className="brand-grid">{Array.from({length:9},(_,i)=><i key={i}/>)}</span>DigiTek<span className="logo-dot">.</span></a><div className="location"><MapPin size={17}/><span>Your local tech store<strong>Jhansi, Uttar Pradesh</strong></span></div><form className="search" onSubmit={e=>{e.preventDefault();browse()}}><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search laptops, printers, CCTV & more…" aria-label="Search products"/><kbd>⌘ K</kbd></form><button className="icon-button saved" onClick={()=>setPanel('wishlist')} aria-label="Open wishlist"><Heart size={21}/>{wish.length>0&&<b>{wish.length}</b>}</button><button className="bag-button" onClick={()=>setPanel('cart')}><ShoppingBag size={20}/><span>My bag</span><b>{count}</b></button><button className="mobile-menu icon-button" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation" aria-expanded={menu} aria-controls="main-navigation"><Menu/></button></div><nav id="main-navigation" className={'wrap navigation '+(menu?'opened':'')}><div className="nav-links">{['All products','Laptops','Desktops','Printers','CCTV & Security','Toner & Cartridges'].map((c,i)=><button className={category===c?'active':''} key={c} onClick={()=>browse(c)}>{i===0&&<Menu size={15}/ >}{c}</button>)}</div><a href={whatsappLink(whatsappContacts[0].number)} target="_blank" rel="noopener noreferrer"><MessageCircle size={19}/>Talk to an expert</a></nav></header>
<main className="wrap"><section className="hero"><div className="hero-copy"><div className="eyebrow"><span/> YOUR NEXT UPGRADE STARTS HERE</div><h1>Better tech.<br/>Bigger possibilities<span>.</span></h1><p>From your first laptop to a smarter workspace.<br className="desktop"/> Discover technology that works as hard as you do.</p><button className="primary" onClick={()=>browse()}>Explore the collection <ArrowUpRight size={18}/></button><div className="hero-proof"><span className="tiny-stars">★★★★★</span><span>Trusted tech. Personal support. Since day one.</span></div></div><div className="hero-visual"><span className="orbit orbit-one"/><span className="orbit orbit-two"/><div className="hero-caption">THE WORKSPACE EDIT <span>CURATED BY DIGITEK</span></div><img src="/images/desktop4.jpg" alt="Acer laptop from the DigiTek collection" fetchPriority="high"/><div className="floating-label"><span className="float-icon"><ShieldCheck size={21}/></span><span>Genuine products<strong>Peace of mind, included.</strong></span><Check size={16}/></div><div className="hero-bottom"><span>Made for your everyday.<br/><strong>Built for what’s next.</strong></span><button onClick={()=>browse('Laptops')} aria-label="Explore laptops"><ArrowUpRight/></button></div></div></section>
<section className="benefits">{[[ShieldCheck,'Genuine products','Trusted brands. Assured quality.'],[Truck,'Local delivery','Convenient delivery across Jhansi.'],[Headphones,'Expert support','Real people. Helpful answers.'],[Printer,'Complete solutions','For your home, office & business.']].map(([Icon,title,sub])=><div key={title}><Icon size={24}/><span><strong>{title}</strong><small>{sub}</small></span></div>)}</section>
<section className="category-section"><div className="section-heading"><div><span className="eyebrow">FIND YOUR EVERYDAY ESSENTIALS</span><h2>A little tech. A lot of possibilities.</h2></div><button className="text-button" onClick={()=>browse()}>Shop all categories <ArrowRight size={16}/></button></div><div className="category-grid">{categories.slice(1).map(([name,Icon],i)=><button key={name} onClick={()=>browse(name)} className={'category-card cat-'+i}><div className="category-image"><img src={["/images/desktop4.jpg","/images/desktop9.jpg","/images/printer1.jpg","/images/cctv2.jpg","/images/toner1.jpg"][i]} alt="" loading="lazy"/><ArrowUpRight size={16}/></div><strong>{name}</strong><span>{['Power your next big idea','A setup that means business','Print more. Do more.','Keep what matters safe','Keep every page looking sharp'][i]}</span></button>)}</div></section>
<section id="products" className="products-section"><div className="section-heading"><div><span className="eyebrow">GOOD TECH. GREAT PICKS.</span><h2>{category==='All products'?'Your upgrade, handpicked.':category}</h2></div><div className="sort"><SlidersHorizontal size={15}/><select aria-label="Sort products" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured picks</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div></div><div className="filter-tabs">{categories.slice(0,6).map(([c])=><button className={category===c?'selected':''} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div><div className="product-grid">{shown.map(p=><article className="product-card" key={p.id}><div className="product-picture" style={{background:p.color}}><span className="product-tag">{p.tag}</span><button className={'wish '+(wish.includes(p.id)?'liked':'')} onClick={()=>toggleWish(p.id)} aria-label={'Save '+p.name}><Heart size={17} fill={wish.includes(p.id)?'currentColor':'none'}/></button><button className="image-open" onClick={()=>setDetail(p)} aria-label={'View '+p.name}><img src={p.image} alt={p.name} onError={e=>{e.currentTarget.style.display='none'}} loading="lazy"/></button><span className="discount">{Math.round((1-p.price/p.old)*100)}% OFF</span></div><div className="product-info"><div className="product-meta"><span>{p.category}</span><span className="rating"><Star size={12} fill="currentColor"/>{p.rating}</span></div><button className="product-name" onClick={()=>setDetail(p)}>{p.name}</button><p>{p.spec}</p><div className="price-row"><span><strong>{money(p.price)}</strong><del>{money(p.old)}</del></span><button onClick={()=>changeCart(p.id,1)} aria-label={'Add '+p.name+' to bag'}><Plus size={19}/></button></div></div></article>)}</div>{!shown.length&&<div className="empty">No products found. Try another search.<button onClick={()=>{setQuery('');setCategory('All products')}}>Clear filters</button></div>}<p className="catalog-note">Explore our sample catalogue. Prices and availability are indicative; contact our showroom for a confirmed quote.</p></section>
<section className="promo-grid"><div className="security-promo"><span className="eyebrow">PEACE OF MIND, EVERY DAY</span><h2>Keep an eye on<br/>what matters.</h2><p>Smarter CCTV solutions for your<br/>home and business.</p><button onClick={()=>browse('CCTV & Security')}>Explore security <ArrowUpRight size={17}/></button><img className="promo-product promo-security" src="/images/cctv2.jpg" alt="CP PLUS indoor security camera" loading="lazy"/><span className="record"><i/> ALWAYS LOOKING OUT</span></div><div className="office-promo"><span className="eyebrow">YOUR WORKSPACE, UPGRADED</span><h2>Big ideas deserve<br/>a better setup.</h2><p>Desktops, printers and everyday essentials.<br/>Everything your office needs, in one place.</p><button onClick={()=>browse('Desktops')}>Build your workspace <ArrowUpRight size={17}/></button><img className="promo-product promo-desktop" src="/images/desktop9.jpg" alt="HP desktop with monitor, keyboard and mouse" loading="lazy"/></div></section>
<section className="brands"><span>THE BRANDS YOU TRUST. ALL UNDER ONE ROOF.</span><div>{['hp','DELL','Canon','acer','EPSON','brother','ASUS','Lenovo'].map(b=><b key={b}>{b}</b>)}</div><small>Brand names identify the product ranges available through our showroom.</small></section>
<section className="showroom"><div><span className="eyebrow">ONLINE CONVENIENCE. LOCAL CONFIDENCE.</span><h2>A real store.<br/>People you can count on.</h2><p>Need help choosing? Drop by DigiTek Computer Associate.<br/>Let’s find the right technology for you, together.</p><div className="address-stack"><div className="address-block"><span className="address-icon"><MapPin size={23}/></span><div><h3>Visit our showroom</h3><p>In front of Pramod Petrol Pump, Elite, Sipri Road,<br/>Jhansi, Uttar Pradesh – 284001</p><a href="https://www.google.com/maps/search/?api=1&query=Pramod+Petrol+Pump+Elite+Sipri+Road+Jhansi" target="_blank" rel="noreferrer">Get showroom directions <ArrowUpRight size={16}/></a></div></div><div className="address-block"><span className="address-icon"><MapPin size={23}/></span><div><h3>Registered office</h3><p>4, Elite Chauraha, Jhansi,<br/>Uttar Pradesh – 284001</p><a href="https://www.google.com/maps/search/?api=1&query=Elite+Chauraha+Jhansi" target="_blank" rel="noreferrer">View office area <ArrowUpRight size={16}/></a></div></div></div></div><div className="contact-card"><span className="store-stamp"><ShieldCheck size={28}/></span><h3>Good advice comes standard.</h3><p>Product guidance, business enquiries<br/>or help with your next upgrade.</p><a href="tel:+919415031468"><Phone size={18}/> +91 94150 31468 <ArrowUpRight size={16}/></a><a href="tel:+918318351646"><Phone size={18}/> +91 83183 51646 <ArrowUpRight size={16}/></a><a className="email" href="mailto:digitek_manoj@rediffmail.com">digitek_manoj@rediffmail.com <ArrowUpRight size={15}/></a></div></section></main>
<footer><div className="wrap footer-cta"><div><span className="eyebrow">YOUR NEXT UPGRADE, SORTED.</span><h2>Let’s find your kind of tech.</h2><p>Personal guidance. The right products. Right here in Jhansi.</p></div><a className="primary" href={whatsappLink(whatsappContacts[1].number)} target="_blank" rel="noopener noreferrer">Talk to our team <MessageCircle size={21}/></a></div><div className="wrap footer-grid"><div><a className="logo" href="#"><span className="brand-grid">{Array.from({length:9},(_,i)=><i key={i}/>)}</span>DigiTek<span className="logo-dot">.</span></a><p>Technology, backed by trust.<br/>Computers, printing and security solutions<br/>for your home and business.</p><span className="footer-support"><ShieldCheck size={20}/> Your neighbourhood tech partner</span></div><div><h4>Shop the collection</h4>{categories.slice(1).map(([c])=><button key={c} onClick={()=>browse(c)}>{c}</button>)}</div><div><h4>Let’s connect</h4><a href="tel:+919415031468">+91 94150 31468</a><a href="tel:+918318351646">+91 83183 51646</a><a className="footer-email" href="mailto:digitek_manoj@rediffmail.com">digitek_manoj@rediffmail.com</a><p>Manoj Kumar Agrawal<br/>Director · DigiTek Computer Associate</p></div><div><h4>Find us in Jhansi</h4><p><strong>Showroom</strong><br/>In front of Pramod Petrol Pump,<br/>Elite, Sipri Road, Jhansi – 284001</p><p><strong>Registered office</strong><br/>4, Elite Chauraha, Jhansi – 284001</p><button className="footer-directions" onClick={()=>document.querySelector('.showroom').scrollIntoView({behavior:'smooth'})}>View location details <ArrowUpRight size={17}/></button></div></div><section className="wrap social-section" aria-label="DigiTek social media"><div className="social-intro"><span className="eyebrow">STAY IN THE LOOP</span><h3>Follow your local tech connection.</h3><p>Explore more from DigiTek on your favourite platforms.</p></div><div className="social-links">{socialLinks.map(({name,handle,url,Icon,style})=><a key={name} className={'social-link '+style} href={url} target="_blank" rel="noopener noreferrer" aria-label={'Follow DigiTek on '+name+' (opens in a new tab)'}><span className="social-icon"><Icon size={22}/></span><span className="social-copy"><strong>{name}</strong><small>{handle}</small></span><ArrowUpRight size={18} aria-hidden="true"/></a>)}</div></section><div className="wrap footer-assurances"><span><ShieldCheck size={18}/> Genuine products</span><span><Headphones size={18}/> Local expert guidance</span><span><Monitor size={18}/> Home & business solutions</span><a href="#">Back to top ↑</a></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} DigiTek Computer Associate. All rights reserved.</span><span>Made for your everyday. Built for what’s next.</span></div></footer>
{showWhatsapp&&<div className="whatsapp-widget">{whatsappOpen&&<section className="whatsapp-contacts" id="whatsapp-contacts" aria-label="WhatsApp contact numbers"><div className="whatsapp-heading"><span><strong>Connect with DigiTek</strong><small>Expert guidance, just a message away.</small></span><button aria-label="Close WhatsApp contacts" onClick={()=>setWhatsappOpen(false)}><X size={20}/></button></div><div className="whatsapp-options">{whatsappContacts.map((contact,i)=><a key={contact.number} href={whatsappLink(contact.number)} target="_blank" rel="noopener noreferrer"><MessageCircle size={24}/><span><small>DigiTek · Contact {i+1}</small><strong>{contact.label}</strong></span><ArrowUpRight size={18}/></a>)}</div><p>Choose a contact to start your WhatsApp conversation.</p></section>}<button className="whatsapp-trigger" aria-expanded={whatsappOpen} aria-controls="whatsapp-contacts" onClick={()=>setWhatsappOpen(!whatsappOpen)}><MessageCircle size={25}/><span>Chat on WhatsApp</span>{whatsappOpen?<X size={18}/>:<ChevronRight size={18}/>}</button></div>}
{toast&&<div role="status" className="toast"><Check size={17}/>{toast}</div>}
{panel&&<div className="overlay" onClick={()=>setPanel(null)}><aside className="drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><h2>{panel==='cart'?'Your shopping bag':'Your wishlist'}</h2><button className="icon-button" onClick={()=>setPanel(null)} aria-label="Close panel"><X/></button></div><p className="drawer-sub">{panel==='cart'?`${count} items, ready for your next upgrade.`:'Your favourite finds, all in one place.'}</p><div className="drawer-products">{products.filter(p=>panel==='cart'?cart[p.id]>0:wish.includes(p.id)).map(p=><div className="drawer-product" key={p.id}><img src={p.image} alt={p.name}/><div><h4>{p.name}</h4><strong>{money(p.price)}</strong>{panel==='cart'?<div className="quantity"><button onClick={()=>changeCart(p.id,-1)} aria-label="Decrease quantity"><Minus size={13}/></button>{cart[p.id]}<button onClick={()=>changeCart(p.id,1)} aria-label="Increase quantity"><Plus size={13}/></button></div>:<button className="text-button" onClick={()=>changeCart(p.id,1)}>Add to bag <Plus size={14}/></button>}</div><button className="icon-button" aria-label="Remove item" onClick={()=>panel==='cart'?changeCart(p.id,-cart[p.id]):toggleWish(p.id)}><X size={16}/></button></div>)}{(panel==='cart'?count===0:wish.length===0)&&<div className="empty"><ShoppingBag size={40}/><h3>{panel==='cart'?'Your bag is waiting':'Save something you love'}</h3><p>Discover your next upgrade in our collection.</p><button className="primary" onClick={()=>browse()}>Explore products <ArrowRight size={16}/></button></div>}</div>{panel==='cart'&&count>0&&<div className="cart-total"><span>Estimated total<strong>{money(total)}</strong></span><p>This is a frontend demo. Online checkout is unavailable. Contact DigiTek to confirm prices, stock and place an order.</p><a className="primary" href="tel:+919415031468"><Phone size={17}/>Call to enquire</a></div>}</aside></div>}
{detail&&<div className="overlay modal-overlay" onClick={()=>setDetail(null)}><div className="product-modal" onClick={e=>e.stopPropagation()}><button className="modal-close icon-button" aria-label="Close product" onClick={()=>setDetail(null)}><X/></button><img src={detail.image} alt={detail.name}/><div><span className="eyebrow">{detail.category}</span><h2>{detail.name}</h2><p>{detail.spec}</p><div className="modal-price">{money(detail.price)} <del>{money(detail.old)}</del></div><p>Genuine products with local expert guidance. Contact our Jhansi showroom for current specifications, warranty and availability.</p><button className="primary" onClick={()=>changeCart(detail.id,1)}>Add to bag <ShoppingBag size={18}/></button><small>Sample catalogue · Final pricing confirmed by showroom.</small></div></div></div>}</>}
createRoot(document.getElementById('root')).render(<App/>);
