import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch } from '../../../redux/hooks';
import {
  setUserLogged,
  logout,
  userInitial,
} from '../../../redux/store/userSlice';
/* API */
import store from '../../../redux/store/store';
import TextField from '../elements/textField';
import ChangePassword from '../floatForms/changePassword';
import UserMainData from '../floatForms/userMainData';
import { EditAddress } from '../floatForms/editAddress';
import { getCustomerInfo } from '../../../services/api/getCustomerInfo';
import { AddressesList } from './addressesList';

function UserProfile(): React.ReactElement {
  const [userData, setUserData] = useState(userInitial);
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
  const [modalAddressIsOpen, setModalAddressIsOpen] = useState(false);
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

  const openAddressEdit = () => {
    setModalAddressIsOpen(true);
  };
  const closeAddressEdit = () => {
    setModalAddressIsOpen(false);
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
      top: '5%',
      width: '80vw',
      margin: '0 auto',
      height: 'max-content',
    },
  };

  const modalPasswordContent = (
    <ChangePassword closeModal={closeModalPassword} showToast={showToast} />
  );

  const modalMainContent = (
    <UserMainData closeModal={closeModalMain} showToast={showToast} />
  );

  const modalAddressContent = (
    <EditAddress closeModal={closeAddressEdit} showToast={showToast} />
  );

  useEffect(() => {
    const appTokenStore = store.getState().userSlice.authToken.access_token;
    if (appTokenStore.length === 0) {
      // the next line leads to an infinite test
      // navigate(`/login`);
    }
  });

  const getUserInfo = async () => {
    const userInfo = await getCustomerInfo();

    if (!userInfo) {
      dispatch(logout());
      navigate(`/login`);
    } else {
      // There are here is a date about customer
      dispatch(setUserLogged(userInfo));
      setUserData(userInfo);
    }
  };

  useEffect(() => {
    getUserInfo();
  });

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

      <Modal
        isOpen={modalPasswordIsOpen}
        onRequestClose={closeModalPassword}
        style={modalStyles}
        ariaHideApp={false}
      >
        {modalPasswordContent}
      </Modal>

      <Modal
        isOpen={modalAddressIsOpen}
        onRequestClose={closeAddressEdit}
        style={modalStylesMain}
        ariaHideApp={false}
      >
        {modalAddressContent}
      </Modal>

      <div className="input-wrapper-header">
        <legend>Profile</legend>

        <button
          className="btn-show btn-password-edit"
          type="button"
          onClick={openModalPassword}
        >
          Change password
        </button>
      </div>

      <div className="form__profile form">
        <div className="form__profile profile-fieldset fieldset">
          <div className="input-wrapper-line">
            <TextField
              classNameComponent="textfield-component"
              classNameTitle="textfield-title"
              classNameBody="textfield-body"
              title="first Name"
              value={userData.firstName}
            />

            <TextField
              classNameComponent="textfield-component"
              classNameTitle="textfield-title"
              classNameBody="textfield-body"
              title="last Name"
              value={userData.lastName}
            />

            <TextField
              classNameComponent="textfield-component"
              classNameTitle="textfield-title"
              classNameBody="textfield-body"
              title="Date of Birth"
              value={userData.dateOfBirth}
            />

            <TextField
              classNameComponent="textfield-component"
              classNameTitle="textfield-title"
              classNameBody="textfield-body"
              title="Email"
              value={userData.email}
            />
          </div>
          <button className="btn-show" type="button" onClick={openModalMain}>
            Edit
          </button>
        </div>
      </div>
      <AddressesList onEditClick={openAddressEdit} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default UserProfile;
