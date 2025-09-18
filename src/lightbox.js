import Overlay from './overlay';
import Shadow from './shadow';
import config from './config';
import { setConfig } from './config';

export default class LightBox {
  currentImage = null;
  shadows = {};

  /**
   * ============
   * Initializers
   * ============
   */

  constructor(config) {
    setConfig(config);

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
    this.images = document.querySelectorAll(config.selector);
    this.images.forEach(image => {
      if (image.tagName !== 'IMG') return;
      image.id = crypto.randomUUID(); // generate unique id for each image
      image.style.cursor = config.imageCursor;
      image.addEventListener('click', () => this.open(image)); // click image to open lightbox
    });
  }

  initControls() {
    // keyboard shortcuts
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' || e.key === ' ')
        this.closeCurrent();
    });
    // scroll to dismiss
    document.body.addEventListener('wheel', e => this.closeCurrent());
    document.body.addEventListener('touchmove', e => this.closeCurrent());
  }

  /**
   * ============
   * Actions
   * ============
   */

  // open lightbox = open shadow + show overlay
  open(image) {
    this.currentImage = image;

    const shadow = this.shadows[image.id] || new Shadow(image);
    if (!this.shadows[image.id]) {
      this.shadows[image.id] = shadow;
    }

    shadow.open();
    this.overlay.show();
  }

  // close lightbox = remove shadow + hide overlay
  close(image) {
    this.currentImage = null;

    if (!this.shadows[image.id]) return;
    this.shadows[image.id].close();

    this.overlay.hide();
  }

  closeCurrent() {
    if (!this.currentImage) return;
    this.close(this.currentImage);
  }
}
