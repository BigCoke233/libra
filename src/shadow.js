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
    shadow.style.top = this.originalPosition.top + 'px';
    shadow.style.left = this.originalPosition.left + 'px';
    shadow.style.width = this.originalPosition.width + 'px';
    shadow.style.height = this.originalPosition.height + 'px';
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

  updateOriginalPosition() {
    const rect = this.original.getBoundingClientRect();
    this.originalPosition = {
      top: rect.top + window.scrollY + config.offset.y,
      left: rect.left + window.scrollX + config.offset.x,
      width: rect.width,
      height: rect.height,
    };
  }

  open() {
    this.isOpen = true;
    this.element.classList.add('open');

    // Update original position before animation in case viewport changed
    this.updateOriginalPosition();
    this.element.style.top = `${this.originalPosition.top}px`;
    this.element.style.left = `${this.originalPosition.left}px`;
    this.element.style.width = `${this.originalPosition.width}px`;
    this.element.style.height = `${this.originalPosition.height}px`;

    this.original.style.visibility = 'hidden';
    if (!document.body.contains(this.element)) this.placeItself();

    // Wait for image to load before animating
    if (this.element.naturalWidth === 0 || this.element.naturalHeight === 0) {
      this.element.addEventListener(
        'load',
        () => {
          Animation.transformMatrix(
            this.element,
            this.originalPosition,
            Animation.calculateFinalState(this.element),
          );
        },
        { once: true },
      );
    } else {
      Animation.transformMatrix(
        this.element,
        this.originalPosition,
        Animation.calculateFinalState(this.element),
      );
    }
  }

  close() {
    this.isOpen = false;
    this.element.classList.remove('open');

    Animation.resetTransformMatrix(this.element);
    // Wait for animation to complete before showing original and destroying shadow
    setTimeout(() => {
      this.original.style.visibility = 'visible';
      this.destroyItself();
    }, config.transitionDuration);
  }

  placeItself() {
    document.body.appendChild(this.element);
  }

  destroyItself() {
    if (!document.body.contains(this.element)) return;
    document.body.removeChild(this.element);
  }
}
