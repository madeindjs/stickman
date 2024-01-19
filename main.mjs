import { animate } from "./canvas.mjs";
import { Stickman } from "./stickman.mjs";
import "./style.css";

const stickman = new Stickman();

const canvas = document.createElement("canvas");

animate(stickman, 200, canvas);

document.body.append(canvas);
