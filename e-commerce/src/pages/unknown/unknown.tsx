import Modal from '../../components/modal/modal';
import './unknown.scss';

function Unknown() {
  return (
    <Modal
      displayNoneFlex={{ display: 'flex' }}
      headerText="Error 404"
      modalText="The page can not be found"
    />
  );
}

export default Unknown;
