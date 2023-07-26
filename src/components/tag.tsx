import React from 'react';
import type { ChangeEventHandler } from 'react';

import { CustomCheckboxContainer, CustomCheckboxInput } from '@reach/checkbox';
import classNames from 'classnames';

import { ELEMENT_CLASS } from 'Types/enum';

interface TagProps {
  tag: string;
  checked: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLLabelElement>;
  disabled?: boolean;
}

const Tag = ({ tag, checked, onChange, onKeyUp, disabled }: TagProps) => {
  return (
    <CustomCheckboxContainer
      as="label"
      checked={checked}
      onChange={onChange}
      onKeyUp={onKeyUp}
      className={classNames(
        `inline-block relative mb-16pxr mr-16pxr select-none h-auto w-auto rounded-full px-24pxr py-12pxr transition tablet:px-16pxr tablet:py-8pxr tablet:text-16pxr outline-none ${ELEMENT_CLASS.MOVING_ELEMENT} border-1pxr border-border-secondary`,
        {
          'text-text-primary bg-bg-tag': !checked,
          'text-text-inner bg-bg-inner': checked,
          'focus-primary opacity-100': !disabled,
          'opacity-25': disabled,
        }
      )}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      <CustomCheckboxInput checked={checked} value={tag} className="sr-only cursor-none" />
      <span>{tag}</span>
    </CustomCheckboxContainer>
  );
};

export default Tag;
