export default function imageSlider() {
  this.currentPos = 0;
  this.sliderWrapEl = document.getElementById('slider-wrap');
  this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
  this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
  this.prevBtnEl = this.sliderWrapEl.querySelector('#previous');
  this.slideNumber = this.sliderListEl.querySelectorAll('li').length;
  this.slideWidth = this.sliderListEl.clientWidth;
  this.sliderListEl.style.width = `${this.slideNumber * this.slideWidth}px`;
  this.addEvent.call(this);
}

imageSlider.prototype.addEvent = function () {
  this.nextBtnEl.addEventListener('click', e => {
    this.currentPos++;
    this.currentPos %= this.slideNumber;
    console.log(this.currentPos);
    this.sliderListEl.style.left = `-${this.slideWidth * this.currentPos}px`;
  });

  this.prevBtnEl.addEventListener('click', e => {
    this.currentPos--;
    this.currentPos = (this.currentPos + this.slideNumber) % this.slideNumber;
    this.sliderListEl.style.left = `-${this.slideWidth * this.currentPos}px`;
  });
};
