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
    const shadow = document.createElement('img');
    shadow.src = image.src;
    shadow.id = `libra-shadow-${image.id}`;
    shadow.classList.add('libra-shadow');

    // style and position shadow image
    shadow.style.top = image.offsetTop;
    shadow.style.left = image.offsetLeft;
    shadow.style.width = image.offsetWidth;
    shadow.style.height = image.offsetHeight;
    shadow.style.zIndex = this.zIndex;

    document.body.appendChild(shadow);
    this.element = shadow;
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
