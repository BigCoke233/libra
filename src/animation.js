export default class Animation {
  static calculateFinalState(element) {
    let finals = {}

    const margin = 50
    const ratio = element.naturalWidth / element.naturalHeight;
    const ww = window.innerWidth - 2*margin;
    const wh = window.innerHeight - 2*margin;

    if (element.naturalWidth > ww) {
      finals.width = ww;
      finals.height = ww / ratio;
    } else {
      finals.width = element.naturalWidth;
      finals.height = element.naturalHeight;
    }

    if (finals.height > wh) {
      finals.height = wh;
      finals.width = wh * ratio;
    }

    finals.top = (wh - finals.height) / 2 + window.scrollY + margin;
    finals.left = (ww - finals.width) / 2 + window.scrollX + margin;

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
