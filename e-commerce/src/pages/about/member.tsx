import Modal from 'react-modal';
import { useState } from 'react';

type Props = {
  firstName: string;
  avatar: string;
  avatarName: string;
  photo: string;
  title: string;
  shortBio: string;
  gitHub: string;
  country: string;
  city: string;
  teamSay: string;
};

// export default function Avatar({ firstName, avatar, avatarName, photo, role, title, shortBio, gitHub, country, city, teamSay } :Props ) {
export default function Avatar({
  firstName,
  avatar,
  avatarName,
  title,
  photo,
  shortBio,
  gitHub,
  country,
  city,
  teamSay,
}: Props) {
  const [modalMemberCardIsOpen, setModalMemberCardIsOpen] = useState(false);

  const openModalMemberCard = () => {
    setModalMemberCardIsOpen(true);
  };

  const modalMemberCardStyles = {
    content: {
      top: '0',
      left: '0',
      width: '60vw',
      margin: '0 auto',
      height: '90vh',
      // height: 'max-content',
      backgroundColor: 'gray',
      transform: 'translateY(5%)',
      borderRadius: '10px',
    },
  };

  const closeModalMemberCard = () => {
    setModalMemberCardIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={modalMemberCardIsOpen}
        onRequestClose={closeModalMemberCard}
        style={modalMemberCardStyles}
        ariaHideApp={false}
        bodyOpenClassName="modal-body"
      >
        <div className="modal-wrapper">
          <img
            src={photo}
            className="modal-img"
            alt={`${firstName} - ${title}`}
          />
          <div className="descr-wrapper">
            <p className="descr-title">{firstName}</p>
            <div className="descr-content">
              <p>
                <span>role: </span>FrontEnd Developer
              </p>
              <p>
                <span>bio: </span>
                {shortBio}
              </p>
              <p>
                <span>gitHub: </span>
                {gitHub}
              </p>
              <p>
                <span>country: </span>
                {country}
              </p>
              <p>
                <span>city: </span>
                {city}
              </p>
              <p>
                <span>teamSay: </span>
                {teamSay}
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <button
        type="button"
        className="avatar-card"
        onClick={openModalMemberCard}
      >
        <img className="avatar-img" src={avatar} alt={avatarName} />
        <p className="avatar-title">{title}</p>
      </button>
    </>
  );
}
