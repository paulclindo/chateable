import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background: linear-gradient(to right, #11998e, #38ef7d);
  color: #342f31;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  a {
    color: #342f31;
    font-size: 40px;
    margin-bottom: 30px;
  }
`;

function HomeContainer(props) {
  return (
    <Wrapper>
      <Link to="/login">Log In</Link>
      <Link to="/login">Sign Up</Link>
    </Wrapper>
  );
}

export default HomeContainer;
