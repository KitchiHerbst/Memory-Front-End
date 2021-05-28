import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import "../index.css";
import React, { useState } from "react";

export const Login = (props) => {
  const [manualLogin, setManualLogin] = useState(false);
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
        localStorage.token = userData.token;
        props.dispatch({ type: "LOGIN" });
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
    e.preventDefault();
    let user = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    fetchAndDispatch(user);
  }

  

  return (
    <div className="main-login-div text-center">
      <div className="login-header" >
        <h1 className="mt-4 mb-4">MEMORY</h1>
        <h4 className="font-weight-normal mb-4">Please Login</h4>
      </div>
      <div className='login-methods'>
        <FacebookLogin
          appId="743947922947098"
          autoLoad={true}
          fields="name,email,picture"
          // onClick={componentClicked}
          callback={responseFacebook}
          cssClass="btn btn-primary col-12 text-center"
        />
            <br />
        <br />
        <GoogleLogin
          clientId="327256534475-ut4552bgs66c3g85p0dvbk2mrk1hgjim.apps.googleusercontent.com"
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='btn btn-primary col-12 text-center'>Login with Google</button>
          )}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          // cookiePolicy={"single-host-origin"}
          
        />
            <br />
        <br />
        <button
          className="btn btn-secondary col-12 text-center"
          onClick={() => setManualLogin(!manualLogin)}
        >
          Manual Login
        </button>
        <br />
        <br />
        {manualLogin ? (
          <form onSubmit={(e) => responseManual(e)}>
            <input placeholder="Email" type="text" className='col-12'/>
            <br />
            <br />
            <input placeholder="Password" type="password" className='col-12'/>
            <br />
            <br />
            {/* <input type="submit" /> */}
            <button className="btn btn-secondary col-12 text-center">Login</button>
          </form>
        ) : null}
        <p>
          New around these parts? <Link to="/signup">Sign up here</Link>
        </p>
        {props.redirect ? <Redirect to="/home" /> : null}
      </div>
    </div>
  );
};
