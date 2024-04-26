'use strict';

const table = document.getElementById("table");
const scoreText = document.getElementById("score");
const cards = [];

// 配列にshuffle関数を登録
Array.prototype.shuffle = function () {
  let currentIndex = this.length;
  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    const temp = this[currentIndex - 1];
    this[currentIndex - 1] = this[randomIndex];
    this[randomIndex] = temp;
    currentIndex--;
  }
  return this;
}

// 1~10までの数字を2つずつ、合計20、配列cardsに格納
for (let i = 1; i <= 10; i++) {
  cards.push(i);
  cards.push(i);
}
cards.shuffle();

for (let i = 0; i < 4; i++) {
  const tr = document.createElement('tr');
  for (let j = 0; j < 5; j++) {
    const td = document.createElement('td');
    td.classList.add('back');
    td.number = cards[(i * 5) + j];
    tr.appendChild(td);
    td.addEventListener('click', (e) => {
      flip(e);
    });
  }
  table.appendChild(tr);
}

let startTime = null;
let timer;

startTime = Date.now();
timer = setInterval(() => {
  const now = Date.now();
  const elapsedTime = Math.floor((now - startTime) / 1000);
  document.getElementById('timer').textContent = elapsedTime;
}, 1000);

let prevCard = null;
let flipTimer = NaN;
let score = 0;

function flip(e) {
  const src = e.target;

  // 既に2枚表か、表のカードをクリックした時はreturn
  if (flipTimer || src.textContent != "") {
    return;
  }

  const n = src.number;
  src.classList.remove('back');
  src.textContent = n;

  // 1枚目の場合
  if (prevCard == null) {
    prevCard = src;
    return;
  }

  // 2枚目の場合
  if (prevCard.number == n) {  // アタリの場合
    prevCard = null;
    score += 10;
    scoreText.textContent = score;
    if (score == 100) {
      clearInterval(timer);
    }
  } else {  // ハズレの場合
    flipTimer = setTimeout(() => {  // カードをめくった1秒後に実行
      src.classList.add('back');
      src.textContent = "";
      prevCard.classList.add('back');
      prevCard.textContent = "";
      prevCard = null;
      flipTimer = NaN;
    }, 1000);
  }
}