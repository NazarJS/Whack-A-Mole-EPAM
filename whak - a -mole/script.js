const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
let level = 1;
let levelSpead = 1100;
let isDisable = false;
let arr = [];

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    //   console.log('Ah nah thats the same one bud');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(levelSpead, levelSpead);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  disable();
  peep();
  lvlUp();

  setTimeout(() => {
    timeUp = true;
    countScore();
    console.log(localStorage);
    level++;
    drawTable();
    disable();
  }, 10000);
}
//funcion count score
function countScore() {
  arr = JSON.parse(localStorage.getItem('arr')) || [];
  arr.push(score);
  localStorage.setItem('arr', JSON.stringify(arr));
}
function bonk(event) {
  if (!isDisable) return; // stop the game after setTimeout time

  if (!event.isTrusted) return; // cheater!
  score = score + 1;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

// function level up
function lvlUp() {
  level < 8
    ? (document.getElementById('par').innerHTML = `Level: ${level}`)
    : confirm('Are u want start again ?') //if level more then 7 return back to first level
    ? initializingPage()
    : false;

  levelSpead -= 100;
}
//function disable button
function disable() {
  let btn = document.getElementById('btn');
  isDisable = !isDisable;
  btn.disabled = isDisable;
}
//function draw a table with score
function drawTable() {
  let table = document.getElementById('table');
  table.innerHTML = `<tr><th>Level</th><th>Score</th></tr>`;

  arr.forEach((item, index) => {
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${index + 1}</td><td>${item}</td>`;
    table.append(tr);
  });
}

// function adds settings after reboot
function initializingPage() {
  localStorage.clear();
  localStorage.setItem('score', '');
  level = 1;
  levelSpead = 1100;
  document.getElementById('par').innerHTML = `Level: ${level}`;
}
initializingPage();

moles.forEach((mole) => mole.addEventListener('click', bonk));
