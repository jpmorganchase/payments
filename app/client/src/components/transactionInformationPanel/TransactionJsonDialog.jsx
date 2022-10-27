/* This example requires Tailwind CSS v2.0+ */
import { Dialog } from '@headlessui/react';
import React from 'react';
import PropTypes from 'prop-types';

function TransactionJsonDialog({ transaction, setTransactionDialog, open }) {
  return (
    <Dialog
      open={open}
      onClose={() => setTransactionDialog(false, {})}
      className="fixed overflow-hidden"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed  p-4 max-w-2xl inset-y-0 right-0 bg-white overflow-y-auto">
        <Dialog.Panel>
          <div className="px-4 sm:px-6 flex-row flex justify-between">
            <Dialog.Title className="text-xl font-medium text-gray-900 mt-4">
              Raw Transaction JSON
            </Dialog.Title>
            <button
              onClick={() => setTransactionDialog(false, {})}
              data-cy="closeButton"
            >
              Close
            </button>
          </div>
          <pre
            id="json"
            className="h-full border-2 border-dashed border-gray-200 w-fit m-2 p-2"
          >
            {JSON.stringify(transaction, undefined, 2)}
          </pre>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

TransactionJsonDialog.propTypes = {
  transaction: PropTypes.object,
  setTransactionDialog: PropTypes.func,
  open: PropTypes.bool,
};

export default TransactionJsonDialog;
