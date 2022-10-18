import React from 'react';
import PropTypes from 'prop-types';

const MakePaymentForm = ({ closeModal }) => {
  const submitPayment = () => {
    closeModal();
  };

  return (
    <form>
      hello
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
