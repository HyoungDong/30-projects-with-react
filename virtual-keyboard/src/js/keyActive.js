export default function keyActive() {
  const keyBoard = document.getElementById('keyboard');
  const inputGroup = document.getElementById('input-group');
  const inputElem = inputGroup.querySelector('#input');

  inputElem.addEventListener('input', e => {
    console.log(e.target.value);
    e.target.value = e.target.value.replace(/[ㄱ-ㅎ | ㅏ-ㅣ | 가-힣]/, '');
  });

  document.addEventListener('keydown', e => {
    inputGroup.classList.toggle('error', /[ㄱ-ㅎ | ㅏ-ㅣ | 가-힣]/.test(e.key));
    keyBoard.querySelector(`[data-code = ${e.code}]`)?.classList.add('active');
  });

  document.addEventListener('keyup', e => {
    keyBoard.querySelector(`[data-code = ${e.code}]`)?.classList.remove('active');
  });
}
