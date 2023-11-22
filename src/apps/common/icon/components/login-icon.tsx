import classNames from 'classnames';

import type { SvgIconData } from '../types';

export const LoginIcon = ({ color, viewBox, className, size }: SvgIconData) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || '24'}
    height={size || '24'}
    viewBox={viewBox || '0 0 24 24'}
    fill={color || 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={classNames('feather feather-log-in', className)}
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
    <polyline points="10 17 15 12 10 7"></polyline>
    <line x1="15" y1="12" x2="3" y2="12"></line>
  </svg>
);
