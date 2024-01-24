import type { Accessor, JSX } from "solid-js";
import { useSVGStickmanPaths } from "../../hooks/use-svg-stickman-paths";
import type { StickmanConfiguration, StickmanPoints } from "../../model";

type Props = {
  configuration: Accessor<StickmanConfiguration>;
  points: Accessor<StickmanPoints>;
  childrenBody?: JSX.Element;
  childrenArmLeft?: JSX.Element;
  childrenArmRight?: JSX.Element;
  childrenLegLeft?: JSX.Element;
  childrenLegRight?: JSX.Element;
  childrenHead?: JSX.Element;
};

export default function StickmanSVGInner(props: Props) {
  const { armLeft, armRight, body, legLeft, legRight } = useSVGStickmanPaths(props.configuration, props.points);

  return (
    <>
      <circle r={props.configuration().headRadius} cx={props.points().head[0]} cy={props.points().head[1]} fill="white">
        {props.childrenHead}
      </circle>
      <path d={body()}>{props.childrenBody}</path>
      <path d={armLeft()}>{props.childrenArmLeft}</path>
      <path d={armRight()}>{props.childrenArmRight}</path>
      <path d={legLeft()}>{props.childrenLegLeft}</path>
      <path d={legRight()}>{props.childrenLegRight}</path>
    </>
  );
}
