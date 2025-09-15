export default class Shadow {
  zIndex = '1000'
  isOpen = false

  /**
   * ============
   * Constructors
   * ============
   */

  constructor(image) {
    this.create(image);
    this.calculateStartsAndFinals();
    return this;
  }

  create(image) {
    // create shadow image
    const shadowImage = document.createElement('img');
    shadowImage.src = image.src;
    shadowImage.id = `libra-shadow-${image.id}`;
    shadowImage.classList.add('libra-shadow');

    // style and position shadow image
    shadowImage.style.top = image.offsetTop;
    shadowImage.style.left = image.offsetLeft;
    shadowImage.style.width = image.offsetWidth;
    shadowImage.style.height = image.offsetHeight;
    shadowImage.style.zIndex = this.zIndex;

    document.body.appendChild(shadowImage);
    this.element = shadowImage;
  }

  calculateStartsAndFinals() {
    // get starting state
    const s = {
      top: this.element.offsetTop,
      left: this.element.offsetLeft,
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    }

    const f = {};
    const margin = 50;

    // calculate final size
    const nw = this.element.naturalWidth;
    const nh = this.element.naturalHeight;
    const ratio = nw / nh;

    const ww = window.innerWidth - margin*2;
    const wh = window.innerHeight - margin*2;

    f.width = Math.min(nw, ww);
    f.height = f.width / ratio;

    if (f.height >= wh) {
      f.height = wh;
      f.width = f.height * ratio;
    }

    // calculate final position
    f.left = (ww - f.width) / 2 + margin;
    f.top = (wh - f.height) / 2 + margin;

    this.finalState = f;
    this.startingState = s;
  }

  /**
   * ============
   * Actions
   * ============
   */

  open() {
    this.isOpen = true;
    this.animate(this.startingState, this.finalState)
  }

  close() {
    this.isOpen = false;
    this.element.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
    setTimeout(() => {
      this.destroyItself();
    }, 300);
  }

  animate(starts, finals) {
    // Calculate scaling factors based on width and height interpolation
    const scaleX = finals.width / starts.width;
    const scaleY = finals.height / starts.height;

    // Calculate the center of the starting and final positions
    const startCenterX = starts.left + starts.width / 2;
    const startCenterY = starts.top + starts.height / 2;
    const finalCenterX = finals.left + finals.width / 2;
    const finalCenterY = finals.top + finals.height / 2;

    const translateX = finalCenterX - startCenterX;
    const translateY = finalCenterY - startCenterY;

    // Apply the transform with matrix (scale + translate)
    this.element.style.transform = `matrix(${scaleX}, 0, 0, ${scaleY}, ${translateX}, ${translateY})`;
  }

  placeItself() {
    document.body.appendChild(this.element);
  }

  destroyItself() {
    if (!document.body.contains(this.element)) return;
    document.body.removeChild(this.element);
  }
}
