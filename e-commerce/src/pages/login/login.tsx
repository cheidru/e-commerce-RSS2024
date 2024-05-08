import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <form className="login">
        <h2>Login</h2>
        <input type="text" placeholder="Mail" />
        <input type="password" placeholder="Password" />
        <button type="button">Log In</button>
      </form>
      <div>
        <Link to="/registration">REGISTRATION PAGE</Link>
      </div>
    </>
  );
}

export default Login;
