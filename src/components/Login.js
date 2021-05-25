import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "../index.css";
import React, {useState} from 'react'

export const Login = (props) => {

  const [manualLogin, setManualLogin] = useState(false)
  //function to take in a user object from all three methods of loggin in and
  //   making a call to the api to get the user and set the local token to that users ID

  const fetchAndDispatch = (user) => {
    fetch("http://localhost:3001/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((userData) => {
        localStorage.token = userData.token
          props.dispatch({ type: "LOGIN" })
      });
  };
  //functions to handle all three ways of loggin in and creating a user object for the above function
  function responseFacebook(res) {
    let user = {
      email: res.email,
      password: res.userID.toString(),
    };
    fetchAndDispatch(user);
  }

  function responseGoogle(res) {
    let user = {
      email: res.profileObj.email,
      password: res.profileObj.googleId.toString(),
    };
    fetchAndDispatch(user);
  }

  function responseManual(e) {
    e.preventDefault()
    let user ={
      email: e.target[0].value,
      password: e.target[1].value
    }
    fetchAndDispatch(user)
  }

  //

  return (
    <div className="login-signup" id="login-card">
      <FacebookLogin
        appId="743947922947098"
        autoLoad={true}
        fields="name,email,picture"
        // onClick={componentClicked}
        callback={responseFacebook}
        cssClass="btnFacebook-login"
      />
      <br />
      <GoogleLogin
        clientId="327256534475-ut4552bgs66c3g85p0dvbk2mrk1hgjim.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        // cookiePolicy={"single-host-origin"}
        className="btnGoogle-login"
      />
      <br />
      <button onClick={() => setManualLogin(!manualLogin)}>Manual Login</button>
      {manualLogin ? 
      <form onSubmit={responseManual}>
        <input placeholder='Email' type='text'/><br/>
        <input placeholder='Password' type='password'/><br/>
        <input type='submit'/>
      </form>
      : null}
      <p>
        You new around these parts? <Link to="/signup">Sign up here</Link>
      </p>
      {props.redirect ? <Redirect to="/home" /> : null}
    </div>

  );
};
