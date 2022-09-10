import Rgb from './Rgb.js';

function decimalToHex(decimal) {
  return decimal.toString(16);
}

export default class Hex extends Rgb {
 toCss() {
   const rHex = decimalToHex(this.r);
   const gHex = decimalToHex(this.g);
   const bHex = decimalToHex(this.b);
   return `#${rHex}${gHex}${bHex}`;
 }
}
