import React from 'react';
import type { ChangeEventHandler } from 'react';

import { CustomCheckboxContainer, CustomCheckboxInput } from '@reach/checkbox';
import classNames from 'classnames';

interface TagProps {
  tag: string;
  checked: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

const Tag = ({ tag, checked, onChange, disabled }: TagProps) => {
  return (
    <CustomCheckboxContainer
      as="label"
      checked={checked}
      onChange={onChange}
      className={classNames(
        'inline-block relative mb-16pxr mr-16pxr h-auto w-auto cursor-pointer rounded-full px-24pxr py-12pxr transition tablet:px-16pxr tablet:py-8pxr tablet:text-14pxr)',
        {
          'text-tag-text bg-tag-background': !checked,
          'text-tag-text-checked bg-tag-background-checked': checked,
          'focus-within:ring-2 focus-within:ring-primary': !disabled,
          'opacity-25': disabled,
        }
      )}
      disabled={disabled}
    >
      <CustomCheckboxInput checked={checked} value={tag} className="sr-only" />
      <span>{tag}</span>
    </CustomCheckboxContainer>
  );
};

export default Tag;
