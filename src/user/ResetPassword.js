import React,{Component} from 'react';
import {resetPassword} from './apiUser';


class ResetPassword extends Component {
constructor(){
      super()
  this.state={
    message:"",
    error:"",
    password:""
  }
}
resetPassword=event=>{
  const token=this.props.match.params.token;
  const {password}=this.state
  console.log("token:",token,"password:",password)

  event.preventDefault()
  resetPassword(token,password).then(data=>{
      console.log(data)
      if(data.error){this.setState({error:data.error})}
      this.setState({message:"Password reset successfull !!! Signin !!!"})
    })
}

handleRequest = name => event=>{
  this.setState({error:""})
  this.setState({password:event.target.value})
}


  render(){
    const{password,error,message}=this.state
    return (
    <div className="container mt-5">
    <form onSubmit={this.resetPassword}  >
    <div className="form-group mr-5">
    <label className="text-muted">Password</label>
    <input type="password" onChange={this.handleRequest("password")} className="form-control" value={password}></input>
    </div>
    <button  className="btn btn-raised btn-danger mr-5">Reset Passoword </button>
    </form>
    <div className="alert alert-danger" style={{display: error? "" : "none"}}>{error}
    </div>
    <div className="alert alert-success" style={{display: message? "" : "none"}}>{message}
    </div>
    </div>)
  }
}
export default ResetPassword;
