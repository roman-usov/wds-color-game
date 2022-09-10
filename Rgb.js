import { randomValue, generateRandomValueInRange } from './utilities.js';

const MAX_RGB_VALUE = 255;

export default class Rgb {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static generate() {
    return new this(
      randomValue({max: MAX_RGB_VALUE}),
      randomValue({max: MAX_RGB_VALUE}),
      randomValue({max: MAX_RGB_VALUE})
    );
  }

  // easy: 20% - 100% of the max rgb value
  // medium: 20% - 50% of the max rgb value
  // hard: 20% - 30% of the max rgb value

  // upperEnd (withinTolerance) - the upper end of the range, e.g. less than 100%
  // lowerEnd (outsideTolerance) - the lower end of the range, e.g. more than 20%

  generateSimilar(options) {
    return new this.constructor(
      generateRandomValueInRange({ value: this.r, maxCutoff: MAX_RGB_VALUE, ...options}),
      generateRandomValueInRange({ value: this.g, maxCutoff: MAX_RGB_VALUE, ...options}),
      generateRandomValueInRange({ value: this.b, maxCutoff: MAX_RGB_VALUE, ...options})
    );
 }

 toCss() {
    return `rgb(${this.r},${this.g},${this.b})`
 }
}
