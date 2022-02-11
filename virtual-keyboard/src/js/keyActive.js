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

  keyBoard.addEventListener('mousedown', e => {
    e.target.closest('div.key')?.classList.add('active');
  });

  document.addEventListener('mouseup', e => {
    const keyElement = e.target.closest('div.key');
    const isActive = keyElement?.classList.contains('active');
    const value = keyElement?.dataset.val;
    if (isActive && value) {
      if (value !== 'Space' && value !== 'Backspace') inputElem.value += value;
      else if (value === 'Space') inputElem.value += ' ';
      else if (value === 'Backspace') inputElem.value = inputElem.value.slice(0, -1);
    }

    keyBoard.querySelector('.active').classList.remove('active');
  });
}
