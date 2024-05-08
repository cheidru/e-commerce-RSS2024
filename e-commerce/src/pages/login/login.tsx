import './login.scss';

function Entry() {
  return (
    <form className="login">
      <h2>Login</h2>
      <input type="text" placeholder="Mail" />
      <input type="password" placeholder="Password" />
      <button type="button">Log In</button>
    </form>
  );
}

export default Entry;
