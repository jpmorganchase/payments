/* eslint-disable react/require-default-props */
import React from 'react';

type FormButtonProps = {
  onClickFunction?: () => void,
  buttonText: string,
  buttonType: 'submit' | 'button',
  form?: string
};

export default function FormButton({
  onClickFunction, buttonText, buttonType, form,
}: FormButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={buttonType}
      form={form}
      onClick={onClickFunction}
      className="p-2 bg-gradient-to-r from-pink-500 to-red-500  font-medium rounded-lg text-white text-center flex items-center justify-center"
    >
      {buttonText}
    </button>
  );
}
