import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginFormPage from "./components/LoginSignupPage/LoginForm";
import SignupFormPage from "./components/LoginSignupPage/SignupForm";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);  //for restoring session user

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
      <Route path="/home">
        <HomePage/>
      </Route>
      <Route path="/">
        <LoginFormPage />
      </Route>
    </Switch>
  );

}

export default App;
