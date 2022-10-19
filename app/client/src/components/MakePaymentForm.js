import React from 'react';
import PropTypes from 'prop-types';

const renderInputField = (label, id, type = 'text') => (
  <div className=''>
    <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
      {label}:
    </label>
    <input
      required
      type={type}
      name={id}
      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
    />
  </div>
);

const renderSelectField = (label, id, options, addOption = false) => (
  <div className='col-span-6 sm:col-span-3'>
    <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
      {label}:
    </label>
    <select
      id={id}
      name={id}
      className='mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
    >
      {options.map((option) => (
        <option key={`option-${option.accountId}`}>
          {option.accountName}
          {option.accountName ? ' - ' : ' '}
          {option.accountId}
        </option>
      ))}
      {addOption && <option key='option-add'>Add new account details</option>}
    </select>
  </div>
);
const MakePaymentForm = ({ closeModal, data }) => {
  const submitPayment = () => {
    closeModal();
  };

  console.log(data.accountList);
  return (
    <>
      <form>
        {renderSelectField('From', 'debtorAccountId', data?.accountList)}
        {renderSelectField('To', 'debtorAccountId', data?.accountList, true)}
        {renderInputField('Bank ID', 'creditorAgent')}
        {renderInputField('Amount', 'amount', 'number')}
        {renderInputField('Date', 'date', 'date')}
        <button
          className='p-1 bg-gradient-to-r from-pink-500 to-red-500  font-medium rounded-lg text-white text-center flex items-center justify-center'
          onClick={submitPayment}
        >
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
