import { memo, type SVGProps } from "react";

export const ChromeIcon = memo<SVGProps<SVGSVGElement>>(({ ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5rem"
    height="1.5rem"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#000000"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    <title>Chrome</title>
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <path d="M12 9h8.4" />
    <path d="M14.598 13.5l-4.2 7.275" />
    <path d="M9.402 13.5l-4.2 -7.275" />
  </svg>
));

ChromeIcon.displayName = "ChromeIcon";
