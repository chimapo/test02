const works=[
['Carrot Cake','story'],['A Little Argument','character'],['Between the Pages','character'],['Hold Me Close','character'],['Forest Quiet','story'],['Blue Bird','nature'],['Safe in Your Wings','story'],['Cat Collector','character'],['A Little Secret','character'],['A Box of Wonder','character'],['Underwater Dream','nature'],['A Garden Walk','nature'],['Flowers & You','nature'],['Stardust','nature'],['Blooming Together','nature'],['To the Moon and Back','story']
];
const gallery=document.querySelector('#gallery');let visible=works.map((_,i)=>i),current=0;
function render(filter='all'){visible=works.map((w,i)=>({...w,i})).filter(w=>filter==='all'||w[1]===filter).map(w=>w.i);gallery.innerHTML=visible.map(i=>`<article class="work-card" tabindex="0" role="button" aria-label="放大作品 ${works[i][0]}" data-index="${i}"><div class="thumb"><img loading="lazy" src="images/work-${String(i+1).padStart(2,'0')}.jpg" alt="${works[i][0]}"></div><div class="meta"><div><strong>${works[i][0]}</strong><br><small>ILLUSTRATION / ${String(i+1).padStart(2,'0')}</small></div><span class="arrow">↗</span></div></article>`).join('')}
render();document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{document.querySelector('.filters .active').classList.remove('active');b.classList.add('active');render(b.dataset.filter)}));
const dialog=document.querySelector('#lightbox');function openWork(i){current=i;dialog.querySelector('img').src=`images/work-${String(i+1).padStart(2,'0')}.jpg`;dialog.querySelector('img').alt=works[i][0];dialog.querySelector('.lightbox-caption').textContent=works[i][0];if(!dialog.open)dialog.showModal()}
gallery.addEventListener('click',e=>{let card=e.target.closest('.work-card');if(card)openWork(+card.dataset.index)});gallery.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.work-card')){e.preventDefault();openWork(+e.target.dataset.index)}});function move(d){let pos=visible.indexOf(current);openWork(visible[(pos+d+visible.length)%visible.length])}dialog.querySelector('.close').onclick=()=>dialog.close();dialog.querySelector('.prev').onclick=()=>move(-1);dialog.querySelector('.next').onclick=()=>move(1);dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});document.addEventListener('keydown',e=>{if(dialog.open&&e.key==='ArrowRight')move(1);if(dialog.open&&e.key==='ArrowLeft')move(-1)});document.querySelector('#year').textContent=new Date().getFullYear();

// Open the illustrated world by drawing back the curtains.
const curtain=document.getElementById('curtainIntro');
const curtainButton=document.getElementById('openCurtain');
if(curtain&&curtainButton){curtainButton.addEventListener('click',()=>{curtain.classList.add('is-open');setTimeout(()=>{curtain.hidden=true;document.querySelector('.hero .roundlink')?.focus({preventScroll:true})},1700)})}
// Static hosting: prepare a message in the visitor's email app.

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const button = contactForm.querySelector('button[type="submit"]');
    const status = document.getElementById('formStatus');

    button.disabled = true;
    button.textContent = 'SENDING...';
    status.textContent = '訊息傳送中，請稍候...';

    try {
      const formData = new FormData(contactForm);

      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json();

      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error('寄送失敗');
      }

      status.textContent = '✳ 訊息已送出！謝謝你的來信。';
      contactForm.reset();

    } catch (error) {
      status.textContent = '傳送遇到問題，請稍後再試。';
    } finally {
      button.disabled = false;
      button.textContent = 'SEND MESSAGE ↗';
    }
  });
}
