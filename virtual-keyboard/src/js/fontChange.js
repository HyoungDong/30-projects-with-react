export default function fontChange() {
  const selectBox = document.getElementById('font');
  selectBox.addEventListener('change', e => {
    document.body.style.fontFamily = e.target.value;
  });
}
