import type { Accessor, JSX } from "solid-js";
import { useSVGStickmanPaths } from "../../hooks/use-svg-stickman-paths";
import type { Stickman } from "../../model";

type Props = {
  stickman: Accessor<Stickman>;
  childrenBody?: JSX.Element;
  childrenArmLeft?: JSX.Element;
  childrenArmRight?: JSX.Element;
  childrenLegLeft?: JSX.Element;
  childrenLegRight?: JSX.Element;
};

export default function StickmanSVGInner(props: Props) {
  const points = () => props.stickman().points;
  const conf = () => props.stickman().configuration;

  const { armLeft, armRight, body, legLeft, legRight } = useSVGStickmanPaths(props.stickman);

  return (
    <>
      <circle r={conf().headRadius} cx={points().head[0]} cy={points().head[1]} fill="white" />
      <path d={body()}>{props.childrenBody}</path>
      <path d={armLeft()}>{props.childrenArmLeft}</path>
      <path d={armRight()}>{props.childrenArmRight}</path>
      <path d={legLeft()}>{props.childrenLegLeft}</path>
      <path d={legRight()}>{props.childrenLegRight}</path>
    </>
  );
}
