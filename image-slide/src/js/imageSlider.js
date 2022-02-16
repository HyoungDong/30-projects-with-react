export default function imageSlider() {
  this.currentPos = 0;
  this.autoPlay = true;
  this.sliderWrapEl = document.getElementById('slider-wrap');
  this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
  this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
  this.prevBtnEl = this.sliderWrapEl.querySelector('#previous');
  this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
  this.controlWrapEl = this.sliderWrapEl.querySelector('#control-wrap');
  this.slideNumber = this.sliderListEl.querySelectorAll('li').length;
  this.slideWidth = this.sliderListEl.clientWidth;
  this.sliderListEl.style.width = `${this.slideNumber * this.slideWidth}px`;
  this.slideTimerId = 0;
  this.addEvent();
  this.createIndicator();
  this.setIndicator();
  this.startAutoSlide();
}

imageSlider.prototype.addEvent = function () {
  this.nextBtnEl.addEventListener('click', this.nextImageEvent.bind(this));
  this.prevBtnEl.addEventListener('click', this.prevImageEvent.bind(this));
  this.indicatorWrapEl.addEventListener(
    'click',
    this.indicatorEvent.bind(this),
  );
  this.controlWrapEl.addEventListener('click', this.togglePlay.bind(this));
};

imageSlider.prototype.startAutoSlide = function () {
  this.slideTimerId = setInterval(() => {
    this.nextImageEvent();
  }, 2000);
  this.autoPlay = true;
};

imageSlider.prototype.stopAutoSlide = function () {
  clearInterval(this.slideTimerId);
  this.autoPlay = false;
};

imageSlider.prototype.togglePlay = function (e) {
  const status = e.target.dataset.status;
  if (!status) return;
  const stat = {
    play: 'pause',
    pause: 'play',
    playFunc: this.startAutoSlide.bind(this),
    pauseFunc: this.stopAutoSlide.bind(this),
  };

  this.controlWrapEl.classList.remove(stat[status]);
  this.controlWrapEl.classList.add(status);
  stat[`${status}Func`]();
};

imageSlider.prototype.indicatorEvent = function (e) {
  const indexPos = parseInt(e.target.dataset.index);
  if (Number.isInteger(indexPos)) {
    this.currentPos = indexPos;
    this.sliderListEl.style.left = `-${this.slideWidth * this.currentPos}px`;
    this.setIndicator();
  }
};

imageSlider.prototype.nextImageEvent = function (e) {
  this.currentPos++;
  this.currentPos %= this.slideNumber;
  this.sliderListEl.style.left = `-${this.slideWidth * this.currentPos}px`;
  this.setIndicator();
  if (this.autoPlay) {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
};

imageSlider.prototype.prevImageEvent = function (e) {
  this.currentPos--;
  this.currentPos = (this.currentPos + this.slideNumber) % this.slideNumber;
  this.sliderListEl.style.left = `-${this.slideWidth * this.currentPos}px`;
  this.setIndicator();
  if (this.autoPlay) {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
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
