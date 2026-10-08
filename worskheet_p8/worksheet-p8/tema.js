const pilihanTema = document.querySelector('#pilihan-tema');
const root = document.documentElement;

const temaTersimpan = localStorage.getItem('tema-profil') || 'light';
pasangTema(temaTersimpan);

pilihanTema.addEventListener('change', (event) => {
  pasangTema(event.target.value);
});

function pasangTema(tema) {
  root.dataset.theme = tema;
  pilihanTema.value = tema;
  localStorage.setItem('tema-profil', tema);
}
