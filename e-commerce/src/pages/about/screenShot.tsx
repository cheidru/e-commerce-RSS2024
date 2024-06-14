import Modal from 'react-modal';
import { useState } from 'react';

type Props = {
  screen: string;
};

export default function ScreenShot({ screen }: Props) {
  const [modalScreenIsOpen, setModalScreenIsOpen] = useState(false);

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
        className="modal-screen-shot"
        ariaHideApp={false}
        bodyOpenClassName="modal-body"
      >
        <div className="screen-modal-wrapper">
          <img src={screen} className="screen-shot-img" alt="screen-shot" />
        </div>
      </Modal>

      <button
        type="button"
        className="screen-shot-btn"
        onClick={openModalScreen}
      >
        <img className="screen-shot" src={screen} alt="screen-shot" />
      </button>
    </>
  );
}
