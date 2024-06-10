import './about.scss';
import RsschoolLogo from '../../assets/img/icons/rs_school_js.svg';
import BikeGirl from '../../assets/img/images/asinc-biker-girl.jpg';
import Rocket from '../../assets/img/images/asinc-rocket.jpg';
import Baby from '../../assets/img/images/asinc-baby.jpg';
import Discord from '../../assets/img/images/discord-channel.jpg';
import Trello from '../../assets/img/images/trello.jpg';

// import WeWorking from '../../components/stubs/weworking';

function About() {
  return (
    <>
      {/* <WeWorking /> */}
      <div className="about-wrapper">
        <h2 className="about free-page">About Us</h2>

        <div className="about-wrapper__top">
          <a href="https://rs.school/">
            <img className="rss-logo" src={RsschoolLogo} alt="rsschool-logo" />
          </a>

          <div className="asinc-title">ASInc Team</div>
        </div>
        <div className="about-wrapper__middle">
          <p>
            Meet our team, an eclectic group of student developers diving into
            the world of the E-commerstools API with gusto and a good sense of
            humor!
          </p>

          <p>
            We live in different countries. We differ in age and gender. We have
            never met before. And yet we are here together - in one team - to
            make our dream come true, to be a proficient frontend developer.
          </p>
          <p>
            We are ASInc Team. ASInc stands for Anzhelika, Sergey and Igor
            incorporated
          </p>
          <div className="discord-channel">
            <p>
              We engaged Discord functionality and our Mentor experience to
              arrange a team channel with voice, work-status and project-info
              sub-channels. We use it regularly, if not daily.
            </p>
            <img className="screen-shot" src={Discord} alt="discord-channel" />
          </div>
          <div className="trello">
            <img className="screen-shot" src={Trello} alt="trallo" />
            <p>
              We selected Trello as a tool for distribution of sprint tasks
              between the team members and for tracking progtress in tack
              completion.
            </p>
          </div>
        </div>
        <div className="about-wrapper__bottom">
          <img className="avatar" src={Rocket} alt="asinc-rocket-avatar" />
          <img className="avatar" src={BikeGirl} alt="asinc-girl-avatar" />
          <img className="avatar" src={Baby} alt="asinc-baby-avatar" />
        </div>
      </div>
    </>
  );
}

export default About;
