import React, { useState } from "react";
import { signin, signInWithGoogle, signInWithGitHub } from "../services/auth";
import { Link } from "react-router-dom";
import styled from "styled-components";
import githubIcon from "../assets/icons/github.svg";
import googleIcon from "../assets/icons/google.svg";

export const Wrapper = styled.div`
  background: linear-gradient(to right, #11998e, #38ef7d);
  color: #342f31;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const LoginForm = styled.form`
  background: rgba(255, 255, 255, 0.1);
  padding: 30px 40px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  max-width: 400px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  p {
    margin-bottom: 25px;
  }
  a {
    color: #341f42;
    text-decoration: none;
    margin-left: 4px;
    font-weight: bold;
  }
  input {
    background: #fff;
    border: none;
    height: 40px;
    border-radius: 8px;
    width: 100%;
    padding: 20px;
    outline: none;
    &:first-child {
      margin-bottom: 20px;
    }
  }
  button {
    margin-top: 10px;
    cursor: pointer;
    border: none;
    background: #342f31;
    color: white;
    width: 100%;
    height: 40px;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 8px;
    transition: 0.6s transform;
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const LoginThirdApps = styled.div`
  border-top: 1px solid #e5e5e5;
  padding: 20px 0;
  button {
    display: flex;
    align-items: center;
    margin-top: 10px;
    cursor: pointer;
    border: none;
    background: #19aa8b;
    color: #342f31;
    width: 100%;
    height: 40px;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 8px;
    transition: 0.6s transform;
    padding-left: 20px;
    &:hover {
      transform: translateY(-3px);
    }

    img {
      height: 25px;
      margin-right: 10px;
    }
  }
`;
function LoginContainer(props) {
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
    setErrors("");
    console.log(formData);
    try {
      await signin(formData.email, formData.password);
      console.log("Logged successful");
    } catch (error) {
      setErrors(error.message);
    }
  };

  const signInGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setErrors(error.message);
    }
  };
  const signInGithub = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      setErrors(error.message);
    }
  };

  return (
    <Wrapper>
      <LoginForm autoComplete="off" onSubmit={handleSubmit}>
        <h1>
          Login to
          <Link to="/">Chateable</Link>
        </h1>
        <p>Fill in the form below to login to your account.</p>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            type="password"
          />
        </div>
        <div>
          {errors ? <p>{errors}</p> : null}
          <button type="submit">Login</button>
        </div>
        <hr />
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <LoginThirdApps>
          <button onClick={signInGoogle}>
            <img src={googleIcon} alt="" />
            Sing In With Google
          </button>
          <button onClick={signInGithub}>
            <img src={githubIcon} alt="" />
            Sing In With GitHub
          </button>
        </LoginThirdApps>
      </LoginForm>
    </Wrapper>
  );
}

export default LoginContainer;
