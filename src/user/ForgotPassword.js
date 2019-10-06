import React,{Component} from 'react';
import {forgotPassword} from './apiUser';


class ForgotPassword extends Component {
constructor(){
      super()
  this.state={
    message:"",
    error:"",
    email:"",
    redirectToHome:false
  }
}
forgotPassword=event=>{
  const {email}=this.state
  event.preventDefault()
  forgotPassword(email).then(data=>{
      console.log(data)
      if(data.error){this.setState({error:data.error})}
      this.setState({message:data.message})
    })
}

handleRequest = name => event=>{
  this.setState({error:""})
  this.setState({[name]:event.target.value})
}


  render(){
    const{email,error,message}=this.state
    return (
    <div className="container mt-5">
    <form onSubmit={this.forgotPassword}  >
    <div className="form-group">
    <label className="text-muted">Enter your Email here:</label>
    <input type="email" onChange={this.handleRequest("email")} className="form-control" value={email}></input>
    </div>
    <button  className="btn btn-raised btn-danger mr-5">Send Passoword Link</button>
    </form>
    <div className="alert alert-danger" style={{display: error? "" : "none"}}>{error}
    </div>
    <div className="alert alert-danger" style={{display: message? "" : "none"}}>{message}
    </div>
    </div>)
  }
}
export default ForgotPassword;
