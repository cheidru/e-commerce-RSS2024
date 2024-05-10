import { Link } from 'react-router-dom';
import LoginForm from '../../components/forms/login/login';

function Login() {
  return (
    <>
      <LoginForm />
      <div>
        <Link to="/registration">
          REGISTRATION PAGE !!!!! I`&apos;`M HERE !!!! I`&apos;`M HERE!!!!!!!!!!
          I`&apos;`M HERE
        </Link>
      </div>
    </>
  );
}

export default Login;
