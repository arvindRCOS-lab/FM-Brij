/* BRIJ prototype shared router + helpers (vanilla, no deps) */

/* Desktop screens: <div id="{prefix}-{screen}" class="d-screen">, sidebar buttons id="{prefix}-nav-{nav}" */
function dGo(prefix, screen, navId){
  document.querySelectorAll('.d-screen').forEach(s=>s.classList.remove('active'));
  var el=document.getElementById(prefix+'-'+screen);
  if(el) el.classList.add('active');
  if(navId){
    document.querySelectorAll('.sidebar button,.sidebar a.s-link').forEach(b=>b.classList.remove('active'));
    var n=document.getElementById(prefix+'-nav-'+navId); if(n) n.classList.add('active');
  }
  window.scrollTo(0,0);
}

/* Mobile screens: <div id="m-{screen}" class="m-screen">, tabs id="tab-{tab}" */
function mGo(screen, tab){
  document.querySelectorAll('.m-screen').forEach(s=>s.classList.remove('active'));
  var el=document.getElementById('m-'+screen);
  if(el) el.classList.add('active');
  if(tab){
    document.querySelectorAll('.bottom-tabs button').forEach(b=>b.classList.remove('active'));
    var t=document.getElementById('tab-'+tab); if(t) t.classList.add('active');
  }
  var act=document.querySelector('.phone .m-screen.active'); if(act) act.scrollTop=0;
}

/* In-page tabs: <div class="tabbar"><button onclick="setTab(this,'pane-id')"> + <div id="pane-id" class="tabpane"> */
function setTab(btn, paneId){
  var bar=btn.parentElement;
  bar.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  var pane=document.getElementById(paneId);
  if(pane){
    pane.parentElement.querySelectorAll(':scope > .tabpane').forEach(p=>p.classList.remove('active'));
    pane.classList.add('active');
  }
}

function toggleChip(el){ el.classList.toggle('on'); }
function pickCat(el){
  el.parentElement.querySelectorAll('.cat-tile').forEach(t=>t.classList.remove('on'));
  el.classList.add('on');
}

/* Toast — use for every "this would call the API" interaction instead of alert() */
function toast(msg){
  var t=document.getElementById('toast');
  if(!t){ t=document.createElement('div'); t.id='toast'; document.body.appendChild(t); }
  t.innerHTML=msg; t.style.display='block';
  clearTimeout(t._h); t._h=setTimeout(function(){t.style.display='none'},3200);
}

/* Deep links: page.html#screen opens that screen on load (desktop pages set <body data-prefix="fm">) */
window.addEventListener('DOMContentLoaded', function(){
  var h=location.hash.replace('#','');
  if(!h) return;
  var prefix=document.body.getAttribute('data-prefix');
  if(prefix && document.getElementById(prefix+'-'+h)) dGo(prefix,h,h);
  else if(document.getElementById('m-'+h)) mGo(h,h);
});
