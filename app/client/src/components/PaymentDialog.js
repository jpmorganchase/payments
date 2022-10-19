import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import MakePaymentForm from './MakePaymentForm';
import PropTypes from 'prop-types';
import { AppContext } from '../AppContext';
const { config } = require('../config');

const PaymentDialog = ({ isPaymentFormOpen, setPaymentFormOpen, ...props }) => {
  function closeModal() {
    setPaymentFormOpen(false);
  }
  const { paymentConfig } = config;
  const { displayingApiData } = React.useContext(AppContext);

  return (
    <>
      <Transition appear show={isPaymentFormOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => {}}>
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
                {displayingApiData ? (
                  <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-black text-white'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 flex justify-between'
                    >
                      {paymentConfig.apiDetails[0].name} API
                      <button onClick={closeModal} data-cy='closeButton'>
                        <span className='material-icons text-md mr-1'>
                          close
                        </span>
                      </button>
                    </Dialog.Title>
                    <h3 className='text-xs mb-4'>
                      {paymentConfig.apiDetails[0].path}
                    </h3>
                    <h3 className='text-xs'>
                      {paymentConfig.apiDetails[0].description}
                    </h3>
                  </Dialog.Panel>
                ) : (
                  <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-white'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900 flex justify-between'
                    >
                      Make a payment
                      <button onClick={closeModal} data-cy='closeButton'>
                        <span className='material-icons text-md mr-1'>
                          close
                        </span>
                      </button>
                    </Dialog.Title>
                    <MakePaymentForm closeModal={closeModal} {...props} />
                  </Dialog.Panel>
                )}
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
