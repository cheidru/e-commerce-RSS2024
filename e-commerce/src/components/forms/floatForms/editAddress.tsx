import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ValidationSchemaAddress,
  ValidationAddressType,
} from './editAddressValidation';
import { Address } from '../../../redux/store/userSlice';
/* API */
import Input from '../elements/input';
import Country from '../elements/country';
import ButtonClose from '../elements/buttonClose';
// import { UserAddresses } from '../../../services/api/changeAddresses';

type Props = {
  closeModal: () => void;
  showToast: ({
    message,
    thisError,
  }: {
    message: string;
    thisError: boolean;
  }) => void;
};

export function EditAddress({ closeModal, showToast }: Props) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<ValidationAddressType>({
    resolver: yupResolver(ValidationSchemaAddress),
    mode: 'all',
  });

  // Disable button submit
  useEffect(() => {
    setIsSubmitDisabled(!(isValid && isDirty));
  }, [isValid, isDirty]);

  const onSubmit = async (data: { address: Address }) => {
    showToast({
      message: `${data}`,
      thisError: false,
    });
    closeModal();
    // return data;
  };

  return (
    <>
      <ButtonClose id="buttonCloseMain" onClick={closeModal} />
      <div className="input-wrapper-header">
        <legend>Address</legend>
      </div>
      <form className="form__profile form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper-line">
          <div className="registration-adress">
            <Input
              id="streetName"
              classNameComponent="input-wrapper-address"
              title="Street"
              isRequared
              className="form__profile-adress input-text"
              errorMessage={errors.address?.streetName?.message}
              registerObject={register('address.streetName')}
            />

            <Input
              id="city"
              classNameComponent="input-wrapper-address"
              title="City"
              isRequared
              className="form__profile-adress input-text"
              errorMessage={errors.address?.city?.message}
              registerObject={register('address.city')}
            />

            <Country
              id="country"
              classNameComponent="input-wrapper-address"
              isRequared
              className="form__profile-adress input-text"
              errorMessage={errors.address?.country?.message}
              registerObject={register('address.country')}
              onChangeHandler={() =>
                setValue('address.postalCode', '', {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />

            <Input
              id="postalCode"
              classNameComponent="input-wrapper-address"
              title="POST Code"
              isRequared
              className="form__profile-adress input-text"
              errorMessage={errors.address?.postalCode?.message}
              registerObject={register('address.postalCode')}
            />
          </div>
        </div>

        <div className="input-wrapper-btn">
          <div className="input-error" id="errorsAnswer" />
          <button
            type="submit"
            className="btn-submit"
            disabled={isSubmitDisabled}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default EditAddress;
