import { MouseEvent, KeyboardEvent, FormEvent } from 'react';

export const generateHandleClick = (changeFunc: (e: FormEvent) => void) => (
  e: MouseEvent<HTMLSpanElement>
) => {
  changeFunc(e);
  e.currentTarget.blur();
};

export const generateHandleKeypress = (changeFunc: (e: FormEvent) => void) => (
  e: KeyboardEvent
) => {
  if (
    e.keyCode !== 32 &&
    e.keyCode !== 13 &&
    e.charCode !== 32 &&
    e.charCode !== 13
  ) {
    return;
  }
  e.preventDefault();
  changeFunc(e);
};
