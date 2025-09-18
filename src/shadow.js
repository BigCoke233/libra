import Animation from './animation.js'
import config from './config'

export default class Shadow {
  isOpen = false;

  /**
   * ============
   * Constructors
   * ============
   */

  constructor(image) {
    this.original = image;

    const rect = this.original.getBoundingClientRect();
    this.originalPosition = {
      top: rect.top + window.scrollY + config.offset.y,
      left: rect.left + window.scrollX + config.offset.x,
      width: rect.width,
      height: rect.height
    }

    this.create(image);

    return this;
  }

  create(image) {
    // create shadow image
    const shadow = document.createElement('img');
    shadow.src = image.src;
    shadow.id = `libra-shadow-${image.id}`;
    shadow.classList.add('libra-shadow');

    // style and position shadow image
    shadow.style.top = `${this.originalPosition.top}px`;
    shadow.style.left = `${this.originalPosition.left}px`;
    shadow.style.width = `${this.originalPosition.width}px`;
    shadow.style.height = `${this.originalPosition.height}px`;
    // Set transition duration from config
    shadow.style.transitionDuration = config.transitionDuration + 'ms';

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
    this.element.classList.add('open');

    this.original.style.visibility = 'hidden';
    if (!document.body.contains(this.element)) this.placeItself();

    Animation.transformMatrix(
      this.element,
      this.originalPosition,
      Animation.calculateFinalState(this.element)
    );
  }

  close() {
    this.isOpen = false;
    this.element.classList.remove('open');

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
