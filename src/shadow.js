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
    // snapshot current state
    const starts = {
      top: this.element.offsetTop,
      left: this.element.offsetLeft,
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    };

    let finals = {}

    const margin = 50
    const ratio = this.element.naturalWidth / this.element.naturalHeight;
    const ww = window.innerWidth - 2*margin;
    const wh = window.innerHeight - 2*margin;

    if (this.element.naturalWidth > ww) {
      finals.width = ww;
      finals.height = ww / ratio;
      if (finals.height > wh) {
        finals.height = wh;
        finals.width = wh * ratio;
      }
    } else {
      finals.width = this.element.offsetWidth;
      finals.height = this.element.offsetHeight;
    }

    finals.top = (wh - finals.height) / 2 + window.scrollY + margin;
    finals.left = (ww - finals.width) / 2 + window.scrollX + margin;

    this.startingState = starts;
    this.finalState = finals;

    return { starts, finals };
  }

  /**
   * ============
   * Actions
   * ============
   */

  open() {
    this.isOpen = true;
    this.calculateStartsAndFinals();
    this.animate(this.startingState, this.finalState)
  }

  close() {
    this.isOpen = false;
    this.element.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
    this.calculateStartsAndFinals();
    this.animate(this.finalState, this.startingState)
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
