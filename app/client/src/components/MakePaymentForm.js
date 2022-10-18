import React from 'react';
import PropTypes from 'prop-types';

const renderInputField = (label, id, type = 'text') => (
  <div className=''>
    <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
      {label}:
    </label>
    <input
      type={type}
      name={id}
      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
    />
  </div>
);
const MakePaymentForm = ({ closeModal }) => {
  const submitPayment = () => {
    closeModal();
  };

  return (
    <form>
      {renderInputField('From', 'debtorAccountId')}
      {renderInputField('To', 'creditorAccountId')}
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
  );
};

MakePaymentForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
export default MakePaymentForm;
