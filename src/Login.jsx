import axios from "axios";
import { useState } from "react";

export function Login() {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let emailBlankMessage;
  if (email.trim() === "") {
    emailBlankMessage = <small id="error_style">*</small>;
  }

  let passwordBlankMessage;
  if (password.trim() === "") {
    passwordBlankMessage = <small id="error_style">*</small>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login">
      <h1>Login</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Email: <input name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          {emailBlankMessage}
        </div>
        <div>
          Password: <input name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          {passwordBlankMessage}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
