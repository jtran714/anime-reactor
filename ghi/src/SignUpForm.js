import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { first_name, last_name, username, password, email };
    const signupUrl = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/signup`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(signupUrl, fetchConfig);

    if (response.ok) {
      //   const newUser = await response.json();
      setEmail("");
      setUsername("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setSubmitted(true);
    }
    navigate("/Login");
  };
    const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="firstname" className="form-label">
          First name
        </label>
        <input
          required
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          className="form-control"
          id="firstname"
          placeholder="First name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last name
        </label>
        <input
          required
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          className="form-control"
          id="lastName"
          placeholder="Last name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          User Name
        </label>
        <input
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="form-control"
          id="username"
          placeholder="Username"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          id="email"
          placeholder="you@email.com"
        />
      </div>
      <button className="btn btn-primary">Create</button>
      {submitted && (
        <div className="success-message">
          Success! Thank you for Signing up!
        </div>
      )}
      <p>
        Already a member? Login{" "}
        <a href={`${process.env.REACT_APP_ACCOUNTS_API_HOST}/Login`}>here</a>
      </p>
    </form>
  );
};

export default SignUpForm;