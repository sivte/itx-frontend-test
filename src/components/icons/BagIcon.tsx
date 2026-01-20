import type { SVGProps } from "react";

export default function BagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth={1}>
        <path
          strokeLinejoin="round"
          d="M4 9h16l-.835 9.181A2 2 0 0 1 17.174 20H6.826a2 2 0 0 1-1.991-1.819z"
        ></path>
        <path strokeLinecap="round" d="M8 11V8a4 4 0 1 1 8 0v3"></path>
      </g>
    </svg>
  );
}
