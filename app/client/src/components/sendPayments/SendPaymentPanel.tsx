/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { AppContext } from '../../context/AppContext';
import { PaymentsResponse, GlobalPaymentRequest } from '../../types/globalPaymentApiTypes';
import { config } from '../../config';
import Spinner from '../spinner';
import APIDetails from '../APIDetails';
import FormButton from './FormButton';
import { sendPost } from '../../hooks/usePost';
import SendPaymentForm from './SendPaymentForm';

function MakePaymentForm() {
  const {
    displayingMockedData, displayingApiData,
  } = React.useContext(AppContext);
  const { paymentConfig } = config;
  const [apiResponse, setApiResponse] = React.useState<PaymentsResponse>();
  const [apiError, setApiError] = React.useState<Error>();

  const createPaymentMutation = useMutation({
    mutationFn: (data: GlobalPaymentRequest) => sendPost(paymentConfig.apiDetails[0].backendPath, JSON.stringify(data)),
  });

  const formReset = () => {
    createPaymentMutation.reset();
    setApiResponse(undefined);
    setApiError(undefined);
  };

  return (
    <div className=" w-full flex flex-col justify-between h-full pb-20">
      {displayingApiData && (
      <APIDetails details={paymentConfig.apiDetails[0]} absolute={false} />
      )}
      {!displayingApiData && (apiError || apiResponse?.errors) && (
        <>
          {apiError && (
          <p>
            Error processing your request:
            {apiError.message}
          </p>
          )}
          {apiResponse?.errors && (
          <pre
            id="json"
            className="h-full border-2 border-dashed border-gray-200 w-full m-2 p-2 overflow-x-auto"
          >
            {JSON.stringify(apiResponse?.errors, undefined, 2)}
          </pre>
          )}
          <FormButton
            buttonText="Return"
            buttonType="button"
            onClickFunction={formReset}
          />
        </>
      )}
      {!displayingApiData && (createPaymentMutation.isLoading) && <div className="text-center pt-24"><Spinner text="Loading API Response..." /></div>}
      {((!displayingApiData && createPaymentMutation.isSuccess) || (displayingMockedData && apiResponse)) && (
        <>
          <p>Success! API response details: </p>
          <pre
            id="json"
            className="h-full border-2 border-dashed border-gray-200 w-full m-2 p-2 overflow-x-auto"
          >
            {JSON.stringify(apiResponse?.paymentInitiationResponse, undefined, 2)}
          </pre>
          <FormButton
            buttonText="Ok"
            buttonType="button"
            onClickFunction={formReset}
          />
        </>
      )}
      {(!displayingApiData && ((createPaymentMutation.isIdle && !displayingMockedData) || (displayingMockedData && !apiResponse))) && (
        <SendPaymentForm setApiResponse={setApiResponse} setApiError={setApiError} createPaymentMutation={createPaymentMutation} />
      )}

    </div>
  );
}
export default MakePaymentForm;
