import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormValuesType } from '../../../types/globalPaymentApiTypes';
import { capitalize } from '../SendPaymentsUtils';

type InputFieldProps = {
  label: keyof FormValuesType,
  type: string,
  register: UseFormRegister<FormValuesType>,
  required:boolean,
  // eslint-disable-next-line react/require-default-props
  defaultValue?:string | number
};

export default function InputField({
  type, register, label, required, defaultValue,
}: InputFieldProps) {
  return (

    <label
      htmlFor={label}
      className="block text-md font-medium text-gray-700 my-4"
    >
      {capitalize(label)}
      :
      <input
        required={required}
        {...register(label)}
        type={type}
        defaultValue={defaultValue}
        data-cy={label}
        step="any"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </label>
  );
}
