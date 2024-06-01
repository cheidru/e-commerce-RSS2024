import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePassword } from '../../../services/api/changePassword';
import {
  validationSchema,
  FormDataChangePassword,
} from './changePasswordValidation';
import ButtonClose from '../elements/buttonClose';
/* API */
import Password from '../elements/password';

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

function ChangePassword({ closeModal, showToast }: Props) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormDataChangePassword>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  });

  // Disable button submit
  useEffect(() => {
    setIsSubmitDisabled(!(isValid && isDirty));
  }, [isValid, isDirty]);

  const onSubmit = async (data: FormDataChangePassword) => {
    if (data.newPassword === data.currentPassword) {
      showToast({
        message: 'The new password has not been changed',
        thisError: true,
      });
    } else {
      const result = await changePassword(data);
      if (result.statusCode) {
        const { message } = result;
        showToast({ message, thisError: true });
      } else {
        showToast({
          message: 'Password changed successfully',
          thisError: false,
        });
      }
    }
    closeModal();
  };

  return (
    <>
      <ButtonClose id="buttonClosePassword" onClick={closeModal} />
      <form
        className="form__registration form-float"
        onSubmit={handleSubmit(onSubmit)}
      >
        <legend style={{ fontSize: '2.4rem' }}>Change password</legend>

        <div className="input-wrapper-line" style={{ flexWrap: 'wrap' }}>
          <Password
            id="currentPassword"
            title="Current password"
            isRequared
            className="form__registration-password input-text"
            errorMessage={errors.currentPassword?.message}
            registerObject={register('currentPassword')}
          />

          <Password
            id="newPassword"
            title="New password"
            isRequared
            className="form__registration-password input-text"
            errorMessage={errors.newPassword?.message}
            registerObject={register('newPassword')}
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

export default ChangePassword;
