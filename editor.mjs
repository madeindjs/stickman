import { movePoint } from "./geometry.utils.mjs";
import { Stickman } from "./stickman.mjs";
import { SVG_NS, drawStickman } from "./svg.mjs";

/**
 * Allow user to move a SVG path.
 * @typedef {{cx: number, cy: number, active?: boolean}} HandleProps
 * @param {HandleProps} initialProps
 * @return {[el: SVGCircleElement, set: (props: Partial<HandleProps>) => void]}
 */
function Handle(initialProps) {
  let props = { ...initialProps };

  const handle = document.createElementNS(SVG_NS, "circle");

  function render() {
    if (props.active) {
      handle.setAttributeNS(null, "data-active", "1");
    } else {
      handle.removeAttributeNS(null, "data-active");
    }
    handle.setAttributeNS(null, "stroke", props.active ? "red" : "darkgrey");
    handle.setAttributeNS(null, "stroke-width", "0.5");
    handle.setAttributeNS(null, "r", "1");
    handle.setAttributeNS(null, "fill", "grey");
    handle.setAttributeNS(null, "cx", String(props.cx));
    handle.setAttributeNS(null, "cy", String(props.cy));
  }

  render();

  return [
    handle,
    (newProps) => {
      props = { ...props, ...newProps };
      render();
    },
  ];
}

export function Editor(wrapper = document.createElement("div")) {
  const stickman = new Stickman();

  const svg = drawStickman(stickman);
  svg.setAttribute("height", "500");
  svg.setAttribute("width", "500");

  /** @type {Record<keyof import("./model").StickmanPoints, ReturnType<typeof Handle>>} */
  // @ts-ignore
  const handles = Object.keys(stickman.points).reduce((acc, item) => {
    const [cx, cy] = stickman.points[item];
    acc[item] = Handle({ cx, cy });
    svg.append(acc[item][0]);
    return acc;
  }, {});

  function resetActiveHandles() {
    Object.values(handles).forEach(([_, set]) => set({ active: false }));
  }

  for (const [handle, setHandle] of Object.values(handles)) {
    handle.addEventListener("click", (event) => {
      resetActiveHandles();
      setHandle({ active: true });
    });
  }

  /**
   *
   * @param {import("./model").Point} movement
   */
  function moveActiveHandles(movement) {
    const activeHandles = Object.entries(handles).filter(([key, [handle]]) =>
      handle.hasAttributeNS(null, "data-active")
    );

    const points = { ...stickman.points };

    for (const [key, [_, set]] of activeHandles) {
      const point = movePoint(points[key], movement);
      set({ cx: point[0], cy: point[1] });
      points[key] = point;
    }

    stickman.points = points;
    drawStickman(stickman, svg);
  }

  document.addEventListener("keydown", (ev) => {
    switch (ev.keyCode) {
      case KEY.Left:
        return moveActiveHandles([-1, 0]);
      case KEY.Right:
        return moveActiveHandles([1, 0]);
      case KEY.Down:
        return moveActiveHandles([0, -1]);
      case KEY.Up:
        return moveActiveHandles([0, -1]);
    }
  });

  wrapper.append(svg);

  return wrapper;
}

const KEY = Object.freeze({
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
});
