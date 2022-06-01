let game = {
  width: 800,
  height: 800,
};

let target = {
  quantity: 40,
  width: 60,
  top: 0,
  left: 0,
  spawnTargets: function () {
    let targetContainer = document.querySelector(".target__container");

    for (let i = 0; i < target.quantity; i++) {
      let targetElement = document.createElement("div");
      targetElement.className = "target";
      targetElement.style.width = target.width + 'px';
      targetElement.style.height = target.width + 'px'
      targetContainer.append(targetElement);
      console.log(targetElement.style.top );
    }
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
      stopGame();
    }
  },
  speedTop: 50,
  speedLeft: 45,
  ballBounceCheck: function () {
    if (
      ball.left >= plate.left &&
      ball.left <= plate.left + plate.width &&
      ball.top + ball.speedTop > plate.top &&
      ball.top < plate.top + plate.height
    ) {
      ball.top = plate.top - plate.height;
      ball.isDirectionDown = false;
      console.log(ball.top);
    } else if (ball.top - ball.speedTop < 0) {
      ball.top = 0;
      ball.isDirectionDown = true;
      console.log(ball.top);
    }
    if (ball.left - ball.speedLeft < 0) {
      ball.left = 0;
      ball.isDirectionleft = false;
    } else if (ball.left + ball.speedLeft > game.width) {
      ball.left = game.width - ball.width;
      ball.isDirectionleft = true;
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
