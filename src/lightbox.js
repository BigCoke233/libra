import Overlay from './overlay.js';
import Shadow from './shadow.js';

export default class LightBox {
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
      this.closeAll();
    });
  }

  initImages() {
    this.images = document.querySelectorAll(`${this.container} img[data-libo]`);
    this.images.forEach(image => {
      image.id = crypto.randomUUID(); // generate unique id for image
      const link = this.wrapInLink(image);
      // add event listener to open lightbox on click
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
        this.closeAll();
      }
    });
    // scroll to dismiss
    document.body.addEventListener('wheel', e => {
      this.closeAll();
    });
  }

  wrapInLink(image) {
    // wrap image with a link if it's not already wrapped
    const parent = image.parentElement;
    let link;
    if (!parent || parent.tagName !== 'A') {
      link = document.createElement('a');
      link.href = image.src;
      link.dataset.liboLink = true;

      parent.insertBefore(link, image);
      link.appendChild(image);
    } else {
      link = parent;
    }
    return link;
  }

  /**
   * ============
   * Actions
   * ============
   */

  openLightBox(image) {
    image.style.visibility = 'hidden';
    const shadow = this.shadows[image.id] || new Shadow(image);
    if (!this.shadows[image.id]) {
      this.shadows[image.id] = shadow;
    }

    if (!document.body.contains(shadow.element)) shadow.placeItself();
    shadow.open();
    this.overlay.show();
  }

  closeLightBox(image) {
    image.style.visibility = 'visible';
    const shadow = this.shadows[image.id];
    if (!shadow) return;

    shadow.close();
    this.overlay.hide();
  }

  closeAll() {
    this.images.forEach(image => {
      this.closeLightBox(image);
    });
    this.overlay.hide();
  }
}
