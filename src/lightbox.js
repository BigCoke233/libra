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

  constructor({ container }) {
    this.container = container;
    this.initOverlay();
    this.initImages();
    this.initControls();
  }

  initOverlay() {
    this.overlay = new Overlay();
    this.overlay.element.addEventListener('click', e => {
      this.closeCurrent();
    });
  }

  initImages() {
    this.images = document.querySelectorAll(`${this.container} img[data-libo]`);

    function wrapInLink(image) {
      // wrap image with a link if it's not already wrapped
      const parent = image.parentElement;
      let link;
      if (!parent || parent.tagName !== 'A') {
        link = document.createElement('a');
        link.href = image.src;
        // replace image with the linked one
        parent.insertBefore(link, image);
        link.appendChild(image);
      } else {
        link = parent;
      }
      return link;
    }

    this.images.forEach(image => {
      // generate unique id for each image
      image.id = crypto.randomUUID();
      // make sure every image has a link
      const link = wrapInLink(image);
      // click link to open lightbox
      link.addEventListener('click', e => {
        e.preventDefault();
        this.openLightBox(image);
      });
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

  openLightBox(image) {
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

  closeLightBox(image) {
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
    this.closeLightBox(this.currentImage);
  }

  closeAll() {
    this.images.forEach(image => {
      this.closeLightBox(image);
    });
    this.overlay.hide();
  }
}
