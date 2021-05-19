import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../index.css";

function responseFacebook(res) {
  console.log(res);
}

function responseGoogle(res) {
  console.log(res.profileObj);
}

export const Login = (props) => {
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
        className='btnGoogle-login'
      />
      <br />
      <p>
        You new around these parts? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};
