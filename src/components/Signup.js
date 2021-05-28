import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { CreateTimeline } from ".././functions/CreateTimeline";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "../index.css";

export const Signup = (props) => {

  const [manualSignup, setManualSignup] = useState(false);

  const signUserUp = (newUserObject) => {
    fetch("http://localhost:3001/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newUserObject),
    })
      .then((res) => res.json())
      .then((userResponse) => {
        if (userResponse !== null) {
          localStorage.token = userResponse.token;
          props.dispatch({ type: "SIGNED UP", payload: userResponse });
          CreateTimeline(userResponse.token);
        }
      });
  };
  //
  function responseFacebook(res) {
    //   console.log(res)
    let newUser = {
      firstName: res.name.split(" ")[0],
      lastName: res.name.split(" ")[1],
      password: res.userID.toString(),
      email: res.email,
      profilePicture: res.picture.data.url,
      //   facebookId: res.userID,
    };
    // console.log(newUser)
    signUserUp(newUser);
  }

  function responseGoogle(res) {
    let newUser = {
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      email: res.profileObj.email,
      password: res.profileObj.googleId.toString(),
      profilePicture: res.profileObj.imageUrl,
      //   googleId: res.profileObj.googleId,
    };
    // console.log(newUser)
    signUserUp(newUser);
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

    signUserUp(newUser);
  };
  //
  return (
    <div className="main-login-div text-center">
      <div className="login-header">
        <h1 className="mt-4 mb-4">MEMORY</h1>
        <h4 className="font-weight-normal mb-4">Sign up</h4>
      </div>
      <div className="login-methods">
        <FacebookLogin
          appId="743947922947098"
          autoLoad={true}
          fields="name,email,picture"
          // onClick={componentClicked}
          callback={responseFacebook}
          textButton="Sign up with Facebook"
          cssClass="btn btn-primary col-12 text-center"
        />
        <br />
        <br />
        <GoogleLogin
          clientId="327256534475-ut4552bgs66c3g85p0dvbk2mrk1hgjim.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="btn btn-primary col-12 text-center"
            >
              Sign up with Google
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          // cookiePolicy={"single-host-origin"}
          
        />
        <br />
        <br />
        <button onClick={() => setManualSignup(!manualSignup)} className='btn btn-secondary col-12 text-center'>Manual Signup</button>
        <br />
        <br />
            {manualSignup ?
        <form id="signup-form" onSubmit={submitHandler}>
          <input id="first-name" type="text" placeholder="First Name" className='col-12'/>
          <br />
          <br />
          <input id="last-name" type="text" placeholder="Last Name" className='col-12'/>
          <br />
          <br />
          <input id="email" type="text" placeholder="Email" className='col-12'/>
          <br />
          <br />
          <input id="password" type="password" placeholder="Password" className='col-12'/>
          <br />
          <br />
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            className='col-12'
          />
          <br />
          <br />
          <input id="profile-picture" type="text" placeholder="Photo URL" className='col-12'/>
          <br />
          <br />
          <button id="signup-button" className='btn btn-secondary col-12'>Create Account</button>
        </form>
        : null }
        <p>
          Change your mind? <Link to="/"> Return to Login </Link>
        </p>
        {props.redirect ? <Redirect to="/home" /> : null}
      </div>
    </div>
  );
};
