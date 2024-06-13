import Modal from 'react-modal';
import { useState } from 'react';

type Props = {
  screen: string;
};

export default function ScreenShot({ screen }: Props) {
  const [modalScreenIsOpen, setModalScreenIsOpen] = useState(false);

  const modalScreenStyles = {
    content: {
      top: '0',
      left: '0',
      width: 'max-content',
      margin: '0 auto',
      height: '90vh',
      backgroundColor: 'gray',
      transform: 'translateY(5%)',
      borderRadius: '10px',
    },
  };

  const openModalScreen = () => {
    setModalScreenIsOpen(true);
  };

  const closeModalScreen = () => {
    setModalScreenIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={modalScreenIsOpen}
        onRequestClose={closeModalScreen}
        style={modalScreenStyles}
        ariaHideApp={false}
        bodyOpenClassName="modal-body"
      >
        <div className="modal-wrapper">
          <img src={screen} alt="screen-shot" />
        </div>
      </Modal>

      <button type="button" className="avatar-card" onClick={openModalScreen}>
        <img className="screen-shot" src={screen} alt="screen-shot" />
      </button>
    </>
  );
}
