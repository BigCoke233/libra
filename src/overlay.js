export default class Overlay {
  zIndex = 900;
  zIndexHidden = -100;

  constructor() {
    const overlay = document.createElement('div');
    overlay.id = 'libo-overlay';
    overlay.classList.add('libo-overlay');

    // initialized state
    overlay.style.zIndex = this.zIndexHidden;
    overlay.style.opacity = '0';

    this.element = overlay;
    document.body.appendChild(overlay);

    return this;
  }

  show() {
    this.element.style.opacity = '1';
    this.element.style.zIndex = this.zIndex;
  }

  hide() {
    this.element.style.opacity = '0';
    this.element.style.zIndex = '-100';
  }
}
