let game = {
  width: 800,
  height: 800,
};
let plate = {
  left: 0,
  width: 250,
  height: 30,
  top: 700,
  speed: 30,
  plateMovement: function () {
    let plateElement = document.querySelector(".plate");

    document.addEventListener("keydown", function (event) {
      if (event.code == "KeyA") {
        if (plate.left - plate.speed >= 0) {
          plate.left -= plate.speed;
        } else if (plate.left - plate.speed < 0) {
          plate.left = 0;
        }
        plateElement.style.left = `${plate.left}px`;
      }
      if (event.code == "KeyD") {
        if (plate.left + plate.speed + plate.width <= 800) {
          plate.left += plate.speed;
        } else if (plate.left + plate.speed + plate.width > 800) {
          plate.left = 800 - plate.width;
        }
        plateElement.style.left = `${plate.left}px`;
      }
    });
  },
};
let target = {
  quantity: 40,
  width: 60,
  height: 60,
  top: 0,
  left: 0,
  spawnTargets: function () {
    let targetContainer = document.querySelector(".target__container");

    for (let i = 0; i < target.quantity; i++) {
      let targetElement = document.createElement("div");
      targetElement.className = "target";
      targetElement.style.width = target.width + "px";
      targetElement.style.height = target.width + "px";
      targetElement.style.top = target.top + "px";
      targetElement.style.left = target.left + "px";
      target.left += target.width + 5;
      if (target.left + target.width > game.width) {
        target.top += target.height + 5;
        target.left = 0;
      }
      targetContainer.append(targetElement);
    }
  },
  killAllTargets: function () {
    let targetElements = document.querySelectorAll(".target");
    for (let i = 0; i < targetElements.length; i++) {
      targetElements[i].parentNode.removeChild(targetElements[i]);
    }
    this.left = 0;
    this.top = 0;
  },
};
let ball = {
  left: 0,
  top: 0,
  height: 30,
  width: 30,
  isDirectionDown: true,
  isDirectionleft: false,
  isOut: function () {
    if (ball.top > game.height) {
      ball.top = 0;
      target.killAllTargets();
      stopGame();
      target.spawnTargets();
    }
  },
  speedTop: 20,
  speedLeft: 20,
  ballBounceCheck: function () {
    if (
      ball.left >= plate.left &&
      ball.left <= plate.left + plate.width &&
      ball.top + ball.speedTop > plate.top &&
      ball.top < plate.top + plate.height
    ) {
      ball.top = plate.top - plate.height;
      ball.isDirectionDown = false;
    } else if (ball.top - ball.speedTop < 0) {
      ball.top = 0;
      ball.isDirectionDown = true;
    }
    if (ball.left - ball.speedLeft < 0) {
      ball.left = 0;
      ball.isDirectionleft = false;
    } else if (ball.left + ball.speedLeft >= game.width) {
      ball.left = game.width - ball.width;
      ball.isDirectionleft = true;
    }

    let targets = document.querySelectorAll(".target");
    for (let i = 0; i < targets.length; i++) {
      let targetLeft = parseInt(targets[i].style.left);
      let targetTop = parseInt(targets[i].style.top);
      let targetHeight = parseInt(targets[i].style.height);
      let targetWidth = parseInt(targets[i].style.width);
      let targetBottom = targetTop + targetHeight;
      let targetRight = targetLeft + targetWidth;
      if (
        ball.top + ball.speedTop <= targetBottom &&
        ball.left + ball.speedLeft >= targetLeft &&
        ball.left + this.speedLeft <= targetRight
      ) {
        ball.top = targetBottom;
        targets[i].parentNode.removeChild(targets[i]);
        console.log("qq");
        ball.isDirectionDown = true;
      }
    }
  },
  ballBounce: function () {},
  ballMovement: function () {
    let ballElement = document.querySelector(".ball");

    if (this.isDirectionDown == false) {
      this.top -= this.speedTop;
    } else if (this.isDirectionDown == true) {
      this.top += this.speedTop;
    }
    if (this.isDirectionleft == true) {
      this.left -= this.speedLeft;
    } else if (this.isDirectionleft == false) {
      this.left += this.speedLeft;
    }
    this.ballBounceCheck();
    this.isOut();
    ballElement.style.top = `${this.top}px`;
    ballElement.style.left = `${this.left}px`;
  },
};

let startButton = document.querySelector(".start");
let stopButton = document.querySelector(".stop");
let startMessage = document.querySelector(".startMessage");
let mySetInterval;

let startGame = function () {
  startInterval(mySetInterval);
  startButton.style.display = "none";
  stopButton.style.display = "inline-block";
  startMessage.style.display = "none";
};

let stopGame = function () {
  stopInterval(mySetInterval);
  startButton.style.display = "inline-block";
  stopButton.style.display = "none";
  startMessage.style.display = "block";
};
function stopInterval() {
  clearInterval(mySetInterval);
}
function startInterval() {
  mySetInterval = setInterval(function () {
    ball.ballMovement();
  }, 200);
}
stopButton.addEventListener("click", stopGame);
startButton.addEventListener("click", startGame);

plate.plateMovement();
target.spawnTargets();
