import React, { useState } from "react";
// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./App.css";
import HomeContainer from "./containers/HomeContainer";
import ChatContainer from "./containers/ChatContainer";
import LoginContainer from "./containers/LoginContainer";
import SignupContainer from "./containers/SignupContainer";
import { useEffect } from "react";
import { auth } from "./services/firebase";
import Mainlayout from "./components/layout/MainLayout";

function PrivateRoute({ children, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Mainlayout>{children}</Mainlayout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
function PublicRoute({ children, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <div>{children}</div>
        ) : (
          <Redirect to="/chat" />
        )
      }
    />
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <h1>loading</h1>;
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeContainer />
        </Route>
        <PrivateRoute path="/chat" authenticated={isLoggedIn}>
          <ChatContainer />
        </PrivateRoute>
        <PublicRoute path="/signup" authenticated={isLoggedIn}>
          <SignupContainer />
        </PublicRoute>
        <PublicRoute path="/login" authenticated={isLoggedIn}>
          <LoginContainer />
        </PublicRoute>
      </Switch>
    </Router>
  );
}

export default App;
