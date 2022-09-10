import { randomValue, generateRandomValueInRange } from './utilities.js';

const MAX_HUE_VALUE = 360;
const MAX_SATURATION_VALUE = 100;
const MAX_LUMINOSITY_VALUE = 100;

export default class Hsl {
  constructor(h, s, l) {
    this.h = h;
    this.s = s;
    this.l = l;
  }

  static generate() {
    return new this(
      randomValue({max: MAX_HUE_VALUE}),
      randomValue({max: MAX_SATURATION_VALUE}),
      randomValue({max: MAX_LUMINOSITY_VALUE})
    );
  }

  generateSimilar(options) {
    return new this.constructor(
      generateRandomValueInRange({ value: this.h, maxCutoff: MAX_HUE_VALUE, ...options}),
      generateRandomValueInRange({ value: this.s, maxCutoff: MAX_SATURATION_VALUE, ...options}),
      generateRandomValueInRange({ value: this.l, maxCutoff: MAX_LUMINOSITY_VALUE, ...options})
    );
 }

 toCss() {
    return `hsl(${this.h},${this.s}%,${this.l}%)`
 }
}
