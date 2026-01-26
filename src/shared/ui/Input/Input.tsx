'use client';

import clsx from 'clsx';
import React from 'react';

import SVGIcon from '../Icon/SVGIcon';
import { IconMapTypes } from '../Icon/icon';
import { style } from './Input.style';

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'value' | 'onChange'
> {
  value?: string;
  placeholder?: string;
  icon?: IconMapTypes;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { value, placeholder = 'Enter text...', icon, disabled = false, className, onChange, ...rest },
  ref
) {
  const { containerStyle, inputStyle, iconStyle } = style();
  return (
    <div className={clsx(containerStyle(), className)}>
      <input
        ref={ref}
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className={inputStyle()}
        onChange={onChange}
        {...rest}
      />
      {icon && (
        <SVGIcon
          icon={icon}
          size="lg"
          className={iconStyle()}
          aria-hidden="true"
          focusable="false"
        />
      )}
    </div>
  );
});

export default Input;
