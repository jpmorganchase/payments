/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const renderSelectField = (label, id, options, register, addOption = false) => (
  <div className='col-span-6 sm:col-span-3'>
    <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
      {label}:
    </label>
    <select
      {...register(id)}
      name={id}
      onChange={selectOnChange}
      className='mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
    >
      {options.map((option) => (
        <option
          key={`option-${option.accountId}`}
          value={JSON.stringify(option)}
        >
          {option.accountName}
          {option.accountName ? ' - ' : ' '}
          {option.accountId}
        </option>
      ))}
      {addOption && <option key='option-add'>Add new account details</option>}
    </select>
  </div>
);

const selectOnChange = (event) => {
  console.log(event.target.value);
  if (event.target.value === 'Add new account details') {
    console.log(event.target.value);
  }
};
const MakePaymentForm = ({ closeModal, data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log(errors);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderSelectField(
          'From',
          'debtorAccountId',
          data?.accountList,
          register,
        )}
        {renderSelectField(
          'To',
          'creditorAccountId',
          data?.accountList,
          register,
          true,
        )}
        <div className=''>
          <label
            htmlFor='amount'
            className='block text-sm font-medium text-gray-700'
          >
            Amount:
          </label>
          <input
            {...register('amount', { min: 0.0 })}
            type='number'
            name='amount'
            step='0.01'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          />
        </div>
        <div className=''>
          <label
            htmlFor='date'
            className='block text-sm font-medium text-gray-700'
          >
            Date:
          </label>
          <input
            {...register('date', { valueAsDate: true })}
            type='date'
            name='date'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          />
        </div>

        <button className='p-1 bg-gradient-to-r from-pink-500 to-red-500  font-medium rounded-lg text-white text-center flex items-center justify-center'>
          Submit
        </button>
      </form>
    </>
  );
};

MakePaymentForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  data: PropTypes.object,
};
export default MakePaymentForm;