import { SVGProps } from "react";

export function GitHub(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      preserveAspectRatio="xMidYMid meet"
      {...props}>
      <g
        transform="translate(0.000000,16.000000) scale(0.100000,-0.100000)"
        fill="currentColor"
        stroke="none">
        <path
          d="M25 135 c-33 -32 -33 -78 1 -112 14 -14 28 -22 31 -19 4 3 -2 13 -13
22 -16 13 -17 15 -1 10 21 -7 23 10 2 18 -16 6 -20 44 -7 61 9 13 75 14 84 1
13 -19 9 -55 -8 -64 -9 -5 -14 -18 -12 -31 l3 -23 28 25 c53 50 19 137 -53
137 -19 0 -40 -9 -55 -25z"
        />
      </g>
    </svg>
  );
}