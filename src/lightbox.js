import Overlay from './overlay.js';
import Shadow from './shadow.js';

export default class LightBox {
  currentImage = null;
  shadows = {};

  /**
   * ============
   * Initializers
   * ============
   */

  constructor({ selector }) {
    this.selector = selector;
    this.initOverlay();
    this.initImages();
    this.initControls();
  }

  initOverlay() {
    this.overlay = new Overlay();
    this.overlay.element.addEventListener('click', () => {
      this.closeCurrent();
    });
  }

  initImages() {
    this.images = document.querySelectorAll(this.selector);
    this.images.forEach(image => {
      if (image.tagName !== 'IMG') return;
      image.id = crypto.randomUUID(); // generate unique id for each image
      image.addEventListener('click', () => this.open(image));  // click image to open lightbox
    });
  }

  initControls() {
    // keyboard shortcuts
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' || e.key === ' ') {
        this.closeCurrent();
      }
    });
    // scroll to dismiss
    document.body.addEventListener('wheel', e => {
      this.closeCurrent();
    });
  }

  /**
   * ============
   * Actions
   * ============
   */

  open(image) {
    // hide and store original image
    image.style.visibility = 'hidden';
    this.currentImage = image;

    // get shadow of this image
    const shadow = this.shadows[image.id] || new Shadow(image);
    if (!this.shadows[image.id]) {
      this.shadows[image.id] = shadow;
    }

    // place and open shadow
    if (!document.body.contains(shadow.element)) shadow.placeItself();
    shadow.open();

    this.overlay.show();
  }

  close(image) {
    // show and unstore original image
    image.style.visibility = 'visible';
    this.currentImage = null;

    // close shadow
    const shadow = this.shadows[image.id];
    if (!shadow) return;
    shadow.close();

    this.overlay.hide();
  }

  closeCurrent() {
    if (!this.currentImage) return;
    this.close(this.currentImage);
  }

  closeAll() {
    this.images.forEach(image => {
      this.close(image);
    });
    this.overlay.hide();
  }
}
