import { drawStickman } from "./canvas.mjs";
import { Stickman } from "./stickman.mjs";
import "./style.css";

const stickman = new Stickman();

const canvas = document.createElement("canvas");

function animate() {
  drawStickman(stickman, canvas);
  stickman.tick();
  setTimeout(() => requestAnimationFrame(animate), 200);
}

animate();

document.body.append(canvas);
