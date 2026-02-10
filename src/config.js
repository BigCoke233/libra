const config = {
    // selects images that load libra.js
    selector: '[data-libra]',

    // margin between viewport and zoomed image
    // in px
    margin: 50,

    // in small screens, it's best to not use margins
    // otherwise, the zoomed image gets even smaller
    // define on screen smaller than what size, margin is set to 0
    zeroMarginBreakpoint: 768,

    // shifts the zoomed image if needed
    offset: { x: 0, y: 0 },

    transitionDuration: 200, // milliseconds
    imageCursor: 'zoom-in',
};

function deepMerge(target, source) {
  for (const key in source) {
    if (
      typeof source[key] === 'object' &&
      source[key] !== null &&
      !Array.isArray(source[key])
    ) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

export function setConfig(newConfig) {
  deepMerge(config, newConfig);
}

export default config;
