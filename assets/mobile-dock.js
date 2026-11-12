(() => {
  const mobile=matchMedia('(max-width:767px)');
  const items=[
    {label:'Ad Types',href:'#adtypes',id:'adtypes',a:'#c05b27',b:'#ffbf65',icon:'<path d="M20 12l-8 8a2 2 0 0 1-3 0l-6-6V4h10l7 7a1 1 0 0 1 0 1Z"/><circle cx="7.5" cy="8" r="1"/>'},
    {label:'Work',href:'#portfolio',id:'portfolio',a:'#7c3aed',b:'#f0308a',icon:'<rect x="3" y="6" width="18" height="15" rx="3"/><path d="M8 6V4h8v2M3 12h18M10 12v3h4v-3"/>'},
    {label:'Home',href:'#hero',id:'hero',a:'#5635ff',b:'#00c4d4',icon:'<path d="m3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9"/>'},
    {label:'About',href:'#about',id:'about',a:'#087d90',b:'#00c4d4',icon:'<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2Z"/>'},
    {label:'Pricing',href:'pricing.html',id:'pricing',a:'#b62da5',b:'#ff8065',icon:'<rect x="5" y="3" width="14" height="18" rx="3"/><path d="M9 7h6M9 11h6M9 15h2M14 15h1"/>'}
  ];
  const dock=document.createElement('div');dock.className='mobile-dock';dock.setAttribute('role','navigation');dock.setAttribute('aria-label','Mobile quick navigation');dock.inert=true;
  dock.innerHTML='<div class="mobile-dock-links"><span class="mobile-dock-orb" aria-hidden="true"></span>'+items.map((it,i)=>`<a href="${it.href}" data-dock-index="${i}"${i===2?' aria-current="location"':''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${it.icon}</svg><span class="mobile-dock-label">${it.label}</span></a>`).join('')+'</div>';
  document.body.append(dock);
  const links=[...dock.querySelectorAll('a')];let selected=2,ticking=false;
  function select(i){if(i===selected)return;selected=i;dock.style.setProperty('--dock-index',i);dock.style.setProperty('--orb-a',items[i].a);dock.style.setProperty('--orb-b',items[i].b);links.forEach((a,j)=>{if(j===i)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
  function update(){
    ticking=false;
    if(!mobile.matches){document.body.classList.remove('mobile-dock-visible','mobile-dock-ready');dock.inert=true;return;}
    document.body.classList.add('mobile-dock-ready');
    const shown=document.body.classList.contains('mobile-dock-visible');
    const next=scrollY>(shown?70:140)&&!document.getElementById('mob-menu').classList.contains('open');
    document.body.classList.toggle('mobile-dock-visible',next);dock.inert=!next;
    const line=innerHeight*.35;
    let id='hero';
    for(const section of document.querySelectorAll('#hero,#adtypes,#portfolio,#about')){if(section.getBoundingClientRect().top<=line)id=section.id;}
    select(items.findIndex(it=>it.id===id));
  }
  function queue(){if(!ticking){ticking=true;requestAnimationFrame(update);}}
  links.forEach((a,i)=>a.addEventListener('click',()=>select(i)));
  window.addEventListener('scroll',queue,{passive:true});window.addEventListener('resize',queue,{passive:true});mobile.addEventListener('change',queue);
  new MutationObserver(queue).observe(document.getElementById('mob-menu'),{attributes:true,attributeFilter:['class']});
  window.addEventListener('pageshow',queue);update();
})();
