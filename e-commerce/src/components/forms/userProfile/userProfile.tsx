import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch } from '../../../redux/hooks';
import {
  setUserLogged,
  User,
  setAuthToken,
  AuthToken,
  logout,
} from '../../../redux/store/userSlice';
import {
  validationSchemaRegister,
  FormDataRegister,
} from '../validationRulesInput';
/* API */
import {
  registerNewCustomer,
  formattedDataRegister,
  loginCustomer,
} from '../../../services/api/getCustomerToken';
import store from '../../../redux/store/store';
import Input from '../elements/input';
import TextField from '../elements/textField';
import Country from '../elements/country';
import ButtonEdit from '../elements/buttonEdit';
import CheckBox from '../elements/checkBox';
import ChangePassword from '../floatForms/changePassword';
import UserMainData from '../floatForms/userMainData';
import { getCustomerInfo } from '../../../services/api/getCustomerInfo';
// import { boolean } from 'yup';

function UserProfile(): React.ReactElement {
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const showToast = ({
    message,
    thisError,
  }: {
    message: string;
    thisError: boolean;
  }) => {
    if (!thisError) {
      toast.success(message, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: 'white',
          backgroundColor: 'green',
        },
        iconTheme: {
          primary: 'white',
          secondary: 'green',
        },
      });
    } else {
      toast.error(message, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: 'red',
          backgroundColor: 'pink',
        },
        iconTheme: {
          primary: 'white',
          secondary: 'red',
        },
      });
    }
  };

  const [modalPasswordIsOpen, setModalPasswordIsOpen] = useState(false);
  const [modalMainIsOpen, setModalMainIsOpen] = useState(false);
  // Modal.setAppElement('#root');

  const openModalPassword = () => {
    setModalPasswordIsOpen(true);
  };

  const closeModalPassword = () => {
    setModalPasswordIsOpen(false);
  };

  const openModalMain = () => {
    setModalMainIsOpen(true);
  };

  const closeModalMain = () => {
    setModalMainIsOpen(false);
  };

  const modalStyles = {
    content: {
      top: '20%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -20%)',
    },
  };

  const modalStylesMain = {
    content: {
      top: '20%',
      left: '40%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '20%',
      transform: 'translate(-30%, -20%)',
      width: '80%',
    },
  };

  const modalPasswordContent = (
    <ChangePassword closeModal={closeModalPassword} showToast={showToast} />
  );

  const modalMainContent = (
    <UserMainData closeModal={closeModalMain} showToast={showToast} />
  );

  useEffect(() => {
    const appTokenStore = store.getState().userSlice.authToken.access_token;
    if (appTokenStore.length === 0) {
      // the next line leads to an infinite test
      // navigate(`/login`);
    }
  });

  const setUserLogIn = (userNew: User) => {
    dispatch(setUserLogged(userNew));
  };

  const setAuthUserToken = (tokenNew: AuthToken) => {
    dispatch(setAuthToken(tokenNew));
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
    // trigger,
  } = useForm<FormDataRegister>({
    resolver: yupResolver(validationSchemaRegister),
    mode: 'all',
  });

  // function checkBoxSet(checkboxID: string, address: string, defaultID: string) {
  //   const chkbox = document.getElementById(checkboxID);
  //   if (address === defaultID) {
  //     chkbox?.setAttribute('checked', '');
  //   } else {
  //     chkbox?.setAttribute('unchecked', '');
  //   }
  //   return true;
  // }

  const getUserInfo = async () => {
    const userInfo = await getCustomerInfo();

    if (!userInfo) {
      dispatch(logout());
      navigate(`/login`);
    } else {
      // There are here is a date about customer
      dispatch(setUserLogged(userInfo));
    }
  };

  useEffect(() => {
    getUserInfo();
  });

  // Disable button submit
  useEffect(() => {
    setIsSubmitDisabled(!(isValid && isDirty));
  }, [isValid, isDirty]);

  // Watch the checkbox for addressForInvoice
  const watchShowAddressInvoice = watch('addressForInvoice', false);

  // Watch the shipping address fields
  // const watchShippingAddressStreet = watch('address.streetName', '');
  // const watchShippingAddressCity = watch('address.city', '');
  // const watchShippingAddressCountry = watch('address.country', '');
  // const watchShippingAddressPostalCode = watch('address.postalCode', '');
  // const watchAddressDefault = watch('address.default', false);

  // Sync invoice address with shipping address when checkbox is checked
  // useEffect(() => {
  //   if (watchShowAddressInvoice) {
  //     setValue('addressInvoice.streetName', watchShippingAddressStreet);
  //     setValue('addressInvoice.city', watchShippingAddressCity);
  //     setValue('addressInvoice.country', watchShippingAddressCountry);
  //     setValue('addressInvoice.postalCode', watchShippingAddressPostalCode);
  //     setValue('addressInvoice.default', watchAddressDefault);
  //     trigger('address');
  //   }
  // }, [
  //   watchShowAddressInvoice,
  //   watchShippingAddressStreet,
  //   watchShippingAddressCity,
  //   watchShippingAddressCountry,
  //   watchShippingAddressPostalCode,
  //   watchAddressDefault,
  //   setValue,
  //   trigger,
  // ]);

  const onSubmit = async (data: FormDataRegister) => {
    const dataUser = formattedDataRegister(data);

    const userNew = await registerNewCustomer(dataUser);
    if (userNew.statusCode) {
      const { message } = userNew;
      const errorsBlock = document.getElementById('errorsAnswer');
      if (message && errorsBlock) {
        errorsBlock.innerText = message;
        setTimeout(() => {
          errorsBlock.innerText = '';
        }, 5000);
      }
    } else {
      setUserLogIn(userNew);

      const tokenNew = await loginCustomer(dataUser);

      if (tokenNew.statusCode) {
        const { message } = tokenNew;
        const errorsBlock = document.getElementById('errorsAnswer');
        if (message && errorsBlock) {
          errorsBlock.innerText = message;
          setTimeout(() => {
            errorsBlock.innerText = '';
          }, 5000);
        }
      } else {
        tokenNew.email = dataUser.email;
        setAuthUserToken(tokenNew);
        navigate(`/`);
      }
      return data;
    }
    return data;
  };

  return (
    <>
      <Modal
        isOpen={modalMainIsOpen}
        onRequestClose={closeModalMain}
        style={modalStylesMain}
        ariaHideApp={false}
      >
        {modalMainContent}
      </Modal>

      <ButtonEdit id="buttonEditMain" onClick={openModalMain} />
      <Modal
        isOpen={modalPasswordIsOpen}
        onRequestClose={closeModalPassword}
        style={modalStyles}
        ariaHideApp={false}
      >
        {modalPasswordContent}
      </Modal>
      <div className="input-wrapper-header">
        <legend>Profile</legend>

        <button
          className="btn-show"
          type="button"
          onClick={() => {
            setIsEditDisabled(!isEditDisabled);
          }}
        >
          {isEditDisabled ? 'Edit' : 'Cancel'}
        </button>

        <button className="btn-show" type="button" onClick={openModalPassword}>
          {isEditDisabled ? 'Edit' : 'Cancel'}
        </button>
      </div>

      <div className="form__profile profile-fieldset">
        <div className="input-wrapper-line">
          <TextField
            classNameComponent="textfield-component"
            classNameTitle="textfield-title"
            classNameBody="textfield-body"
            title="first Name"
            value="first Name"
          />

          <TextField
            classNameComponent="textfield-component"
            classNameTitle="textfield-title"
            classNameBody="textfield-body"
            title="last Name"
            value="last Name"
          />

          <TextField
            classNameComponent="textfield-component"
            classNameTitle="textfield-title"
            classNameBody="textfield-body"
            title="Date of Birth"
            value="Date of Birth"
          />

          <TextField
            classNameComponent="textfield-component"
            classNameTitle="textfield-title"
            classNameBody="textfield-body"
            title="Email"
            value="Email"
          />

          {/* <ButtonEdit
                id="buttonEditPassword"
                onClick={openModalPassword}
              /> */}
        </div>
      </div>

      <form className="form__profile form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          Address for shipping*
          <CheckBox
            id="address.default"
            title="Use as default"
            registerObject={register('address.default')}
          />
          <div className="input-wrapper-line">
            <div className="registration-adress">
              <Input
                id="address.streetName"
                classNameComponent="input-wrapper-address"
                title="Street"
                isRequared
                className="form__profile-adress input-text"
                errorMessage={errors.address?.streetName?.message}
                registerObject={register('address.streetName')}
              />

              <Input
                id="address.city"
                classNameComponent="input-wrapper-address"
                title="City"
                isRequared
                className="form__profile-adress input-text"
                errorMessage={errors.address?.city?.message}
                registerObject={register('address.city')}
              />

              <Country
                id="address.country"
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
                id="address.postalCode"
                classNameComponent="input-wrapper-address"
                title="POST Code"
                isRequared
                className="form__profile-adress input-text"
                errorMessage={errors.address?.postalCode?.message}
                registerObject={register('address.postalCode')}
              />
            </div>
          </div>
          <button className="add-address btn-show" type="button">
            +
          </button>
        </fieldset>

        <CheckBox
          id="addressForInvoice"
          title="Is your shipping address the same as your billing address?"
          registerObject={register('addressForInvoice')}
        />

        <fieldset className="fieldset" disabled={watchShowAddressInvoice}>
          Address for invoices
          <CheckBox
            id="addressInvoice.default"
            title="Use as default"
            registerObject={register('addressInvoice.default')}
          />
          <div className="input-wrapper-line">
            <div className="registration-adress">
              <Input
                id="addressInvoice.streetName"
                classNameComponent="input-wrapper-address"
                title="Street"
                isRequared
                className="form__profile-adress input-text"
                errorMessage={
                  !watchShowAddressInvoice
                    ? errors.addressInvoice?.streetName?.message
                    : ''
                }
                style={watchShowAddressInvoice ? { color: '#CCC' } : {}}
                registerObject={register('addressInvoice.streetName')}
              />

              <Input
                id="addressInvoice.city"
                classNameComponent="input-wrapper-address"
                title="City"
                isRequared
                className="form__profile-adress input-text"
                errorMessage={
                  !watchShowAddressInvoice
                    ? errors.addressInvoice?.city?.message
                    : ''
                }
                style={watchShowAddressInvoice ? { color: '#CCC' } : {}}
                registerObject={register('addressInvoice.city')}
              />

              <Country
                id="addressInvoice.country"
                classNameComponent="input-wrapper-address"
                isRequared
                className="form__profile-adress input-text"
                errorMessage={
                  !watchShowAddressInvoice
                    ? errors.addressInvoice?.country?.message
                    : ''
                }
                style={watchShowAddressInvoice ? { color: '#CCC' } : {}}
                registerObject={register('addressInvoice.country')}
                onChangeHandler={() =>
                  setValue('addressInvoice.postalCode', '', {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              />

              <Input
                id="addressInvoice.postalCode"
                classNameComponent="input-wrapper-address"
                title="POST Code"
                isRequared
                className="form__profile-adress input-text"
                errorMessage={
                  !watchShowAddressInvoice
                    ? errors.addressInvoice?.postalCode?.message
                    : ''
                }
                style={watchShowAddressInvoice ? { color: '#CCC' } : {}}
                registerObject={register('addressInvoice.postalCode')}
              />
            </div>
          </div>
          <button className="add-address btn-show" type="button">
            +
          </button>
        </fieldset>

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
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default UserProfile;
