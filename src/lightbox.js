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
    this.overlay.element.addEventListener('click', e => {
      this.closeCurrent();
    });
  }

  initImages() {
    this.images = document.querySelectorAll(this.selector);

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
      if (image.tagName !== 'IMG') return;

      image.id = crypto.randomUUID(); // generate unique id for each image
      const link = wrapInLink(image); // make sure every image has a link

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
