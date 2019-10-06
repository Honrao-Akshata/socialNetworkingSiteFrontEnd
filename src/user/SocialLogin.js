import React, { Component } from "react";
import {socialLogin,authenticate} from "../auth/index";
import {Redirect} from 'react-router-dom';
import GoogleLogin from "react-google-login";

class SocialLogin extends Component {
  constructor() {
      super();
      this.state = {
          redirectToReferrer: false

      };
  }
  responseGoogle = response => {
    console.log(response);
    const {email,name,imageUrl,googleId}=response.profileObj;
    const user={
      email:email,name:name,password:googleId,imageUrl:imageUrl
    }
    console.log("email:",email,"name",name,"password: ",googleId,"imageUrl:",imageUrl)
    socialLogin(user).then(data => {
      if(data.error) this.setState({error:data.error});
      else{
      authenticate(data ,() => {
      this.setState({redirectToRenderer:true})
      })
      }
    })
  };

  render() {
    const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }
        // const clientId={process.env.clientId}
    return (
      <div className="container">
      <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login with Google"
      onSuccess={this.responseGoogle}
      onFailure={this.responseGoogle}
      />
      </div>
    );
  }
}

export default SocialLogin;
