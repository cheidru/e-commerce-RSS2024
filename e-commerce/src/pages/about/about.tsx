import './about.scss';
import RsschoolLogo from '../../assets/img/icons/rs_school_js.svg';
import Discord from '../../assets/img/images/discord-channel.jpg';
import Trello from '../../assets/img/images/trello.jpg';
import asyncMember from './memberData';
import Avatar from './member';
import ScreenShot from './screenShot';

function About() {
  return (
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
          Meet our team, an eclectic group of student developers diving into the
          world of the E-commerstools API with gusto and a good sense of humor!
        </p>

        <p>
          We live in different countries. We differ in age and gender. We have
          never met before. And yet we are here together - in one team - to make
          our dream come true, to be a proficient frontend developer.
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
          <ScreenShot screen={Discord} />
        </div>
        <div className="trello">
          <ScreenShot screen={Trello} />
          <p>
            We selected Trello as a tool for distribution of sprint tasks
            between the team members and for tracking progtress in tack
            completion.
          </p>
        </div>
      </div>
      <div className="about-wrapper__bottom">
        <Avatar
          firstName={asyncMember[1].firstName}
          avatar={asyncMember[1].avatar}
          avatarName={asyncMember[1].avatarName}
          title={asyncMember[1].title}
          photo={asyncMember[1].photo}
          shortBio={asyncMember[1].shortBio}
          gitHub={asyncMember[1].gitHub}
          country={asyncMember[1].country}
          city={asyncMember[1].city}
          teamSay={asyncMember[1].teamSay}
        />
        <Avatar
          firstName={asyncMember[0].firstName}
          avatar={asyncMember[0].avatar}
          avatarName={asyncMember[0].avatarName}
          title={asyncMember[0].title}
          photo={asyncMember[0].photo}
          shortBio={asyncMember[0].shortBio}
          gitHub={asyncMember[0].gitHub}
          country={asyncMember[0].country}
          city={asyncMember[0].city}
          teamSay={asyncMember[0].teamSay}
        />
        <Avatar
          firstName={asyncMember[2].firstName}
          avatar={asyncMember[2].avatar}
          avatarName={asyncMember[2].avatarName}
          title={asyncMember[2].title}
          photo={asyncMember[2].photo}
          shortBio={asyncMember[2].shortBio}
          gitHub={asyncMember[2].gitHub}
          country={asyncMember[2].country}
          city={asyncMember[2].city}
          teamSay={asyncMember[2].teamSay}
        />
      </div>
    </div>
  );
}

export default About;
