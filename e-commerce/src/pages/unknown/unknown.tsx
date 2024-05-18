import { useNavigate } from 'react-router-dom';
import bed from '../../assets/img/icons/bed.svg';

function Unknown() {
  const navigate = useNavigate();
  return (
    <div className="unknown">
      <div className="unknown-title-wrapper">
        <img src={bed} alt="title-img" className="unknown-img" />
        <p className="unknown-title">404</p>
      </div>
      <div className="unknown-wrapper">
        <p className="unknown-text">The page is not found</p>
        <div className="unknown-btn-wrapper">
          <button
            type="button"
            className="form__call-btn"
            onClick={() => navigate('/', { replace: true })}
          >
            Go to Home
          </button>
          <button
            type="button"
            className="form__call-btn"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Unknown;
