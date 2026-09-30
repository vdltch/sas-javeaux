document.getElementById('year').textContent=new Date().getFullYear();

// Apparition douce des blocs au scroll
const blocks=document.querySelectorAll('.service,.steps li,.jobs li');
if('IntersectionObserver'in window){
  blocks.forEach(block=>block.dataset.reveal='');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
  blocks.forEach(block=>observer.observe(block));
}

// Les liens "Chiffrer / Réserver" pré-remplissent le besoin du formulaire
const need=document.getElementById('f-need');
document.querySelectorAll('[data-need]').forEach(link=>link.addEventListener('click',()=>{need.value=link.dataset.need}));

// Formulaire de devis : ouvre le client mail avec la demande pré-rédigée.
// En production, brancher sur un endpoint (API maison, Formspree…) pour ne dépendre d'aucun client mail.
const form=document.getElementById('quote-form'),status=document.getElementById('form-status');
form.addEventListener('submit',event=>{
  event.preventDefault();
  const data=Object.fromEntries(new FormData(form));
  if(!data.name.trim()||!data.phone.trim()){status.textContent='Indiquez au moins votre nom et votre téléphone pour que nous puissions vous rappeler.';return}
  const body=[`Besoin : ${data.need}`,`Nom / société : ${data.name}`,`Téléphone : ${data.phone}`,`E-mail : ${data.email||'—'}`,`Commune : ${data.city||'—'}`,`Date souhaitée : ${data.date||'—'}`,'',data.message||''].join('\n');
  location.href=`mailto:sas@alain-javault.fr?subject=${encodeURIComponent('Demande de devis — '+data.need)}&body=${encodeURIComponent(body)}`;
  status.textContent='Votre messagerie s’ouvre avec la demande pré-remplie. Vous pouvez aussi nous appeler au 02 37 34 06 06.';
});
