import * as React from "react";
import Svg, {
  G,
  RadialGradient,
  Stop,
  Path,
  LinearGradient,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

export default function EmptySVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    //@ts-ignore
    <Svg viewBox="0 0 800 800" {...props}>
    <RadialGradient
      id="prefix__a"
      cx={-17770.961}
      cy={-13252.604}
      r={2463.247}
      gradientTransform="matrix(.1458 0 0 .0086 2991.004 864.427)"
      gradientUnits="userSpaceOnUse"
    >
      <Stop offset={0} stopColor="#666" />
      <Stop offset={0.132} stopColor="#6d6d6d" stopOpacity={0.868} />
      <Stop offset={0.325} stopColor="#818181" stopOpacity={0.675} />
      <Stop offset={0.554} stopColor="#a1a1a1" stopOpacity={0.446} />
      <Stop offset={0.811} stopColor="#cdcdcd" stopOpacity={0.189} />
      <Stop offset={1} stopColor="#f2f2f2" stopOpacity={0} />
    </RadialGradient>
    <Path
      opacity={0.5}
      fill="url(#prefix__a)"
      d="M757.9 750.5c0-11.7-160.3-21.3-357.9-21.3-197.7 0-357.9 9.5-357.9 21.3 0 11.7 160.3 21.3 357.9 21.3 197.7-.1 357.9-9.6 357.9-21.3z"
    />
    <Path
      fill="#6D6D6D"
      d="M202.1 216.1l-16 8.7L96.4 68.1l1.9-4.2zM239.8 250.4l16 8.6L364.5 67.7l-7.1-4.2z"
    />
    <LinearGradient
      id="prefix__b"
      gradientUnits="userSpaceOnUse"
      x1={135.249}
      y1={46.641}
      x2={155.057}
      y2={46.641}
      gradientTransform="rotate(-33.447 182.53 128.555)"
    >
      <Stop offset={0} stopColor="#d7d7d7" />
      <Stop offset={1} stopColor="#969696" />
    </LinearGradient>
    <Path
      fill="url(#prefix__b)"
      d="M125.6 92.2l-16.5 11-22.3-33.8 16.5-10.9z"
    />
    <LinearGradient
      id="prefix__c"
      gradientUnits="userSpaceOnUse"
      x1={291.751}
      y1={118.248}
      x2={311.56}
      y2={118.248}
      gradientTransform="rotate(28.872 465.85 213.583)"
    >
      <Stop offset={0} stopColor="#d7d7d7" />
      <Stop offset={1} stopColor="#969696" />
    </LinearGradient>
    <Path
      fill="url(#prefix__c)"
      d="M367 73.3l-17.4-9.5 19.6-35.5 17.4 9.6z"
    />
    <G>
      <LinearGradient
        id="prefix__d"
        gradientUnits="userSpaceOnUse"
        x1={190.659}
        y1={763.061}
        x2={190.659}
        y2={682.195}
      >
        <Stop offset={0} stopColor="#2e302f" />
        <Stop offset={1} stopColor="#1c1e1d" />
      </LinearGradient>
      <Path fill="url(#prefix__d)" d="M194 748.5h-24.5l7.9-67.6h34.5z" />
      <Path
        opacity={0.4}
        fill="#6D6D6D"
        d="M194 748.5h-8.6l11.9-67.6h14.6z"
      />
      <G>
        <LinearGradient
          id="prefix__e"
          gradientUnits="userSpaceOnUse"
          x1={85.995}
          y1={763.061}
          x2={85.995}
          y2={682.195}
          gradientTransform="matrix(-1 0 0 1 695.33 0)"
        >
          <Stop offset={0} stopColor="#2e302f" />
          <Stop offset={1} stopColor="#1c1e1d" />
        </LinearGradient>
        <Path fill="url(#prefix__e)" d="M606 748.5h24.5l-7.9-67.6h-34.5z" />
        <Path
          opacity={0.4}
          fill="#6D6D6D"
          d="M606 748.5h8.6l-11.9-67.6h-14.6z"
        />
      </G>
    </G>
    <Path
      fill="#772808"
      d="M682.2 675c0 11-8.9 19.9-19.9 19.9H137.7c-11 0-19.9-8.9-19.9-19.9 0-11 8.9-19.9 19.9-19.9h524.7c10.9 0 19.8 8.9 19.8 19.9z"
    />
    <G>
      <LinearGradient
        id="prefix__f"
        gradientUnits="userSpaceOnUse"
        x1={399.998}
        y1={148.293}
        x2={399.998}
        y2={786.136}
      >
        <Stop offset={0} stopColor="#e89356" />
        <Stop offset={1} stopColor="#bb5013" />
      </LinearGradient>
      <Path
        fill="url(#prefix__f)"
        d="M744.5 641.2c0 22-17.8 39.7-39.8 39.7H95.3c-22 0-39.7-17.8-39.7-39.7V245c0-22 17.8-39.7 39.7-39.7h609.5c22 0 39.8 17.8 39.8 39.7v396.2z"
      />
      <LinearGradient
        id="prefix__g"
        gradientUnits="userSpaceOnUse"
        x1={399.997}
        y1={193.698}
        x2={399.997}
        y2={682.045}
      >
        <Stop offset={0.004} stopColor="#fbfbfb" />
        <Stop offset={1} stopColor="#969696" />
      </LinearGradient>
      <Path
        fill="url(#prefix__g)"
        d="M732.2 248.7c0-18.3-14.9-33.2-33.2-33.2H100.9c-18.3 0-33.2 14.9-33.2 33.2v388.8c0 18.3 14.9 33.2 33.2 33.2H699c18.3 0 33.2-14.9 33.2-33.2V248.7z"
      />
      <LinearGradient
        id="prefix__h"
        gradientUnits="userSpaceOnUse"
        x1={399.995}
        y1={683.711}
        x2={399.995}
        y2={222.456}
      >
        <Stop offset={0} stopColor="#4d4f4e" />
        <Stop offset={0.996} stopColor="#969696" />
      </LinearGradient>
      <Path
        fill="url(#prefix__h)"
        d="M725.3 248.7c0-14.4-11.8-26.2-26.2-26.2H100.9c-14.4 0-26.2 11.8-26.2 26.2v388.8c0 14.4 11.8 26.2 26.2 26.2H699c14.4 0 26.2-11.8 26.2-26.2V248.7z"
      />
      <LinearGradient
        id="prefix__i"
        gradientUnits="userSpaceOnUse"
        x1={399.995}
        y1={683.711}
        x2={399.995}
        y2={222.457}
      >
        <Stop offset={0.004} stopColor="#fbfbfb" />
        <Stop offset={1} stopColor="#969696" />
      </LinearGradient>
      <Path
        opacity={0.3}
        fill="url(#prefix__i)"
        d="M542.8 295c-98.4 14.9-197.9 22.5-297.4 24.7-48.7 1.1-97.5 1.8-146.2 1.8-8.2 0-16.3-.1-24.5-.4v198c8.4-.1 16.8-.2 25.3-.5 46.1-1.6 91.9-6.1 137.7-11.3 88.8-10.1 177.6-21.5 264.9-40.8 76.9-17 151.8-40.1 222.6-73.9V255.1c-59.8 17.1-120.7 30.5-182.4 39.9z"
      />
      <Path fill="#191514" d="M613.1 451.8h72.2v6.3h-72.2z" />
      <LinearGradient
        id="prefix__j"
        gradientUnits="userSpaceOnUse"
        x1={649.19}
        y1={464.179}
        x2={649.19}
        y2={470.46}
      >
        <Stop offset={0} stopColor="#2e302f" />
        <Stop offset={1} stopColor="#1c1e1d" />
      </LinearGradient>
      <Path fill="url(#prefix__j)" d="M613.1 464.2h72.2v6.3h-72.2z" />
      <Path fill="#191514" d="M613.1 476.5h72.2v6.3h-72.2z" />
      <LinearGradient
        id="prefix__k"
        gradientUnits="userSpaceOnUse"
        x1={649.19}
        y1={488.87}
        x2={649.19}
        y2={495.148}
      >
        <Stop offset={0} stopColor="#2e302f" />
        <Stop offset={1} stopColor="#1c1e1d" />
      </LinearGradient>
      <Path fill="url(#prefix__k)" d="M613.1 488.9h72.2v6.3h-72.2z" />
      <LinearGradient
        id="prefix__l"
        gradientUnits="userSpaceOnUse"
        x1={649.19}
        y1={501.212}
        x2={649.19}
        y2={507.496}
      >
        <Stop offset={0} stopColor="#2e302f" />
        <Stop offset={1} stopColor="#1c1e1d" />
      </LinearGradient>
      <Path fill="url(#prefix__l)" d="M613.1 501.2h72.2v6.3h-72.2z" />
      <Path fill="#191514" d="M613.1 513.6h72.2v6.3h-72.2z" />
      <LinearGradient
        id="prefix__m"
        gradientUnits="userSpaceOnUse"
        x1={649.19}
        y1={525.903}
        x2={649.19}
        y2={532.182}
      >
        <Stop offset={0} stopColor="#2e302f" />
        <Stop offset={1} stopColor="#1c1e1d" />
      </LinearGradient>
      <Path fill="url(#prefix__m)" d="M613.1 525.9h72.2v6.3h-72.2z" />
      <Path fill="#191514" d="M613.1 538.2h72.2v6.3h-72.2z" />
      <LinearGradient
        id="prefix__n"
        gradientUnits="userSpaceOnUse"
        x1={649.19}
        y1={550.591}
        x2={649.19}
        y2={556.875}
      >
        <Stop offset={0} stopColor="#2e302f" />
        <Stop offset={1} stopColor="#1c1e1d" />
      </LinearGradient>
      <Path fill="url(#prefix__n)" d="M613.1 550.6h72.2v6.3h-72.2z" />
      <Path fill="#191514" d="M613.1 562.9h72.2v6.3h-72.2z" />
      <LinearGradient
        id="prefix__o"
        gradientUnits="userSpaceOnUse"
        x1={649.19}
        y1={575.282}
        x2={649.19}
        y2={581.561}
      >
        <Stop offset={0} stopColor="#2e302f" />
        <Stop offset={1} stopColor="#1c1e1d" />
      </LinearGradient>
      <Path fill="url(#prefix__o)" d="M613.1 575.3h72.2v6.3h-72.2z" />
      <Path fill="#191514" d="M613.1 587.6h72.2v6.3h-72.2z" />
      <LinearGradient
        id="prefix__p"
        gradientUnits="userSpaceOnUse"
        x1={649.19}
        y1={603.7}
        x2={649.19}
        y2={613.123}
      >
        <Stop offset={0} stopColor="#2e302f" />
        <Stop offset={1} stopColor="#1c1e1d" />
      </LinearGradient>
      <Path fill="url(#prefix__p)" d="M613.1 603.7h72.2v9.4h-72.2z" />
      <G>
        <LinearGradient
          id="prefix__q"
          gradientUnits="userSpaceOnUse"
          x1={595.587}
          y1={444.083}
          x2={697.658}
          y2={444.083}
        >
          <Stop offset={0} stopColor="#2e302f" />
          <Stop offset={1} stopColor="#1c1e1d" />
        </LinearGradient>
        <Path
          fill="url(#prefix__q)"
          d="M685.1 628.6h-77c-6.9 0-12.5-5.6-12.5-12.5v-344c0-6.9 5.6-12.5 12.5-12.5h77c6.9 0 12.5 5.6 12.5 12.5v344c.1 6.9-5.6 12.5-12.5 12.5zm-77-367c-5.8 0-10.5 4.7-10.5 10.4v344c0 5.8 4.7 10.4 10.5 10.4h77c5.8 0 10.5-4.7 10.5-10.4V272c0-5.8-4.7-10.4-10.5-10.4h-77z"
        />
      </G>
      <G>
        <Path
          opacity={0.2}
          fill="#141615"
          d="M679.5 302.3c7.7 18.2-.9 39.2-19.1 46.9-18.2 7.7-39.2-.9-46.9-19.1-7.7-18.2.9-39.2 19.1-46.9 18.3-7.6 39.3.9 46.9 19.1z"
        />
        <LinearGradient
          id="prefix__r"
          gradientUnits="userSpaceOnUse"
          x1={565.593}
          y1={413.605}
          x2={637.142}
          y2={413.605}
          gradientTransform="rotate(-22.868 371.389 245.226)"
        >
          <Stop offset={0} stopColor="#2e302f" />
          <Stop offset={1} stopColor="#1c1e1d" />
        </LinearGradient>
        <Path
          fill="url(#prefix__r)"
          d="M681.7 297.1c7.7 18.2-.9 39.2-19.1 46.9-18.2 7.7-39.2-.9-46.9-19.1-7.7-18.2.9-39.2 19.1-46.9 18.2-7.6 39.2.9 46.9 19.1z"
        />
        <Path
          fill="#6D6D6D"
          d="M677 299.1c6.6 15.6-.7 33.7-16.4 40.3-15.6 6.6-33.7-.7-40.3-16.4-6.6-15.6.7-33.7 16.4-40.3 15.7-6.6 33.7.7 40.3 16.4z"
        />
        <LinearGradient
          id="prefix__s"
          gradientUnits="userSpaceOnUse"
          x1={569.753}
          y1={375.666}
          x2={635.255}
          y2={454.267}
          gradientTransform="rotate(-22.868 371.389 245.226)"
        >
          <Stop offset={0} stopColor="#d7d7d7" />
          <Stop offset={1} stopColor="#969696" />
        </LinearGradient>
        <Path
          opacity={0.7}
          fill="url(#prefix__s)"
          d="M673.3 300.6c5.7 13.6-.6 29.3-14.2 35-13.6 5.7-29.3-.6-35-14.2-5.7-13.6.6-29.3 14.2-35 13.6-5.7 29.3.6 35 14.2z"
        />
        <Path
          fill="#EA924F"
          d="M667.8 303c4.4 10.5-.5 22.6-11 27.1-10.5 4.4-22.6-.5-27.1-11-4.4-10.5.5-22.6 11-27.1s22.6.5 27.1 11z"
        />
        <LinearGradient
          id="prefix__t"
          gradientUnits="userSpaceOnUse"
          x1={602.628}
          y1={377.827}
          x2={602.628}
          y2={450.235}
          gradientTransform="rotate(-22.868 371.389 245.226)"
        >
          <Stop offset={0.004} stopColor="#fbfbfb" />
          <Stop offset={1} stopColor="#969696" />
        </LinearGradient>
        <Path
          fill="url(#prefix__t)"
          d="M665.7 333.4l-10.5 4.4-22.3-52.9 10.5-4.4z"
        />
        <LinearGradient
          id="prefix__u"
          gradientUnits="userSpaceOnUse"
          x1={565.621}
          y1={414.98}
          x2={596.99}
          y2={414.98}
          gradientTransform="rotate(-22.868 371.389 245.226)"
        >
          <Stop offset={0} stopColor="#2e302f" stopOpacity={0} />
          <Stop offset={1} stopColor="#1c1e1d" />
        </LinearGradient>
        <Path
          opacity={0.7}
          fill="url(#prefix__u)"
          d="M632.9 284.9L616.2 326c6 13.1 18.9 20.9 32.5 20.9l5.3-11.8-21.1-50.2z"
        />
      </G>
      <G>
        <Path
          opacity={0.2}
          fill="#141615"
          d="M665.6 370.1c17.2 11.8 21.5 35.3 9.7 52.5-11.8 17.2-35.3 21.5-52.5 9.7-17.2-11.8-21.5-35.3-9.7-52.5 11.8-17.2 35.3-21.6 52.5-9.7z"
        />
        <LinearGradient
          id="prefix__v"
          gradientUnits="userSpaceOnUse"
          x1={387.25}
          y1={575.33}
          x2={462.811}
          y2={575.33}
          gradientTransform="rotate(-55.487 366.971 270.437)"
        >
          <Stop offset={0} stopColor="#2e302f" />
          <Stop offset={1} stopColor="#1c1e1d" />
        </LinearGradient>
        <Path
          fill="url(#prefix__v)"
          d="M672.5 364.2c17.2 11.8 21.5 35.3 9.7 52.5-11.8 17.2-35.3 21.5-52.5 9.7-17.2-11.8-21.5-35.3-9.7-52.5 11.8-17.2 35.3-21.5 52.5-9.7z"
        />
        <Path
          fill="#6D6D6D"
          d="M669.5 368.6c14.8 10.2 18.5 30.4 8.4 45.1-10.2 14.8-30.4 18.5-45.1 8.4-14.8-10.2-18.5-30.4-8.4-45.1 10.1-14.8 30.3-18.6 45.1-8.4z"
        />
        <LinearGradient
          id="prefix__w"
          gradientUnits="userSpaceOnUse"
          x1={391.643}
          y1={535.264}
          x2={460.819}
          y2={618.274}
          gradientTransform="rotate(-55.487 366.971 270.437)"
        >
          <Stop offset={0} stopColor="#d7d7d7" />
          <Stop offset={1} stopColor="#969696" />
        </LinearGradient>
        <Path
          opacity={0.7}
          fill="url(#prefix__w)"
          d="M667.1 372.1c12.8 8.8 16.1 26.4 7.3 39.2-8.8 12.8-26.4 16.1-39.2 7.3-12.8-8.8-16.1-26.4-7.3-39.2 8.8-12.9 26.3-16.1 39.2-7.3z"
        />
        <Path
          fill="#B8460A"
          d="M663.5 377.4c9.9 6.8 12.4 20.4 5.6 30.3-6.8 9.9-20.4 12.4-30.3 5.6-9.9-6.8-12.4-20.4-5.6-30.3 6.7-9.9 20.3-12.5 30.3-5.6z"
        />
        <LinearGradient
          id="prefix__x"
          gradientUnits="userSpaceOnUse"
          x1={426.361}
          y1={537.545}
          x2={426.361}
          y2={614.017}
          gradientTransform="rotate(-55.487 366.971 270.437)"
        >
          <Stop offset={0.004} stopColor="#fbfbfb" />
          <Stop offset={1} stopColor="#969696" />
        </LinearGradient>
        <Path
          fill="url(#prefix__x)"
          d="M678.9 405.6l-6.8 9.9-50-34.4 6.8-9.9z"
        />
        <LinearGradient
          id="prefix__y"
          gradientUnits="userSpaceOnUse"
          x1={387.279}
          y1={576.782}
          x2={420.406}
          y2={576.782}
          gradientTransform="rotate(-55.487 366.971 270.437)"
        >
          <Stop offset={0} stopColor="#2e302f" stopOpacity={0} />
          <Stop offset={1} stopColor="#1c1e1d" />
        </LinearGradient>
        <Path
          opacity={0.7}
          fill="url(#prefix__y)"
          d="M622.1 381.1l8.5 46c12.8 8.2 28.7 7.8 40.8 0l-2-13.5-47.3-32.5z"
        />
      </G>
      <LinearGradient
        id="prefix__z"
        gradientUnits="userSpaceOnUse"
        x1={327.123}
        y1={248.343}
        x2={327.123}
        y2={639.634}
      >
        <Stop offset={0} stopColor="#141615" />
        <Stop offset={0.428} stopColor="#282928" />
        <Stop offset={1} stopColor="#484948" />
      </LinearGradient>
      <Path
        fill="url(#prefix__z)"
        d="M561.6 592.1c0 23.8-18.8 43.1-41.9 43.1H134.5c-23.1 0-41.9-19.3-41.9-43.1v-302c0-23.8 18.8-43.1 41.9-43.1h385.3c23.1 0 41.9 19.3 41.9 43.1v302z"
      />
      <Path
        fill="#141615"
        d="M552.4 586.1c0 22.9-18 41.4-40.2 41.4h-370c-22.2 0-40.2-18.5-40.2-41.4v-290c0-22.9 18-41.4 40.2-41.4h370c22.2 0 40.2 18.5 40.2 41.4v290z"
      />
      <Path
        fill="#D1D4D1"
        d="M547.1 583.2c0 22.3-17.6 38.5-39.3 38.5H146.5c-21.7 0-39.3-16.1-39.3-38.5V300c0-22.3 17.6-40.5 39.3-40.5h361.3c21.7 0 39.3 18.1 39.3 40.5v283.2z"
      />
      <Path
        fill="#173979"
        d="M507.8 259.6h-29.9v362.1h29.9c21.7 0 39.3-16.1 39.3-38.5V300c0-22.3-17.6-40.4-39.3-40.4z"
      />
      <Path fill="#FFA800" d="M165 259.6h64.3v362.1H165z" />
      <Path fill="#22BDE4" d="M229.5 259.6h64.3v362.1h-64.3z" />
      <Path fill="#1D8C09" d="M293.9 259.6h64.3v362.1h-64.3z" />
      <Path fill="#B2448D" d="M358.4 259.6h64.3v362.1h-64.3z" />
      <Path fill="#DB1F36" d="M422.8 259.6h64.3v362.1h-64.3z" />
      <LinearGradient
        id="prefix__A"
        gradientUnits="userSpaceOnUse"
        x1={327.123}
        y1={490.884}
        x2={327.123}
        y2={260.264}
      >
        <Stop offset={0} stopColor="#fbfbfb" stopOpacity={0.5} />
        <Stop offset={1} stopColor="#fbfbfb" stopOpacity={0} />
      </LinearGradient>
      <Path
        opacity={0.8}
        fill="url(#prefix__A)"
        d="M141.1 438.3c56.1 12 112.9 19.1 170.3 20.9 56.2 1.7 113.1.9 168.6-9.2 19.1-3.5 37.9-8 56.2-13.3V304.8c0-21.2-16.7-38.5-37.3-38.5H155.4c-20.6 0-37.4 17.2-37.4 38.5V433c8 2.1 15.9 3.8 23.1 5.3z"
      />
    </G>
  </Svg>
  );
}
