export default class Shadow {
  zIndex = '100'
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
    shadowImage.id = `libo-shadow-${image.id}`;
    shadowImage.classList.add('libo-shadow');

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
    this.startingState = {
      top: this.element.offsetTop,
      left: this.element.offsetLeft,
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    }

    // temporarily finalize element
    // and get final state
    this.element.classList.add('open');
    this.element.style.width = 'unset';
    this.element.style.height = 'unset';

    this.finalState = {
      top: this.element.offsetTop,
      left: this.element.offsetLeft,
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    }

    // re-initialize element and play animation
    this.element.classList.remove('open');
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
    this.animate(this.finalState, this.startingState);
  }

  animate(starts, finals) {
    // Set up the interval for smooth transition
    const steps = 20; // Number of steps for smoothness
    let step = 0;

    // Using requestAnimationFrame for smoother animation
    const frame = () => {
      // Calculate the progress (from 0 to 1)
      const progress = step / steps;

      // Interpolate the current values based on progress
      const currentTop = starts.top + (finals.top - starts.top) * progress;
      const currentLeft = starts.left + (finals.left - starts.left) * progress;
      const currentWidth = starts.width + (finals.width - starts.width) * progress;
      const currentHeight = starts.height + (finals.height - starts.height) * progress;

      // Update the element's style
      this.element.style.top = `${currentTop}px`;
      this.element.style.left = `${currentLeft}px`;
      this.element.style.width = `${currentWidth}px`;
      this.element.style.height = `${currentHeight}px`;

      // Log current size for debugging
      console.log(`Step ${step}: ${currentWidth}, ${currentHeight}`);

      // Increase the step count
      step++;

      // Continue animating until we reach the final step
      if (step < steps) {
        requestAnimationFrame(frame);
      } else {
        this.element.classList.toggle('open');
      }
    };

    // Start the animation
    requestAnimationFrame(frame);
  }
}
