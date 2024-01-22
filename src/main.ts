import { MOVEMENTS_DEF_WALK } from "./movements/walk.js";
import "./style.css";

import("./components/editor/index.jsx").then((mod) => document.body.append(mod.buildEditorOnElement()));

import("./components/svg/index.jsx").then((mod) =>
  document.body.append(mod.buildAnimatedStickmanOnElement(MOVEMENTS_DEF_WALK))
);
