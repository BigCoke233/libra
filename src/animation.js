import config from './config';

export default class Animation {
  static calculateFinalState(element) {
    let finals = {}

    let margin = config.margin;
    if (window.innerWidth <= config.zeroMarginBreakpoint) {
        margin = 0
    }

    const nw = element.naturalWidth;
    const nh = element.naturalHeight;
    const ratio = nw / nh;
    const ww = window.innerWidth - 2*margin;
    const wh = window.innerHeight - 2*margin;

    // size image based on width first
    finals.width =  (nw > ww) ? ww : nw;
    finals.height = (nw > ww) ? ww / ratio : nh;

    // if height is too big, adjust based on height
    if (finals.height > wh) {
      finals.height = wh;
      finals.width = wh * ratio;
    }

    finals.top = (wh - finals.height) / 2 + window.scrollY + margin + config.offset.y;
    finals.left = (ww - finals.width) / 2 + window.scrollX + margin + config.offset.x;

    return finals;
  }

  static transformMatrix(element, starts, finals) {
    // Calculate scaling factors based on width and height interpolation
    const scaleX = finals.width / starts.width;
    const scaleY = finals.height / starts.height;

    // Calculate the center of the starting and final positions
    const startCenterX = starts.left + starts.width / 2;
    const startCenterY = starts.top + starts.height / 2;
    const finalCenterX = finals.left + finals.width / 2;
    const finalCenterY = finals.top + finals.height / 2;

    const translateX = finalCenterX - startCenterX;
    const translateY = finalCenterY - startCenterY;

    // Apply the transform with matrix (scale + translate)
    element.style.transform = `matrix(${scaleX}, 0, 0, ${scaleY}, ${translateX}, ${translateY})`;
  }

  static resetTransformMatrix(element) {
    element.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
  }
}
