import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userInitial } from '../../../redux/store/userSlice';
import {
  validationSchemaMain,
  ValidationSchemaCall,
} from './userMainDataValidation';
/* API */
import { ChangeUserMainData } from '../../../services/api/changeUserData';
import Input from '../elements/input';
import ButtonClose from '../elements/buttonClose';
import { getCustomerInfo } from '../../../services/api/getCustomerInfo';

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

function UserMainData({ closeModal, showToast }: Props) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [user, setUser] = useState(userInitial);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<ValidationSchemaCall>({
    resolver: yupResolver(validationSchemaMain),
    mode: 'all',
  });

  const getUserInfo = async () => {
    const userInfo = await getCustomerInfo();
    setUser(userInfo);
  };

  useEffect(() => {
    getUserInfo();
  });

  // Disable button submit
  useEffect(() => {
    setIsSubmitDisabled(!(isValid && isDirty));
  }, [isValid, isDirty]);

  const onSubmit = async (data: ChangeUserMainData) => {
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
        <legend>Profile</legend>
      </div>
      <form className="form__profile form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper-line">
          <Input
            id="firstName"
            title="first Name"
            value={user.firstName}
            isRequared
            errorMessage={errors.firstName?.message}
            registerObject={register('firstName')}
          />

          <Input
            id="lastName"
            title="last Name"
            value={user.lastName}
            isRequared
            errorMessage={errors.lastName?.message}
            registerObject={register('lastName')}
          />

          <Input
            id="dateOfBirth"
            inputType="date"
            title="Date of Birth"
            value={user.dateOfBirth}
            isRequared
            errorMessage={errors.dateOfBirth?.message}
            registerObject={register('dateOfBirth')}
          />
        </div>

        <div className="input-wrapper-line">
          <Input
            id="email"
            classNameComponent="input-wrapper"
            title="Email"
            value={user.email}
            isRequared
            className="form__profile-email input-text"
            errorMessage={errors.email?.message}
            registerObject={register('email')}
          />
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

export default UserMainData;
