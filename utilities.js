export function randomValue({min = 0, max}) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function addPercentage(value, percent) {
  return value * (1 + percent / 100);
}

export function subtractPercentage(value, percent) {
  return value * (1 - percent / 100);
}

function generateRanges({ value, maxCutoff, upperEnd, lowerEnd }) {
  const upperEndIncrementor = Math.floor(upperEnd * maxCutoff);
  const lowerEndIncrementor = Math.ceil(lowerEnd * maxCutoff);

  const aboveRangeMin = value + lowerEndIncrementor;
  // const aboveRangeMin = Math.ceil(addPercentage(value, lowerEnd * 100));
  const aboveRangeMax = Math.min(value+ upperEndIncrementor, maxCutoff);
  // const aboveRangeMax = Math.floor(Math.min(addPercentage(value, upperEnd * 100), maxCutoff));

  // console.log('above range', 'min', aboveRangeMin, 'max', aboveRangeMax);

  const belowRangeMin = Math.max(value - upperEndIncrementor, 0);
  // const belowRangeMin = Math.ceil(Math.max(subtractPercentage(value, upperEnd * 100), 0));
  const belowRangeMax = value - lowerEndIncrementor;
  // const belowRangeMax = Math.floor(subtractPercentage(value, lowerEnd * 100));

  // console.log('below range', 'min', belowRangeMin, 'max', belowRangeMax);

  const ranges = [];
  if (aboveRangeMax > aboveRangeMin) {
    ranges.push({ min: aboveRangeMin, max: aboveRangeMax });
  }

  if (belowRangeMax > belowRangeMin) {
    ranges.push({ min: belowRangeMin, max: belowRangeMax })
  }
  return ranges;
}

export function generateRandomValueInRange(options) {
  const ranges = generateRanges(options)
  // console.log('ranges', ranges);

  const range = ranges.length > 1 ? ranges[randomValue({max: ranges.length - 1})] : ranges[0];
  // console.log(range);

  return randomValue(range);
}
