import "p5";
import * as brush from "p5.brush";

const SPEED_SUPPRESSOR = 0.035;
const DAMPING_COEFFICIENT = -0.001;
let START_HUE = randomGlobal(0, 360);

let AMPLITUDE_X1 = randomGlobal(100, window.innerWidth / 4);
let FREQUENCY_X1 = Math.random() + 2;
let PHASE_X1 = Math.random() * 2;
let DAMPING_X1 = randomGlobal(1, 1.5) * DAMPING_COEFFICIENT;

let AMPLITUDE_X2 = randomGlobal(100, window.innerWidth / 4);
let FREQUENCY_X2 = randomGlobal(2, 3);
let PHASE_X2 = Math.random() * 2;
let DAMPING_X2 = randomGlobal(1, 1.5) * DAMPING_COEFFICIENT;

let AMPLITUDE_Y1 = randomGlobal(100, window.innerHeight / 4);
let FREQUENCY_Y1 = Math.random() + 2;
let PHASE_Y1 = Math.random() * 2;
let DAMPING_Y1 = randomGlobal(1, 1.5) * DAMPING_COEFFICIENT;

let AMPLITUDE_Y2 = randomGlobal(100, window.innerHeight / 4);
let FREQUENCY_Y2 = randomGlobal(2, 3);
let PHASE_Y2 = Math.random() * 2;
let DAMPING_Y2 = randomGlobal(1, 1.5) * DAMPING_COEFFICIENT;

let prePointX = 0;
let prePointY = 0;

let canvas;
let canvasReset = false;

function setup() {
  frameRate(60);

  canvas = createCanvas(windowWidth, windowHeight);

  // background(
  //   color(
  //     `hsb(${((START_HUE + 180) % 360).toFixed(0)}, ${random(50, 90).toFixed(
  //       0
  //     )}%, 6%)`
  //   )
  // );
  background(30);
  strokeWeight(3);
  colorMode(HSL);
}

function draw() {
  const time = frameCount * SPEED_SUPPRESSOR;

  const defaultStrokeWeight = random(3, 8);
  strokeWeight(defaultStrokeWeight);
  const strokeColor = color(
    `hsb(${((START_HUE + random(0, 10)) % 360).toFixed(0)}, ${random(
      40,
      100
    ).toFixed(0)}%, ${random(40, 90).toFixed(0)}%)`
  );
  strokeColor.setAlpha(128);
  stroke(strokeColor);

  const dampX1 = pow(Math.E, DAMPING_X1 * time);
  const dampX2 = pow(Math.E, DAMPING_X2 * time);
  const dampY1 = pow(Math.E, DAMPING_Y1 * time);
  const dampY2 = pow(Math.E, DAMPING_Y2 * time);

  const x =
    AMPLITUDE_X1 * sin(FREQUENCY_X1 * time + PHASE_X1) * dampX1 +
    AMPLITUDE_X2 * sin(FREQUENCY_X2 * time + PHASE_X2) * dampX2;

  const y =
    AMPLITUDE_Y1 * sin(FREQUENCY_Y1 * time + PHASE_Y1) * dampY1 +
    AMPLITUDE_Y2 * sin(FREQUENCY_Y2 * time + PHASE_Y2) * dampY2;

  if (prePointX === 0 && prePointY === 0) {
    prePointX = x + width / 2;
    prePointY = y + height / 2;
  }

  point(x + width / 2, y + height / 2);

  strokeWeight((defaultStrokeWeight / 3) * 2);
  stroke(
    color(
      `hsb(${((START_HUE + random(0, 10)) % 360).toFixed(0)}, ${random(
        40,
        100
      ).toFixed(0)}%, ${random(40, 90).toFixed(0)}%)`
    )
  );
  line(x + width / 2, y + height / 2, prePointX, prePointY);

  prePointX = x + width / 2;
  prePointY = y + height / 2;

  if ([dampX1, dampX2, dampY1, dampY2].some((damp) => damp < 0.97)) {
    reset();
  }
}

// p5.js requires `setup` and `draw` to be methods of global object
window.setup = setup;
window.draw = draw;

function randomGlobal(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function reset() {
  frameCount = 0;

  prePointX = 0;
  prePointY = 0;

  START_HUE = randomGlobal(0, 360);

  AMPLITUDE_X1 = randomGlobal(100, window.innerWidth / 3);
  FREQUENCY_X1 = Math.random() + 2;
  PHASE_X1 = Math.random() * 2;
  DAMPING_X1 = randomGlobal(1, 1.5) * DAMPING_COEFFICIENT;

  AMPLITUDE_X2 = randomGlobal(100, window.innerWidth / 3);
  FREQUENCY_X2 = randomGlobal(2, 3);
  PHASE_X2 = Math.random() * 2;
  DAMPING_X2 = randomGlobal(1, 1.5) * DAMPING_COEFFICIENT;

  AMPLITUDE_Y1 = randomGlobal(100, window.innerHeight / 3);
  FREQUENCY_Y1 = Math.random() + 2;
  PHASE_Y1 = Math.random() * 2;
  DAMPING_Y1 = randomGlobal(1, 1.5) * DAMPING_COEFFICIENT;

  AMPLITUDE_Y2 = randomGlobal(100, window.innerHeight / 3);
  FREQUENCY_Y2 = randomGlobal(2, 3);
  PHASE_Y2 = Math.random() * 2;
  DAMPING_Y2 = randomGlobal(1, 1.5) * DAMPING_COEFFICIENT;
}

window.onresize = function () {
  canvas.size(window.innerWidth, window.innerHeight);
  canvasReset = true;
};
