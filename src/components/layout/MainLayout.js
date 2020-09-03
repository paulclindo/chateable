import React from "react";
import { auth } from "../../services/firebase";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Layout = styled.div``;
const Topbar = styled.nav`
  background: #333;
  color: white;
  height: 90px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    color: white;
    text-decoration: none;
    &:hover {
      color: #e5e5e5;
    }
  }
  & > * {
    margin: 0 20px;
  }
  button {
    border: none;
    background: none;
    color: white;
    text-transform: uppercase;
  }
`;

function Mainlayout({ children, ...props }) {
  const logOut = () => {
    const { history } = props;
    auth().signOut();
    history.push("/login");
  };

  return (
    <Layout>
      <Topbar>
        <Link to="/"> Home </Link>
        <Link to="/chat"> Chat </Link>
        <button onClick={logOut}>LogOut</button>
      </Topbar>
      <div style={{ padding: 20 }}>{children}</div>
    </Layout>
  );
}

export default withRouter(Mainlayout);
