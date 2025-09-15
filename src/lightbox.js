import utility from './utility.js';
import Overlay from './overlay.js';
import Shadow from './shadow.js';

export default class LightBox {
  overlay = new Overlay();

  /**
   * ============
   * Initializers
   * ============
   */

  constructor({ container }) {
    this.container = container;
    this.init();
  }

  init() {
    const container = document.querySelectorAll(this.container);
    const images = document.querySelectorAll(`${this.container} img[data-libo]`);

    images.forEach(image => {
      // generate unique id for image
      const id = utility.generateUniqueId(image.src);
      image.id = id;

      // get parent and wrap image with a link if it's not already wrapped
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

      // add event listener to open lightbox on click
      link.addEventListener('click', e => {
        e.preventDefault();
        this.openLightBox(image);
      });

    });
  }

  /**
   * ============
   * Actions
   * ============
   */

  openLightBox(image) {
    const shadow = Shadow.find(image) || new Shadow(image);
    shadow.open();

    this.overlay.add(shadow);
    this.overlay.show();
  }
}
