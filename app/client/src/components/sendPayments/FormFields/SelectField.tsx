import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { AccountType } from '../../../types/accountTypes';
import { FormValuesType } from '../../../types/globalPaymentApiTypes';
import { capitalize } from '../SendPaymentsUtils';

type SelectFieldProps = {
  id: keyof FormValuesType,
  register: UseFormRegister<FormValuesType>,
  options: AccountType[] | string[],
  label:string,
};

export default function SelectField({
  id, options, register, label,
}: SelectFieldProps) {
  let defaultValue;
  if (id === 'creditorAccount') {
    defaultValue = JSON.stringify(options[1]);
  }
  const renderOption = (option: string | AccountType) => {
    if (typeof option !== 'string') {
      return (
        <option
          key={`option-${option.accountId}`}
          value={JSON.stringify(option)}
        >
          {option.accountName}
          {option.accountName ? ' - ' : ' '}
          {option.accountId}
        </option>
      );
    }
    return (
      <option
        key={`option-${option}`}
        value={option}
      >
        {option}
      </option>
    );
  };
  return (
    <div className="col-span-6 sm:col-span-3 my-4">
      <label htmlFor={label} className="block text-md font-medium text-gray-700 ">
        {capitalize(label)}
        :
      </label>
      <select
        {...register(id)}
        defaultValue={defaultValue}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        {options.map((option) => renderOption(option))}
      </select>
    </div>
  );
}
