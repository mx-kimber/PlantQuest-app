import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_digest, setPasswordDigest] = useState("");

  let nameBlankMessage;
  if (name.trim() === "") {
    nameBlankMessage = <small id="error_style">*</small>;
  }

  let emailBlankMessage;
  if (email.trim() === "") {
    emailBlankMessage = <small id="error_style">*</small>;
  }

  let passwordBlankMessage;
  if (password.trim() === "") {
    passwordBlankMessage = <small id="error_style">*</small>;
  }

  let passwordDigestBlankMessage;
  if (password_digest.trim() === "") {
    passwordDigestBlankMessage = <small id="error_style">*</small>;
  }

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
    <div id="signup">
      <h1>Signup</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
          {nameBlankMessage}
        </div>
        <div>
          Email: <input name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          {emailBlankMessage}
        </div>
        <div>
          Password: <input name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          {passwordBlankMessage}
        </div>
        <div>
          Password confirmation: <input name="password_digest" type="password" value={password_digest} onChange={(event) => setPasswordDigest(event.target.value)} />
          {passwordDigestBlankMessage}
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

