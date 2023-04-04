import '@fontsource/fira-mono';

import './src/styles/global.css';
import 'prismjs/themes/prism-tomorrow.css';

import React, { useEffect } from 'react';

import type { GatsbyBrowser } from 'gatsby';
import { createPortal } from 'react-dom';

import CustomCursor from './src/components/custom-cursor';
import { useIsTouchDevice } from './src/hooks/use-is-touch-device';

const withCustomCursor = (Component: React.ComponentType) => {
  const CustomCursorWrapper: React.FC<any> = (props) => {
    const isTouchDevice = useIsTouchDevice();

    useEffect(() => {
      const body = document.body;

      if (isTouchDevice) {
        body.classList.remove('hide-cursor');
      } else {
        body.classList.add('hide-cursor');
      }

      return () => {
        body.classList.remove('hide-cursor');
      };
    }, [isTouchDevice]);

    return (
      <>
        {!isTouchDevice && typeof document !== 'undefined'
          ? createPortal(<CustomCursor />, document.body)
          : null}
        <Component {...props} />
      </>
    );
  };

  CustomCursorWrapper.displayName = `withCustomCursor(${Component.displayName || Component.name})`;

  return CustomCursorWrapper;
};

export const wrapPageElement = ({ element, props }: any) => {
  return React.createElement(withCustomCursor(element.type), props);
};

const UPDATE_SCROLL_TIME_OUT = 1;

/**
 * 블로그 상세 페이지에서 뒤로가기를 눌렀을 때 스크롤 위치를 유지하기 위한 설정
 * 스크롤 복원할 때, 블로그 상세 페이지의 스크롤이 홈에서 저장된 스크롤 위치로 먼저 복원되고,
 * 블로그 홈으로 이동되서 잠깐 깜빡이는 문제를 해결하기 위함
 * @see https://github.com/gatsbyjs/gatsby/issues/28794#issuecomment-905173663
 */
export const shouldUpdateScroll: GatsbyBrowser['shouldUpdateScroll'] = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  window.history.scrollRestoration = 'manual';
  const currentPosition = getSavedScrollPosition(location);
  window.setTimeout(() => {
    window.scrollTo(...currentPosition);
  }, UPDATE_SCROLL_TIME_OUT);
  return false;
};

export const onServiceWorkerUpdateReady: GatsbyBrowser['onServiceWorkerUpdateReady'] = () => {
  const answer = window.confirm(
    `새로운 버전이 있어요. ` + `다시 로드하여 새로워진 블로그를 만나보세요`
  );

  if (answer === true) {
    window.location.reload();
  }
};
