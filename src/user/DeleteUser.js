import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {isAuthenticated , signout} from '../auth/index';
import {remove} from './apiUser'

class DeleteUser extends Component {
  state={
    redirect:false
  }
  deletConfirmed=()=>{
    let answer = window.confirm("Are you sure you want delete your account?")
  if(answer){
    this.deleteAccount()
  }
  }

deleteAccount=()=>{
const token = isAuthenticated().token;
const userId = isAuthenticated().user._id;

remove(userId,token).then(data =>{
if(data.error) console.log(data.error)
else{
  signout(()=>console.log("User Deleted"))
  this.setState({redirect:true})

}})
}

  render(){
    if(this.state.redirect) return <Redirect to="/"/>
    return(
<button  onClick={this.deletConfirmed} className="btn btn-raised btn-danger mr-5" >Delete Profile</button>
    )
  }
}

export default DeleteUser;
