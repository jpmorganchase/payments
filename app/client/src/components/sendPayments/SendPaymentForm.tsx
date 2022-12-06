/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { UseMutationResult, useQueryClient } from '@tanstack/react-query';
import {
  FormValuesType, GlobalPaymentRequest, PaymentsResponse, PaymentStatusResponseType,
} from '../../types/globalPaymentApiTypes';
import FormButton from './FormButton';
import InputField from './FormFields/InputField';
import SelectField from './FormFields/SelectField';
import generateApiBody, { today, updateSessionStorageTransactions } from './SendPaymentsUtils';
import { paymentTypesConfiguration } from './config';
import { AppContext } from '../../context/AppContext';
import { config } from '../../config';
import { sendGet } from '../../hooks/useGet';

type SendPaymentFormProps = {
  setApiResponse: (apiResponse: PaymentsResponse) => void
  setApiError: (apiError:Error) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createPaymentMutation:UseMutationResult<any, unknown, GlobalPaymentRequest, unknown>

};
function SendPaymentForm({ setApiResponse, setApiError, createPaymentMutation }: SendPaymentFormProps) {
  const {
    displayingMockedData, setJsonDialogData, paymentIdentifiers, setPaymentIdentifiers,
  } = React.useContext(AppContext);
  const {
    register,
    handleSubmit,
    watch,
    setValue, getValues,
  } = useForm<FormValuesType>();
  const queryClient = useQueryClient();

  const { paymentConfig } = config;
  const paymentType = watch('paymentType', 'US RTP');

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
  useEffect(() => {
    setValue('debtorAccount', JSON.stringify(paymentTypesConfiguration[paymentType].accounts[0]));
    setValue('creditorAccount', JSON.stringify(paymentTypesConfiguration[paymentType].accounts[1]));
  }, [paymentType, setValue]);

  const onSubmit = (formData:FormValuesType) => {
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="hook-form">
        <SelectField label="payment type" options={Object.keys(paymentTypesConfiguration)} register={register} id="paymentType" />
        <SelectField label="from" options={paymentTypesConfiguration[paymentType].accounts} register={register} id="debtorAccount" />
        <SelectField label="to" options={paymentTypesConfiguration[paymentType].accounts} register={register} id="creditorAccount" />
        <InputField label="amount" type="number" register={register} required defaultValue={25.99} />
        <InputField label="date" type="date" register={register} required defaultValue={today.toISOString().split('T')[0]} />

      </form>
      <span className="flex flex-row justify-between mt-5">
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
  );
}
export default SendPaymentForm;
