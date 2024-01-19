import { animate, drawStickman } from "./canvas.mjs";
import { Stickman } from "./stickman.mjs";
import "./style.css";

const stickman = new Stickman();

const canvas = document.createElement("canvas");

drawStickman(stickman, canvas);

animate(stickman, 50, canvas);

document.body.append(canvas);
