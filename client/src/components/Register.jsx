import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { register } from "../api/auth";

const Register = () => {
  const { setUser, setLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("username", username, "password", password);
    const data = await register(username, password);

    if (data.name === "error") {
      console.log("unable to register");

      setError(data.detail);
    } else {
      setError(null);
      setUser(data.user);
      setLoggedIn(true);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <div className="register-container">
        <h2 className="register-title">Register</h2>
        {error ? <h3>Error! {error}</h3> : null}
        <form onSubmit={handleSubmit} className="login-form">
          <label className="email-label" htmlFor="email" username>
            email:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
          <label className="password-label" htmlFor="password" password>
            password:
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button type="submit">Submit Registration</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
