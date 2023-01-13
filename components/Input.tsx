import React, { FC } from "react";

const Input: FC<Props> = ({ type, className, ...otherProps }) => {
  return <input type={type} className={className} {...otherProps} />;
};

export default Input;

interface Props {
  type: string
  className?: string
  placeholder?: string
  readOnly?: boolean
}
