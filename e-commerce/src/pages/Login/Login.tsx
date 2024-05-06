import './login.css';

function Login() {
  return (
    <form className="login">
      <h2>Login</h2>
      <input type="text" placeholder="Mail" />
      <input type="password" placeholder="Password" />
      <button type="button">Log In</button>
    </form>
  );
}

export default Login;
