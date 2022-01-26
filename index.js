const contWidth = 500;
const defGridSize = 16;

const container = document.querySelector('.container');
const clearBtn = document.querySelector('.clear');
const gridInput = document.querySelector('#grid-size');
const randomBtn = document.querySelector('.random');

let isRandom = false;

function createGrid(size = defGridSize) {
  container.innerHTML = '';
  container.style.cssText = `
    height: ${contWidth}px;
    width: ${contWidth}px;
    display: grid;
    grid-template-rows: repeat(${size}, 1fr);
    grid-template-columns: repeat(${size}, 1fr);
  `;

  for (let i = 1; i <= size * size; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.addEventListener('mouseover', draw);
    container.appendChild(box);
  }
}

const randomNum = (max, min = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function draw(e) {
  const color = document.querySelector('.color-picker').value;
  const randRed = randomNum(256);
  const randGreen = randomNum(256);
  const randBlue = randomNum(256);
  const randColor = `rgb(${randRed}, ${randGreen}, ${randBlue})`;
  this.style.backgroundColor = isRandom ? randColor : color;
}

function clearGrid(e) {
  const boxes = document.querySelectorAll('.box');
  boxes.forEach((box) => (box.style.backgroundColor = '#fff'));
}

function updateGridLabel(e) {
  const gridSpans = document.querySelectorAll('.grid-num');
  gridSpans.forEach((span) => (span.textContent = this.value));
}

function updateGridSize(e) {
  createGrid(this.value);
}

function toggleRainbow(e) {
  isRandom = !isRandom;
  randomBtn.classList.toggle('btn-on');
}

window.addEventListener('load', () => createGrid());
clearBtn.addEventListener('click', clearGrid);
gridInput.addEventListener('input', updateGridLabel);
gridInput.addEventListener('change', updateGridSize);
randomBtn.addEventListener('click', toggleRainbow);
