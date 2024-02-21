import { memo, type SVGProps } from "react";

export const NpmIcon = memo<SVGProps<SVGSVGElement>>(({ ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#000000"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...rest}
  >
    <title>Npm</title>
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
    <path d="M12 12l8 -4.5" />
    <path d="M12 12l0 9" />
    <path d="M12 12l-8 -4.5" />
    <path d="M16 5.25l-8 4.5" />
  </svg>
));

NpmIcon.displayName = "NpmIcon";
