import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "../index.css";

export const Signup = (props) => {
    // 
  function responseFacebook(res) {
    let newUser = {
      firstName: res.name.split(" ")[0],
      lastName: res.name.split(" ")[1],
      email: res.email,
      profilePicture: res.picture.data.url,
      facebookId: res.id,
    };
    props.dispatch({ type: "SIGNED UP", payload: newUser });
  }

  function responseGoogle(res) {
    let newUser = {
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      email: res.profileObj.email,
      profilePicture: res.profileObj.imageUrl,
      googleId: res.profileObj.googleId,
    };
    props.dispatch({ type: "SIGNED UP", payload: newUser });
  }
  //
  const submitHandler = (e) => {
    e.preventDefault();
    let newUser = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      email: e.target[2].value,
      password: e.target[3].value,
      profilePicture: e.target[5].value,
    };

    props.dispatch({ type: "SIGNED UP", payload: newUser });
  };
  //
  return (
    <div className="login-signup" id="signup-card">
      <FacebookLogin
        appId="743947922947098"
        autoLoad={true}
        fields="name,email,picture"
        // onClick={componentClicked}
        callback={responseFacebook}
        textButton="Sign up with Facebook"
        cssClass="btnFacebook-signup"
      />
      <br />
      <GoogleLogin
        clientId="327256534475-ut4552bgs66c3g85p0dvbk2mrk1hgjim.apps.googleusercontent.com"
        buttonText="Sign up with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        // cookiePolicy={"single-host-origin"}
        className="btnGoogle-signup"
      />
      <br />
      <br />
      <div id="manual-signup">
        <form id="signup-form" onSubmit={submitHandler}>
          <input id="first-name" type="text" placeholder="First Name" />
          <br />
          <br />
          <input id="last-name" type="text" placeholder="Last Name" />
          <br />
          <br />
          <input id="email" type="text" placeholder="Email" />
          <br />
          <br />
          <input id="password" type="password" placeholder="Password" />
          <br />
          <br />
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
          />
          <br />
          <br />
          <input id="profile-picture" type="text" placeholder="Photo URL" />
          <br />
          <br />
          <button id="signup-button">Create Account</button>
        </form>

        {props.redirect ? <Redirect to="/home" /> : null}
      </div>
    </div>
  );
};
