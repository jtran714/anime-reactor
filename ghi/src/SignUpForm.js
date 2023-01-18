import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useToken } from "./auth";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate();
  const [, , , signup] = useToken();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);

  const clearState = () => {
    setFirstname("");
    setLastname("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const successful = await signup(email, password);
    if (!successful) {
      setInvalid(true);
    } else {
      clearState();
      navigate("/");
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="text-left display-6">Create account</h1>
          <div className="text-left lead mb-3">
            Already have an account?
            <NavLink to="/login"> Login</NavLink>
          </div>
          <form id="create-appointment-form" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                type="text"
                name="email"
                id="email"
                className="form-control"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="col text-left">
              <button className="btn btn-primary">Create</button>
            </div>
          </form>
          {invalid && (
            <div
              className="alert alert-danger mb-0 p-4 mt-4"
              id="invalid-message"
            >
              You've entered an email already in use! Please log in or
              try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
