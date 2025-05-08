// ----- Helpers -----
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

// ----- LAB6: Alert / Prompt / Confirm & DOM ops -----
function dialogWithUser() {
  const name = prompt('Як Вас звати?', '');
  if (name === null) return;
  confirm(`Ви — ${name}?`) && alert(`Привіт, ${name}!`);
}
function developerInfo(lastName, firstName, position = 'Developer') {
  alert(`Розробник:\n${lastName} ${firstName}\nПосада: ${position}`);
}
function compareStrings() {
  const a = prompt('Рядок A:', '');
  const b = prompt('Рядок B:', '');
  if (a === null || b === null) return;
  alert(a > b ? `Більша: ${a}` : `Більша: ${b}`);
}
function changeBackgroundTemporary(color='#fffbf0', ms=30000) {
  const orig = document.body.style.background;
  document.body.style.background = color;
  setTimeout(()=> document.body.style.background = orig, ms);
}
function redirectToGitHub() {
  if (confirm('Перейти на GitHub репозиторій?'))
    location.href = 'https://github.com/YourRepo';
}
function domOperations() {
  // insertBefore
  const ins = document.createElement('p');
  ins.textContent = 'Я вставлений перед першим блоком!';
  $('#toInsert').before(ins);
  // remove
  $('#toRemove').remove();
  // replaceWith
  const repl = document.createElement('p');
  repl.innerHTML = '<em>Я замінив попередній блок.</em>';
  $('#toReplace').replaceWith(repl);
}

// LAB6 bindings
$('#dialogBtn').onclick = dialogWithUser;
$('#devInfoBtn').onclick = ()=> developerInfo('Tkachuk','Daria','Student');
$('#compareBtn').onclick = compareStrings;
$('#bgChangeBtn').onclick = ()=> changeBackgroundTemporary('#ffebcd',30000);
$('#redirectBtn').onclick = redirectToGitHub;
$('#domOpsBtn').onclick = domOperations;

// ----- LAB7: Event handlers -----
let propHandler = () => alert('Клік через властивість onclick!'),
    multi1 = ()=> alert('addEventListener #1'),
    multi2 = ()=> alert('addEventListener #2');

$('#propBtn').onclick = propHandler;
$('#multiBtn').addEventListener('click', multi1);
$('#multiBtn').addEventListener('click', multi2);
$('#removeBtn').addEventListener('click', ()=>{
  $('#multiBtn').removeEventListener('click', multi1);
  alert('Перший обробник видалено');
});

// List highlighting via delegation
$('#demo-list').addEventListener('click', e=>{
  if (e.target.tagName === 'LI') {
    $$('#demo-list li').forEach(li=> li.classList.remove('highlight'));
    e.target.classList.add('highlight');
  }
});

// Menu behavior via data-action
$('#behavior-menu').addEventListener('click', e=>{
  const act = e.target.dataset.action;
  if (act === 'toggleBanner') {
    $('#draggable-banner').hidden = !$('#draggable-banner').hidden;
  }
  if (act === 'toggleContent') {
    $('.content').hidden = !$('.content').hidden;
  }
});

// ----- LAB8: Mouseover / Mouseout & Drag’n’Drop -----
// 1) Hover effects on menu items & list items
[...$$('.menu-item, #demo-list li')].forEach(el=>{
  el.addEventListener('mouseover', e=> e.currentTarget.style.background='#ffe4b5');
  el.addEventListener('mouseout',  e=> e.currentTarget.style.background='');
});

// 2) Make banner draggable
(function(){
  const banner = $('#draggable-banner');
  if (!banner) return;
  banner.addEventListener('mousedown', e=>{
    const rect = banner.getBoundingClientRect();
    const shiftX = e.clientX - rect.left;
    const shiftY = e.clientY - rect.top;
    banner.style.position = 'absolute';
    banner.style.zIndex = 1000;
    document.body.append(banner);

    function moveAt(pageX,pageY){
      banner.style.left = pageX - shiftX + 'px';
      banner.style.top  = pageY - shiftY + 'px';
    }
    moveAt(e.pageX,e.pageY);

    function onMouseMove(e){
      moveAt(e.pageX,e.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);

    banner.onmouseup = ()=> {
      document.removeEventListener('mousemove', onMouseMove);
      banner.onmouseup = null;
    };
  });
  banner.ondragstart = ()=> false;
})();

// ----- Footer year auto-update -----
$('#footer-year').textContent = new Date().getFullYear();
