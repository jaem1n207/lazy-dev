export type KbdKey = 'command' | 'shift' | 'ctrl' | 'option' | 'enter';

export const kbdKeyMapMac: Record<KbdKey, string> = {
  command: '⌘',
  shift: '⇧',
  ctrl: '⌃',
  option: '⌥',
  enter: '↵',
};

export const kbdKeyMapWinLinux: Record<KbdKey, string> = {
  command: 'Ctrl',
  shift: 'Shift',
  ctrl: 'Ctrl',
  option: 'Alt',
  enter: 'Enter',
};

export const kbdKeyTitleMap: Record<KbdKey, string> = {
  command: 'Command',
  shift: 'Shift',
  ctrl: 'Ctrl',
  option: 'Option',
  enter: 'Enter',
};
