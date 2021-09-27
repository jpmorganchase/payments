/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import React from 'react';

const TransactionJsonDialog = () => {
  const [open, setOpen] = useState(true);

  return (
    <Dialog
      open={open}
      as='div'
      className='fixed inset-0 overflow-hidden'
      onClose={setOpen}
    >
      <div className='absolute inset-0 overflow-hidden'>
        <Dialog.Overlay className='absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        <div className='fixed inset-y-0 right-0 pl-10 max-w-full flex'>
          <div className='relative w-screen max-w-md'>
            <div className='h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll'>
              <div className='px-4 sm:px-6 flex-row flex justify-between'>
                <Dialog.Title className='text-lg font-medium text-gray-900'>
                  Panel title
                </Dialog.Title>
                <button onClick={() => setOpen(false)}>Close</button>
              </div>
              <div className='mt-6 relative flex-1 px-4 sm:px-6'>
                {/* Replace with your content */}
                <div className='absolute inset-0 px-4 sm:px-6'>
                  <div
                    className='h-full border-2 border-dashed border-gray-200'
                    aria-hidden='true'
                  />
                </div>
                {/* /End replace */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default TransactionJsonDialog;
