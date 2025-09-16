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
    this.original = image;
    this.create(image);

    const rect = this.element.getBoundingClientRect();
    this.startingState = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height
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
    const rect = image.getBoundingClientRect();
    shadow.style.top = rect.top + window.scrollY;
    shadow.style.left = rect.left + window.scrollX;
    shadow.style.width = rect.width;
    shadow.style.height = rect.height;
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

    this.original.style.visibility = 'hidden';
    if (!document.body.contains(this.element)) this.placeItself();

    Animation.transformMatrix(
      this.element,
      this.startingState,
      Animation.calculateFinalState(this.element)
    );
  }

  close() {
    this.isOpen = false;

    this.original.style.visibility = 'visible';

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
