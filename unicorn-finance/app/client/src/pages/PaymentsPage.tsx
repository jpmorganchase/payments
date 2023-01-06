import React from 'react';
import SendPaymentForm from '../components/sendPayments/SendPaymentPanel';
import PreviousPaymentsGrid from '../components/sendPayments/PreviousPaymentsGrid';

function PaymentsPage() {
  return (
    <div className="lg:min-h-screen flex gap-4 w-full flex-row flex-wrap lg:flex-nowrap">
      <div className="lg:w-3/5 w-full bg-gray-50 p-8 border-r border-gray-200">
        <h2 className="text-2xl font-medium mb-4 ">Send a Payment</h2>
        <SendPaymentForm />
      </div>
      <div className="flex-grow gap-4 w-full p-8">
        <PreviousPaymentsGrid />
      </div>
    </div>
  );
}

export default PaymentsPage;
