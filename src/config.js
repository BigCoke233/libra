const config = {
  selector: '[data-libra]',
  margin: 50,
  offset: { x: 0, y: 0 }
}

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
