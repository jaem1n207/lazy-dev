export const clickableTransform = () => {
  const MAX_TRANSFORM_VALUE = 20; // tx 및 ty의 최대값 지정
  const TRANSFORM_INCREMENT = 0.5; // tx 및 ty의 증가 단위

  const updateTransform = (element: HTMLElement, mouseX: number, mouseY: number) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    const tx = Math.max(
      -MAX_TRANSFORM_VALUE,
      Math.min(
        MAX_TRANSFORM_VALUE,
        ((mouseX - left - width / 2) / (width / 2)) * MAX_TRANSFORM_VALUE
      )
    );
    const ty = Math.max(
      -MAX_TRANSFORM_VALUE,
      Math.min(
        MAX_TRANSFORM_VALUE,
        ((mouseY - top - height / 2) / (height / 2)) * MAX_TRANSFORM_VALUE
      )
    );
    element.style.transform = `matrix(1, 0, 0, 1, ${tx * TRANSFORM_INCREMENT}, ${
      ty * TRANSFORM_INCREMENT
    })`;
  };

  const handleMouseMove = (event: MouseEvent, clickable: HTMLElement) => {
    requestAnimationFrame(() => {
      updateTransform(clickable, event.clientX, event.clientY);
    });
  };

  const handleMouseOut = (clickable: HTMLElement) => {
    requestAnimationFrame(() => {
      clickable.style.transform = 'translate3d(0px, 0px, 0px)';
    });
  };

  return {
    handleMouseMove,
    handleMouseOut,
  };
};
