import { useState, ReactNode } from 'react';

import { createPortal } from 'react-dom';

import { isEmptyString } from 'Libs/assertions';
import { isBrowser } from 'Libs/environment';
import { uuid } from 'Libs/string';

const prefixId = 'lazy-dev-portal';

export const usePortal = (id: string = '') => {
  const [container] = useState(() => {
    if (!isBrowser) {
      return null;
    }

    const el = document.getElementById(id);

    if (el) {
      return el;
    }

    const newEl = document.createElement('div');
    const portalId = !isEmptyString(id) ? `${prefixId}-${id}` : `${prefixId}-${uuid()}`;
    newEl.setAttribute('id', portalId);
    document.body.appendChild(newEl);

    return newEl;
  });

  const Portal = ({ children }: { children: ReactNode }) => {
    return container ? createPortal(children, container) : null;
  };

  return Portal;
};
