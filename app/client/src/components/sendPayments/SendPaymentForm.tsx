/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AccountType } from '../../types/accountTypes';
import { AppContext } from '../../context/AppContext';
import {
  FormValuesType as FormValues, PaymentsResponse, PaymentStatusResponseType, GlobalPaymentRequest,
} from '../../types/globalPaymentApiTypes';
import { config } from '../../config';
import Spinner from '../spinner';
import APIDetails from '../APIDetails';
import FormButton from './FormButton';
import generateApiBody, {
  today, updateSessionStorageTransactions, validationSchema,
} from './SendPaymentsUtils';
import { sendPost } from '../../hooks/usePost';
import { sendGet } from '../../hooks/useGet';
import FormInputField from './FormFields/InputField';
import SelectField from './FormFields/SelectField';

type MakePaymentFormProps = {
  accountDetails: AccountType[]
};

const paymentTypes = ['US-RTP'];
function MakePaymentForm({ accountDetails }: MakePaymentFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const {
    displayingMockedData, displayingApiData, setJsonDialogData, paymentIdentifiers, setPaymentIdentifiers,
  } = React.useContext(AppContext);
  const { paymentConfig } = config;
  const queryClient = useQueryClient();
  const [apiResponse, setApiResponse] = React.useState<PaymentsResponse>();
  const [apiError, setApiError] = React.useState<Error>();

  const createPaymentMutation = useMutation({
    mutationFn: (data: GlobalPaymentRequest) => sendPost(paymentConfig.apiDetails[0].backendPath, JSON.stringify(data)),
  });

  const handleMockedDataResponse = (endToEndId: string) => {
    const mockedResponse: PaymentStatusResponseType = {
      identifiers: {
        endToEndId,
      },
      paymentStatus: {
        createDateTime: today.toUTCString(),
        status: 'PENDING',
      },
    };
    const newPayment = {
      endToEndId,
      mocked: true,
    };
    updateSessionStorageTransactions(mockedResponse, paymentConfig.mockedSessionStorageKey);
    setApiResponse({
      paymentInitiationResponse: mockedResponse.identifiers,
    });
    setPaymentIdentifiers([...paymentIdentifiers, newPayment]);
  };

  const onSubmit = (formData:FormValues) => {
    const globalPaymentApiPayload = generateApiBody(formData);
    if (!displayingMockedData) {
      createPaymentMutation.mutate(globalPaymentApiPayload, {
        async onSuccess(data) {
          const responseJson: PaymentsResponse = data as PaymentsResponse;
          setApiResponse(responseJson);
          // We can have a successful response from API but errors within the response
          if (!responseJson.paymentInitiationResponse) {
            throw new Error();
          } else {
            const { firmRootId, endToEndId } = responseJson.paymentInitiationResponse;
            const newPayment = {
              firmRootId,
              endToEndId,
              mocked: false,
            };
            setPaymentIdentifiers([...paymentIdentifiers, newPayment]);
            await queryClient.prefetchQuery(
              ['globalPaymentStatus', endToEndId],
              () => sendGet(paymentConfig.apiDetails[1].backendPath.replace('<endToEndId>', endToEndId)),
            );
          }
        },
        onError(error) {
          if (error instanceof Error) {
            setApiError(error);
          }
        },
      });
    } else {
      handleMockedDataResponse(globalPaymentApiPayload.payments.paymentIdentifiers.endToEndId);
    }
  };

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
        <>
          <form onSubmit={handleSubmit(onSubmit)} id="hook-form">
            <SelectField label="payment type" options={paymentTypes} register={register} id="paymentType" />
            <SelectField label="from" options={accountDetails} register={register} id="debtorAccount" />
            <SelectField label="to" options={accountDetails} register={register} id="creditorAccount" />
            <FormInputField label="amount" type="number" register={register} required defaultValue="100" />
            <FormInputField label="date" type="date" register={register} required defaultValue={today.toISOString().split('T')[0]} />

          </form>
          <span className="flex flex-row justify-between">
            <FormButton
              buttonText="Preview JSON"
              buttonType="button"
              onClickFunction={() => setJsonDialogData({ state: true, data: JSON.stringify(generateApiBody(getValues()), undefined, 2) })}
            />
            <FormButton
              buttonText="Submit"
              buttonType="submit"
              form="hook-form"
            />

          </span>
        </>

      )}

    </div>
  );
}
export default MakePaymentForm;
