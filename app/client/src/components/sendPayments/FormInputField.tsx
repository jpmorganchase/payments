import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormValuesType } from '../../types/globalPaymentApiTypes';
import { capitalize } from './SendPaymentsUtils';

type FormInputFieldProps = {
  label: keyof FormValuesType,
  type: string,
  register: UseFormRegister<FormValuesType>
};

export default function FormInputField({
  type, register, label,
}: FormInputFieldProps) {
  return (

    <label
      htmlFor={label}
      className="block text-sm font-medium text-gray-700"
    >
      {capitalize(label)}
      :
      <input
        {...register(label)}
        type={type}
        data-cy={label}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </label>
  );
}
