import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../services/auth";
import { Wrapper, LoginForm as SignInForm } from "./LoginContainer";

function SignupContainer(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      await signup(formData.email, formData.password);
      console.log("Registro successful");
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <Wrapper>
      <SignInForm onSubmit={handleSubmit}>
        <h1>
          Sign Up to
          <Link to="/">Chateable</Link>
        </h1>
        <p>Fill in the form below to create an account.</p>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
          ></input>
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            type="password"
          ></input>
        </div>
        <div>
          {errors ? <p>{errors}</p> : null}
          <button type="submit">Sign up</button>
        </div>
        <hr></hr>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </SignInForm>
    </Wrapper>
  );
}

export default SignupContainer;
