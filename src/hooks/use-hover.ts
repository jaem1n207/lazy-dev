import React from 'react';

interface HoverHookReturn {
  ref: React.RefObject<HTMLElement>;
  isHovered: boolean;
}

export const useHover = (): HoverHookReturn => {
  const [isHovered, setIsHovered] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  React.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref]);

  return { ref, isHovered };
};
