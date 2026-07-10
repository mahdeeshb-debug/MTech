

/* ---- language toggle (PL default, EN available) ---- */
function applyLang(lang){
  document.querySelectorAll('[data-pl]').forEach(function(el){
    var val = el.getAttribute('data-' + lang);
    if(val !== null){
      el.textContent = val;
    }
  });
  document.querySelectorAll('.rail-lang button').forEach(function(btn){
    btn.classList.toggle('on', btn.dataset.lang === lang);
  });
  document.documentElement.setAttribute('lang', lang);
  try{ localStorage.setItem('mt_lang', lang); }catch(e){}
}

function initLang(){
  var saved = 'pl';
  try{ saved = localStorage.getItem('mt_lang') || 'pl'; }catch(e){}
  applyLang(saved);
  document.querySelectorAll('.rail-lang button').forEach(function(btn){
    btn.addEventListener('click', function(){ applyLang(btn.dataset.lang); });
  });
}

/* ---- lightbox for project screenshots ---- */
function openImage(img){
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  if(!lb || !lbImg) return;
  lb.style.display = 'flex';
  lbImg.src = img.src;
}
function closeImage(){
  var lb = document.getElementById('lightbox');
  if(lb) lb.style.display = 'none';
}

/* ---- live clock in footer ---- */
function startClock(){
  var el = document.getElementById('zegar');
  if(!el) return;
  var zero = function(n){ return n < 10 ? '0' + n : n; };
  var tick = function(){
    var d = new Date();
    el.textContent = zero(d.getHours()) + ':' + zero(d.getMinutes()) + ':' + zero(d.getSeconds());
  };
  tick();
  setInterval(tick, 1000);
}

/* ---- scrollspy: highlight rail + mobile nav link for section in view ---- */
function initScrollSpy(){
  var sections = Array.prototype.slice.call(document.querySelectorAll('.page-section'));
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-section]'));
  if(!sections.length || !links.length) return;

  function setActive(id){
    links.forEach(function(link){
      link.classList.toggle('active', link.dataset.section === id);
    });
  }

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        setActive(entry.target.id);
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(function(sec){ observer.observe(sec); });

  var initial = (window.location.hash || '#home').replace('#','');
  setActive(initial);
}

document.addEventListener('DOMContentLoaded', function(){
  initLang();
  startClock();
  initScrollSpy();
});
