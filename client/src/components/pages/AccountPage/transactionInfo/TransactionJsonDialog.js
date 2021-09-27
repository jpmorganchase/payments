/* This example requires Tailwind CSS v2.0+ */
import { Dialog } from '@headlessui/react';
import React from 'react';
import PropTypes from 'prop-types';

const TransactionJsonDialog = ({ transaction, setTransactionDialog, open }) => {
  return (
    <Dialog
      open={open}
      as='div'
      className='fixed inset-0 overflow-hidden'
      onClose={() => setTransactionDialog(false, {})}
    >
      <div className='absolute inset-0 overflow-hidden'>
        <Dialog.Overlay className='absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        <div className='fixed inset-y-0 right-0 pl-10 max-w-full flex'>
          <div className='relative w-screen max-w-md'>
            <div className='h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll'>
              <div className='px-4 sm:px-6 flex-row flex justify-between'>
                <Dialog.Title className='text-lg font-medium text-gray-900'>
                  Raw Transaction JSON
                </Dialog.Title>
                <button onClick={() => setTransactionDialog(false, {})}>
                  Close
                </button>
              </div>
              <div className='mt-6 relative flex-1 px-4 sm:px-6'>
                <div className='absolute inset-0 px-4 sm:px-6'>
                  <div
                    className='h-full border-2 border-dashed border-gray-200'
                    aria-hidden='true'
                  >
                    <pre id='json'>
                      {JSON.stringify(transaction, undefined, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

TransactionJsonDialog.propTypes = {
  transaction: PropTypes.object,
  setTransactionDialog: PropTypes.func,
  open: PropTypes.bool,
};

export default TransactionJsonDialog;
