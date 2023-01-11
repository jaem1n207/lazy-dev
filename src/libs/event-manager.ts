interface EventManagerProps {
  dismissCondition: () => boolean;
  triggerCondition: () => boolean;
}

export const toFit = (
  cb: () => void,
  { dismissCondition, triggerCondition }: EventManagerProps
) => {
  if (!cb) throw Error('Callback is required');

  let tick = false;

  return () => {
    if (dismissCondition()) return;
    if (triggerCondition()) {
      cb();
      return;
    }
    if (!tick) {
      tick = true;
      requestAnimationFrame(() => {
        tick = false;
        toFit(cb, { dismissCondition, triggerCondition })();
      });
    }
  };

  // const loop = () => {
  //   if (dismissCondition()) return;
  //   if (triggerCondition()) {
  //     cb();
  //     return;
  //   }
  //   requestAnimationFrame(loop);
  // };
  // loop();
};
