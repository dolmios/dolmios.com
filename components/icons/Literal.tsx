import { SVGProps, type JSX } from "react";

export function Literal(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg fill="currentColor" height="64" version="1" viewBox="0 0 48 48" width="64" {...props}>
      <g>
        <path d="M13 18c-.8 5.5-1.1 10.2-.9 10.4.2.2 2.8.7 5.7 1.1 4.9.6 5.4.5 5-1.1-.2-1.1-1.3-2-2.8-2.2-4.8-.6-4.8-.5-3.5-9.1C17.7 8.8 17.6 8 15.4 8c-.7 0-1.6 3.5-2.4 10zm12.5-7.1c.4 1.3 0 2-1.6 2.4-2.3.6-1.7 2.7.7 2.7 1.1 0 1.2.4.4 1.9-1.3 2.5.3 3.6 2.1 1.5 1.2-1.4 1.4-1.4 2.5.1 1.7 2.3 3.7 1 2.4-1.6-.9-1.6-.7-1.9 1-1.9 1.1 0 2-.5 2-1 0-.6-.7-1-1.5-1-1.1 0-1.4-.7-.9-2.5.7-2.9-1-3.4-2.6-.8-1 1.7-1 1.7-2 0-1.4-2.3-3.3-2.2-2.5.2zm-2 24.6c-4.4.8-8.6 1.4-9.2 1.4-.7.1-1.3.8-1.3 1.6 0 1.8 2.3 1.8 13.5.2 6.2-1 8-1.6 8.3-3 .4-2 0-2-11.3-.2z" />
      </g>
    </svg>
  );
}
