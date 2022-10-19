import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import MakePaymentForm from './MakePaymentForm';
import PropTypes from 'prop-types';
const { config } = require('../config');

const PaymentDialog = ({ isPaymentFormOpen, setPaymentFormOpen, ...props }) => {
  function closeModal() {
    setPaymentFormOpen(false);
  }
  const { paymentConfig } = config;
  console.log(paymentConfig);
  return (
    <>
      <Transition appear show={isPaymentFormOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900 flex justify-between'
                  >
                    Make a payment
                    <button onClick={closeModal} data-cy='closeButton'>
                      <span className='material-icons text-md mr-1'>close</span>
                    </button>
                  </Dialog.Title>
                  <MakePaymentForm closeModal={closeModal} {...props} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
PaymentDialog.propTypes = {
  isPaymentFormOpen: PropTypes.bool.isRequired,
  setPaymentFormOpen: PropTypes.func.isRequired,
};
export default PaymentDialog;
