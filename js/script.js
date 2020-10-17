'strict mode'

let ball = $('.ball');
let gateLeft = $('.gate-left');
let gateRight = $('.gate-right');
let field = $('.field');

//периметр поля
let topLT = field.position().top; // 0
let topLL = field.position().left + gateLeft.position().left + gateLeft.width(); // 0
let topRT = topLT; //0
let topRL = gateRight.position().left - ball.width();
let bottomRT = topLT + field.height() - ball.height();
let bottomRL = topRL;
let bottomLL = topLL; // 0
let bottomLT = bottomRT;

//рандомные координаты left
let randomLT = randomInteger(topLT, bottomLT);
let randomRT = randomInteger(topRT, bottomRT);

//позиция ворот
let gateLeftTop = gateLeft.position().top;
let gateLeftBot = gateLeft.position().top + gateLeft.height();
let gateRightTop = gateRight.position().top;
let gateRightBot = gateRight.position().top + gateRight.height();

//счетчики голов
let goalRight = 0;
let goalLeft = 0;
let goalRightText = $('.goal-left');
let goalLeftText = $('.goal-right');
let goal2Right = $('.goal-to-right');
let goal2Left = $('.goal-to-left');
let kick = 0;

// пуск
ball.click(function () {
  if ((ball.position().left > (field.width() / 2 - ball.width())) && (ball.position().left < (field.width() / 2 + ball.width()) && (kick == 0))) {
    goRight();
  } else if ((ball.position().left > (field.width() / 2 - ball.width())) && (ball.position().left < (field.width() / 2 + ball.width()) && (kick == 1))) {
    goLeft();
  } else if (ball.position().left <= topLL) {
    goRight();
  } else {
    goLeft();
  };
})

//случайное число 
function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

//удар в право
function goRight() {
  let topRight = randomInteger(topRT, bottomRT);

  if (((topRight + ball.height() / 2) > gateRightTop) && ((topRight + ball.height() / 2) < gateRightBot)) {
    ball.animate({
      top: topRight,
      left: (topRL + ball.width())
    }, 1000, 'linear', function () {
      fadeGoal2Right();
      kick = 1;
      goalRight++;
      putGoalRight();
      setTimeout('toCentre()', 2000);
      return goalRight, kick;
    });

  } else {
    ball.animate({
      top: topRight,
      left: topRL
    }, 1000, 'linear')
  }
}

//удар в лево
function goLeft() {
  let topLeft = randomInteger(topLT, bottomLT);
  if (((topLeft + ball.height() / 2) > gateLeftTop) && ((topLeft + ball.height() / 2) < gateLeftBot)) {
    ball.animate({
      top: topLeft,
      left: topLL - ball.width()
    }, 1000, 'linear', function () {
      fadeGoal2Left();
      kick = 0;
      goalLeft++;
      putGoalLeft();
      setTimeout('toCentre()', 2000);
      return goalLeft, kick;
    });
  } else {
    ball.animate({
      top: topLeft,
      left: topLL
    }, 1000, 'linear');
  }
}

//центровка мяча после забития гола
function toCentre() {
  let x = (field.height() / 2 - ball.height() / 2);
  let y = (field.width() / 2 - ball.width() / 2);
  ball.css({
    top: x,
    left: y
  })
};

//заполнение счетчика голов
function putGoalRight() {
  goalRightText.html(goalRight);
};

function putGoalLeft() {
  goalLeftText.html(goalLeft);
};

//показ сообщения
function fadeGoal2Right() {
  goal2Right.fadeToggle('slow', 'linear');
  setTimeout(() => goal2Right.fadeToggle('slow', 'linear'), 2000);
};

function fadeGoal2Left() {
  goal2Left.fadeToggle('slow', 'linear');
  setTimeout(() => goal2Left.fadeToggle('slow', 'linear'), 2000);
}