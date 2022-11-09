import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import MakePaymentForm from './MakePaymentForm';
import { AppContext } from '../../AppContext';
import { config } from '../../config';
import { BalanceDataType } from '../../types/accountTypes';
import { FormStatus } from '../../types/globalPaymentApiTypes';

function PaymentDialog({ accountDetails } : { accountDetails: BalanceDataType }) {
  const { setPaymentFormOpen, isPaymentFormOpen, displayingApiData } = React.useContext(AppContext);
  const { paymentConfig } = config;
  const [formStatus, setFormStatus] = React.useState<FormStatus>(FormStatus.NEW);

  const displayDialogTitle = () => {
    switch (formStatus) {
      case FormStatus.SUCCESS:
        return 'Your payment was successful!';
      case FormStatus.LOADING:
        return 'Processing your payment';
      case FormStatus.ERROR:
        return 'Error processing your request';
      default:
        return 'Make a Payment';
    }
  };
  return (
    <Transition appear show={isPaymentFormOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {displayingApiData ? (
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-black text-white">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 flex justify-between"
                  >
                    {paymentConfig.apiDetails[0].name}
                    {' '}
                    API
                    <button onClick={() => setPaymentFormOpen(false)} data-cy="closeButton" type="button">
                      <span className="material-icons text-md mr-1">
                        close
                      </span>
                    </button>
                  </Dialog.Title>
                  <h3 className="text-xs mb-4">
                    {paymentConfig.apiDetails[0].path}
                  </h3>
                  <h3 className="text-xs">
                    {paymentConfig.apiDetails[0].description}
                  </h3>
                </Dialog.Panel>
              ) : (
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-white">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
                  >
                    {displayDialogTitle()}
                    <button
                      onClick={() => {
                        setPaymentFormOpen(false);
                        setFormStatus(FormStatus.NEW);
                      }}
                      data-cy="closeButton"
                      type="button"
                    >
                      <span className="material-icons text-md mr-1">
                        close
                      </span>
                    </button>
                  </Dialog.Title>

                  <MakePaymentForm accountDetails={accountDetails} formStatus={formStatus} setFormStatus={setFormStatus} />
                </Dialog.Panel>
              )}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default PaymentDialog;
