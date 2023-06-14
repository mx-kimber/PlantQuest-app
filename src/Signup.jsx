import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";

export function Signup() {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_digest, setPasswordDigest] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup" className="form-container">
      <h1 className="login-title">Signup</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <p>
          Name: <br />
          <input name="name" type="text" className="login-input" value={name} onChange={(event) => setName(event.target.value)} required />
        </p>
        <p>
          Email: <br />
          <input name="email" type="email" className="login-input" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </p>
        <p>
          Password: <br />
          <input name="password" type="password" className="login-input" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </p>
        <p>
          Password confirmation: <br />
          <input name="password_digest" type="password" className="login-input" value={password_digest} onChange={(event) => setPasswordDigest(event.target.value)} required />
        </p>
        <button type="submit" className="btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
}