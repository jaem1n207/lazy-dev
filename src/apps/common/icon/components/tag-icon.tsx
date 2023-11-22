import classNames from 'classnames';

import type { SvgIconData } from '../types';

export const TagIcon = ({ color, viewBox, className, size }: SvgIconData) => (
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
    className={classNames('feather feather-tag', className)}
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);
