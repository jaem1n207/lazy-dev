import React from 'react';

interface ConditionalRenderProps {
  /**
   * `true`라면 `children`을, `false`라면 `fallback`을 렌더링합니다.
   */
  condition: boolean;
  /**
   * `condition`이 `false`일 때 렌더링할 컴포넌트입니다.
   */
  fallback: React.ReactNode;
  /**
   * `condition`이 `true`일 때 렌더링할 컴포넌트입니다.
   */
  children: React.ReactNode;
}

const ConditionalRender = ({ children, condition, fallback }: ConditionalRenderProps) => {
  return <>{condition ? children : fallback}</>;
};

export default ConditionalRender;
