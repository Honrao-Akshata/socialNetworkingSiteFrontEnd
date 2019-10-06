import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {  signup } from '../auth/index';

class Signup extends Component {
  constructor(){
    super();
    this.state = {
      name:"",
      email:"",
      password:"",
      error:"",
      open:false
    };
  }
  handleRequest = name => event=>{
    this.setState({error:""})
    this.setState({[name]:event.target.value})

  }
  clickSubmit = event => {
    event.preventDefault();
    const {name,email,password} = this.state;
    const user ={
      name:name,
      email:email,
      password:password
    }
    signup(user).then(data => {
      if(data.error) this.setState({error:data.error})
      else this.setState({
        name:"",
        email:"",
        password:"",
        error:"",
        open:true
      })
    })
  }


signupform =(name,email,password) => {
  return(
    <form>
    <div className="form-group">
    <label className="text-muted">Name</label>
    <input onChange={this.handleRequest("name")} type="text" className="form-control" value={name}></input>
    </div>
    <div className="form-group">
    <label className="text-muted">Email</label>
    <input onChange={this.handleRequest("email")} type="email" className="form-control" value={email}></input>
    </div>
    <div className="form-group">
    <label className="text-muted">Password</label>
    <input onChange={this.handleRequest("password")} type="password" className="form-control" value={password}></input>
    </div>
    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
    </form>
  )
}

  render(){
    const {name,email,password,error,open} = this.state;
    return(
      <div className="jumbotron">
      <h2>User signup</h2>
      <div className="alert alert-danger" style={{display: error? "" : "none"}}>{error}
      </div>
      <div className="alert alert-info" style={{display: open? "" : "none"}}>New account succesfully created
      <Link to="/signin">Please signin</Link>
      </div>
      {this.signupform(name,email,password)}
      </div>
    )
  }
}

export default Signup;
