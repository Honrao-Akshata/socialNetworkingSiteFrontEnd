import React,{Component} from 'react';
import {Redirect,Link} from 'react-router-dom';
import {signin ,authenticate} from '../auth/index'
import SocialLogin from "./SocialLogin";



class Signin extends Component {
  constructor(){
    super();
    this.state = {
      email:"",
      password:"",
      error:"",
      redirectToRenderer:false,
      loading:false

    };
  }
  handleRequest = name => event=>{
    this.setState({error:""})
    this.setState({[name]:event.target.value})
  }
  clickSubmit = event => {
    event.preventDefault();
    this.setState({loading:true})
    const {email,password} = this.state;
    const user ={
      email:email,
      password:password
    }
    signin(user).then(data => {
      if(data.error) this.setState({error:data.error,loading:false});
      else{
      authenticate(data ,() => {
      this.setState({redirectToRenderer:true,loading:false})
      })
      }
    })
}

Signinform =(email,password) => {
  return(
    <form>
    <div className="form-group">
    <label className="text-muted">Email</label>
    <input onChange={this.handleRequest("email")} type="email" className="form-control" value={email}></input>
    </div>
    <div className="form-group">
    <label className="text-muted">Password</label>
    <input onChange={this.handleRequest("password")} type="password " className="form-control" value={password}></input>
    </div>
    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
    </form>
  )
}

  render(){
    const {email,password,error,redirectToRenderer,loading} = this.state;
    if(redirectToRenderer){
      return <Redirect to="/"/>
    }
    return(
      <div className="jumbotron">
      <div className="container">
      <h2>User Signin</h2>
      <hr />
        <SocialLogin />
        <hr />
      <div className="alert alert-danger" style={{display: error? "" : "none"}}>{error}
      </div>
      {loading ? <div className="jumbotron text-centered"><h2>Loading.....</h2></div> : ""}
      {this.Signinform(email,password)}
        <Link to={`/forgotPassword`} className="bt btn-sm btn-danger"> Forgot Password</Link>

              </div>

      </div>
    )
  }
}

export default Signin;
