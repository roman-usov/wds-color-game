import Rgb from "./Rgb.js";
import Hex from "./Hex.js";
import Hsl from "./Hsl.js"

const COLOR_MAP = {
  rgb: Rgb,
  hex: Hex,
  hsl: Hsl,
}

const DIFFICULTY_MAP = {
  easy: {
    upperEnd: 1,
    lowerEnd: 0.2,
  },
  medium: {
    upperEnd: 0.5,
    lowerEnd: 0.2,
  },
  hard: {
    upperEnd: 0.3,
    lowerEnd: 0.2,
  },
}

// Formatter
// Difficulty - Config for the formatter

// Render
// 1. Get a formatter - every time page loads, on change of format, on change of difficulty
// 2. Configure formatter based on difficulty
// 3. Generate colors
// 4. Render colors
// 5. Handle clicking a color

// Generate correct color
// Generate similar colors based on difficulty

const colorGridEl = document.querySelector('.color-grid');
const resultsEl = document.querySelector('.results');
const colorStringEl = document.querySelector('.color-string');
const resultTextEl = document.querySelector('[data-results-text]');
const nextBtnEl = document.querySelector('[data-next-color]');

function generateColors({ format, difficulty }) {
  const difficultyRules = DIFFICULTY_MAP[difficulty];
  const colorFormatter = COLOR_MAP[format];

  console.log(colorFormatter);

  const correctColor = colorFormatter.generate();
  console.log(correctColor);

  let colors = [correctColor];

  for (let i = 0; i < 5; i += 1) {
     colors = [...colors, correctColor.generateSimilar(difficultyRules)];
  }

  return { colors, correctColor };
}

function render() {
  const format = document.querySelector('[name="format"]:checked').value;
  const difficulty = document.querySelector('[name="difficulty"]:checked').value;

  const { colors, correctColor } = generateColors({ format, difficulty });

  console.log('colors', colors);

  colorGridEl.innerHTML = '';

  colorStringEl.textContent = correctColor.toCss();

  const colorElements = colors.sort(() => Math.random() - 0.5).map(color => {
    const button = document.createElement('button');
    button.style.backgroundColor = color.toCss();
    return { color, button };
  })

  colorElements.forEach(({ color, button }) => {
    button.addEventListener('click', () => {
      resultsEl.classList.remove('hide');
      resultTextEl.textContent = color === correctColor ? 'Correct' : 'Wrong';

      colorElements.forEach(({ color: col, button: btn }) => {
        btn.disabled = true;
        btn.classList.toggle('wrong', col !== correctColor);
      })
    })
    colorGridEl.appendChild(button);
  })

  resultsEl.classList.add('hide');
}

render();

document.addEventListener('change', e => {
  if (e.target.matches('input[type="radio"]')) render();
})

nextBtnEl.addEventListener('click', render);
