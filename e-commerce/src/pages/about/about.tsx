import './about.scss';
import RsschoolLogo from '../../assets/img/icons/rs_school_js.svg';
import BikeGirl from '../../assets/img/images/asinc-biker-girl.jpg';
import Rocket from '../../assets/img/images/asinc-rocket.jpg';
import Baby from '../../assets/img/images/asinc-baby.jpg';

// import WeWorking from '../../components/stubs/weworking';

function About() {
  return (
    <>
      <h2 className="about free-page">About Us</h2>
      {/* <WeWorking /> */}
      <div className="about-wrapper">
        <div className="about-wrapper__top">
          <img className="rss-logo" src={RsschoolLogo} alt="rsschool-logo" />
          <div className="asinc-title">ASInc Team</div>
        </div>
        <div className="about-wrapper__middle">
          We live in different countries. We differ in age and gender. We have
          never met before. And yet we are here together - in one team - to make
          our dream come true, to be a proficient frontend developer.
        </div>
        <div className="about-wrapper__bottom">
          <img className="avatar" src={BikeGirl} alt="asinc-girl-avatar" />
          <img className="avatar" src={Rocket} alt="asinc-rocket-avatar" />
          <img className="avatar" src={Baby} alt="asinc-baby-avatar" />
        </div>
      </div>
    </>
  );
}

export default About;
