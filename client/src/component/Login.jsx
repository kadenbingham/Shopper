import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { login } from "../api/auth";

const Login = () => {
  const { setUser, setLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(username, password);
      setUser(data.user);
      setLoggedIn(true);
    } catch (error) {
      setError(error.message);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      {error && <h3>Error! {error}</h3>}
      <form onSubmit={handleSubmit}>
        <h3>You can Login here</h3>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
