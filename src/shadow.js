import Animation from './animation.js'

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

    this.startingState = {
      top: this.element.offsetTop,
      left: this.element.offsetLeft,
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    }

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

  /**
   * ============
   * Actions
   * ============
   */

  open() {
    this.isOpen = true;
    Animation.transformMatrix(
      this.element,
      this.startingState,
      Animation.calculateFinalState(this.element)
    );
  }

  close() {
    this.isOpen = false;
    Animation.resetTransformMatrix(this.element);
    setTimeout(() => this.destroyItself(), 300);
  }

  placeItself() {
    document.body.appendChild(this.element);
  }

  destroyItself() {
    if (!document.body.contains(this.element)) return;
    document.body.removeChild(this.element);
  }
}
