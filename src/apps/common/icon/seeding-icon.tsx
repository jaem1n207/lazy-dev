import { type SVGProps, memo } from 'react';

export const SeedingIcon = memo<SVGProps<SVGSVGElement>>(({ ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3rem"
    height="3rem"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3" />
    <path d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3" />
    <path d="M12 20l0 -10" />
  </svg>
));

SeedingIcon.displayName = 'SeedingIcon';