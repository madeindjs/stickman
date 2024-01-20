import { animate as animateOnCanvas, drawStickman as drawStickmanOnCanvas } from "./canvas.mjs";
import { Stickman } from "./stickman.mjs";
import "./style.css";
import { animate as animateOnSvg, drawStickman as drawStickmanOnSvg } from "./svg.mjs";

{
  const stickman = new Stickman();
  const canvas = document.createElement("canvas");
  drawStickmanOnCanvas(stickman, canvas);
  animateOnCanvas(stickman, 50, canvas);
  document.body.append(canvas);
}

{
  const stickman = new Stickman();
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("height", "100");
  svg.setAttribute("width", "100");
  svg.setAttribute("viewBox", "0 0 100 100");
  drawStickmanOnSvg(stickman, svg);
  animateOnSvg(stickman, 50, svg);
  document.body.append(svg);
}

import("./editor/index.jsx").then((mod) => document.body.append(mod.buildEditorOnElement()));
