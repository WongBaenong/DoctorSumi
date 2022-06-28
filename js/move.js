const char = document.querySelector(".char");
const resetBtn = document.querySelector(".setting__reset");

const CLICK_SPEED = 2;
const INITIAL_X = 380;
const INITIAL_Y = 280;

let confused = true;
let clicked = false;
let moveCount = 0;

let currPos = {
  x: INITIAL_X,
  y: INITIAL_Y,
};

let clickPos = {
  x: 0,
  y: 0,
};

const movePos = (pos) => {
  char.style.left = `${pos.x}px`;
  char.style.top = `${pos.y}px`;
};

const resetPos = () => {
  currPos = {
    x: INITIAL_X,
    y: INITIAL_Y,
  };
  movePos(currPos);
};

const calcDist = (pos2, pos1) => {
  const diffX = Math.abs(pos2.x - pos1.x);
  const diffY = Math.abs(pos2.y - pos1.y);

  const dist = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  const distPos = {
    x: (diffX / dist) * CLICK_SPEED,
    y: (diffY / dist) * CLICK_SPEED,
  };

  return distPos;
};

const moveChar = () => {
  if (!clicked) {
    return;
  }
  const dist = calcDist(clickPos, currPos);
  isMoved = false;
  currPos.x =
    currPos.x + (clickPos.x > currPos.x === confused ? -1 * dist.x : dist.x);
  currPos.y =
    currPos.y + (clickPos.y > currPos.y === confused ? -1 * dist.y : dist.y);

  movePos(currPos);
};

Array.from(blocks).forEach((block) => {
  block.addEventListener("mousedown", (event) => {
    clicked = true;
    clickPos = {
      x: event.clientX,
      y: event.clientY,
    };
    moveChar();
  });

  block.addEventListener("mousemove", (event) => {
    if (!clicked) {
      return;
    }
    clickPos = {
      x: event.clientX,
      y: event.clientY,
    };
  });

  block.addEventListener("mouseup", () => {
    clicked = false;
  });

  block.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
});

resetBtn.addEventListener("click", resetPos);

movePos(currPos);

setInterval(moveChar, 30);
