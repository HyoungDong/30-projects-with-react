import '../css/style.css';

function toggleThemeMode() {
  const root = document.getElementsByTagName('html')[0];
  console.log(root.Theme);
  if (root.getAttribute('theme') === 'dark-mode') root.setAttribute('theme', '');
  else root.setAttribute('theme', 'dark-mode');
}

const toggleSwitch = document.getElementsByClassName('switch')[0];

toggleSwitch.addEventListener('click', e => {
  if (e.target.id === 'switch') toggleThemeMode();
});
