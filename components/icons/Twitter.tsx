import { SVGProps, type JSX } from "react";

export function Quitter(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg height="32" version="1.1" viewBox="0 0 32 32" width="32" {...props}>
      <g>
        <path
          d="M 17.5,4.5 C 21.623,4.84028 25.623,5.00694 29.5,5C 27.9627,9.92603 26.1294,15.0927 24,20.5C 17.8782,26.6153 10.7115,28.1153 2.5,25C 2.16667,24.6667 1.83333,24.3333 1.5,24C 3.9519,23.7105 6.28523,23.0438 8.5,22C 2.7165,17.9208 1.04984,12.4208 3.5,5.5C 6.05352,7.94403 9.05352,9.6107 12.5,10.5C 14.6303,8.9185 16.2969,6.9185 17.5,4.5 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
