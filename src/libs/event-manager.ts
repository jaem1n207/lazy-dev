/**
 * Original Code
 * @see https://github.com/JaeYeopHan/gatsby-starter-bee/blob/master/src/utils/event-manager.js
 */

interface EventManagerProps {
  dismissCondition: () => boolean;
  triggerCondition: () => boolean;
}

export const toFit = (
  cb: () => void,
  { dismissCondition = () => false, triggerCondition = () => true }: EventManagerProps
) => {
  if (!cb) throw Error('Callback is required');

  let tick = false;

  return () => {
    if (tick) return;

    tick = true;
    return requestAnimationFrame(() => {
      if (dismissCondition()) {
        tick = false;
        return;
      }
      if (triggerCondition()) {
        tick = false;
        return cb();
      }
    });
  };
};
