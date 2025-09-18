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
    this.fetchOriginalPosition();
    this.create(image);

    return this;
  }

  create(image) {
    // create shadow image
    const shadow = document.createElement('img');
    shadow.src = image.src;
    shadow.id = `libra-shadow-${image.id}`;
    shadow.classList.add('libra-shadow');
    shadow.style.transitionDuration = config.transitionDuration + 'ms';

    this.element = shadow;

    // set positioning and place shadow element
    this.positionShadow();
    this.placeItself();
  }

  fetchOriginalPosition() {
    const rect = this.original.getBoundingClientRect();
    this.originalPosition = {
      top: rect.top + window.scrollY + config.offset.y,
      left: rect.left + window.scrollX + config.offset.x,
      width: rect.width,
      height: rect.height,
    };
  }

  positionShadow() {
    this.element.style.top = this.originalPosition.top + 'px';
    this.element.style.left = this.originalPosition.left + 'px';
    this.element.style.width = this.originalPosition.width + 'px';
    this.element.style.height = this.originalPosition.height + 'px';
  }

  /**
   * ============
   * Actions
   * ============
   */

  open() {
    this.isOpen = true;
    this.element.classList.add('open');

    // Update original position before animation in case viewport changed
    this.fetchOriginalPosition();
    this.positionShadow();

    this.original.style.visibility = 'hidden';
    if (!document.body.contains(this.element)) this.placeItself();

    // play animation
    const animate = () =>
      Animation.transformMatrix(
        this.element,
        this.originalPosition,
        Animation.calculateFinalState(this.element),
      );

    if (this.element.naturalWidth === 0 || this.element.naturalHeight === 0) {
      // Wait for image to load before animating
      this.element.addEventListener('load', animate, { once: true });
    } else {
      // animate directly if loaded
      animate();
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
