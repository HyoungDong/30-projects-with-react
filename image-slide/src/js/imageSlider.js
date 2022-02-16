export default function imageSlider() {
  this.currentPos = 0;
  this.sliderWrapEl = document.getElementById('slider-wrap');
  this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
  this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
  this.prevBtnEl = this.sliderWrapEl.querySelector('#previous');
  this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
  this.slideNumber = this.sliderListEl.querySelectorAll('li').length;
  this.slideWidth = this.sliderListEl.clientWidth;
  this.sliderListEl.style.width = `${this.slideNumber * this.slideWidth}px`;
  this.addEvent();
  this.createIndicator();
  this.setIndicator();
}

imageSlider.prototype.addEvent = function () {
  this.nextBtnEl.addEventListener('click', this.nextBtnEvent.bind(this));

  this.prevBtnEl.addEventListener('click', this.prevBtnEvent.bind(this));

  this.indicatorWrapEl.addEventListener(
    'click',
    this.indicatorEvent.bind(this),
  );
};

imageSlider.prototype.indicatorEvent = function (e) {
  const indexPos = parseInt(e.target.dataset.index);
  if (Number.isInteger(indexPos)) {
    this.currentPos = indexPos;
    this.sliderListEl.style.left = `-${this.slideWidth * this.currentPos}px`;
    this.setIndicator();
  }
};

imageSlider.prototype.nextBtnEvent = function (e) {
  this.currentPos++;
  this.currentPos %= this.slideNumber;
  this.sliderListEl.style.left = `-${this.slideWidth * this.currentPos}px`;
  this.setIndicator();
};

imageSlider.prototype.prevBtnEvent = function (e) {
  this.currentPos--;
  this.currentPos = (this.currentPos + this.slideNumber) % this.slideNumber;
  this.sliderListEl.style.left = `-${this.slideWidth * this.currentPos}px`;
  this.setIndicator();
};

imageSlider.prototype.createIndicator = function () {
  const docFragment = document.createDocumentFragment();
  for (let i = 0; i < this.slideNumber; i++) {
    const li = document.createElement('li');
    li.dataset.index = i;
    docFragment.appendChild(li);
  }
  this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
};

imageSlider.prototype.setIndicator = function () {
  this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');
  this.indicatorWrapEl
    .querySelector(`ul li:nth-child(${this.currentPos + 1})`)
    .classList.add('active');
};
