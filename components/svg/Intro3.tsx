import * as React from "react";
import Svg, { LinearGradient, Stop, Path, Ellipse } from "react-native-svg";

export default function Intro_3_SVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    //@ts-ignore
    <Svg viewBox="0 0 44 68.7" {...props}>
      <Path fill="#BD0201" d="M3 28.8l4.2 39.9h26.3l7.7-39.9z" />
      <Path
        opacity={0.45}
        fill="#CC3C3B"
        d="M30.2 28.9L24 68.7h9.5l7.7-39.9z"
      />
      <LinearGradient
        id="prefix__a"
        gradientUnits="userSpaceOnUse"
        x1={152.96}
        y1={4.17}
        x2={182.19}
        y2={4.17}
        gradientTransform="matrix(1 0 0 -1 -149.96 46.42)"
      >
        <Stop offset={0} stopColor="#535353" />
        <Stop offset={1} stopColor="#a8a8a8" />
      </LinearGradient>
      <Path
        opacity={0.55}
        fill="url(#prefix__a)"
        d="M32.2 28.8H3l2.8 27c13.4-3 25-13.1 26.4-27z"
      />
      <Path
        opacity={0.75}
        fill="#CC3C3B"
        d="M38.2 44L41 29.6 3.2 30.7l1.1 10.8z"
      />
      <Path fill="#E0C8B4" d="M.6 26.8L0 37.9l42.5-.6L44 25.5z" />
      <Path
        fill="#F5EDE0"
        d="M19.9 34.1s19.2-5.2 24.1-8.5c0 0-16.2-2.3-26.3-1.5-5.7.6-11.4 1.5-17.1 2.8 0-.1 14.7 7.6 19.3 7.2z"
      />
      <Path
        fill="#F90"
        d="M30.2 51.2c0 4.3-4 7.7-8.8 7.7s-8.8-3.5-8.8-7.7 3.9-7.7 8.8-7.7 8.8 3.4 8.8 7.7z"
      />
      <Ellipse fill="#F5EDE0" cx={21.7} cy={51.1} rx={5.8} ry={5.1} />
      <Path fill="#F90" d="M3.4 0L2.3 4.3l18.6 4.9L19 29.4h4.6l1.8-21.8z" />
      <Path opacity={0.35} fill="#B6B59F" d="M25.4 32.5L19 29.4h4.6l8.2 1.1z" />
    </Svg>
  );
}
