import './registration.css';

function Registration() {
  return (
    <form className="registration">
      <h2>Registration</h2>
      <input type="text" placeholder="Mail" />
      <input type="password" placeholder="Password" />
      <button type="button">Registration</button>
    </form>
  );
}

export default Registration;
