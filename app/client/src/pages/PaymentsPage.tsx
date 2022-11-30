import React from 'react';
import SendPaymentForm from '../components/sendPayments/SendPaymentForm';
import PreviousPaymentsGrid from '../components/sendPayments/PreviousPaymentsGrid';

function PaymentsPage() {
  return (
    <div className="lg:min-h-screen flex p-8 gap-4 w-full flex-row flex-wrap lg:flex-nowrap">
      <div className="lg:w-3/5 w-full">
        <h2 className="text-2xl font-medium mb-4">Send a Payment</h2>
        <SendPaymentForm />
      </div>
      <div className="flex-grow gap-4 w-full">
        <PreviousPaymentsGrid />
      </div>
    </div>
  );
}

export default PaymentsPage;
