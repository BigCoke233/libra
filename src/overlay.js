import config from './config';

export default class Overlay {
  constructor() {
    const overlay = document.createElement('div');
    overlay.id = 'libra-overlay';
    overlay.classList.add('libra-overlay', 'libra-hidden');

    // Set transition duration from config
    overlay.style.transitionDuration = config.transitionDuration + 'ms';

    this.element = overlay;
    document.body.appendChild(overlay);

    return this;
  }

  show() {
    this.element.classList.remove('libra-hidden');
    this.element.classList.add('libra-visible');
  }

  hide() {
    this.element.classList.remove('libra-visible');
    this.element.classList.add('libra-hidden');
  }
}
