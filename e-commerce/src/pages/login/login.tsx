import { Link } from 'react-router-dom';
import LoginForm from '../../components/forms/login/login';

function Login() {
  return (
    <section className="login-page">
      <LoginForm />
      <div>
        <Link to="/registration">
          REGISTRATION PAGE !!!!! I`&apos;`M HERE !!!! I`&apos;`M HERE!!!!!!!!!!
          I`&apos;`M HERE
        </Link>
      </div>
    </section>
  );
}

export default Login;
