import React,{Component} from 'react';
import {findPeople,follow} from './apiUser'
import { Link } from "react-router-dom";
import DefaultProfile from '../images/user.jpeg';

import {isAuthenticated} from '../auth/index'

class FindPeople extends Component{
  constructor(){
    super()
    this.state={
      users:[],
      error:"",
      open:false
    }
  }

  componentDidMount=()=>{
    const token = isAuthenticated().token;
    const userId = isAuthenticated().user._id;
    console.log("token: ",token,"userID: ",userId)
    findPeople(userId,token).then( data =>{
      if(data.error){console.log(data.error)}
      else{
        this.setState({users:data})
      }
    })
  }
clickFollowButton =(user,i)=>{
  const token = isAuthenticated().token;
  const userId = isAuthenticated().user._id;
  follow(userId, token ,user).then(data=>{
    if(data.error){
    this.setState({error:data.error})
  }else{
    let toFollow=this.state.users;
    toFollow.splice(i,1);
    this.setState({
      users:toFollow,
      open:true,
      followMessage:`following the ${user.name}`
    })
  }
  })

}

renderUsers=(users)=>(
  <div className="row">
    {users.map((user,i) => (
      <div className="card col-md-4"  key={i} style={{width: "18rem"}}>
        <img className="card-img-top" src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} onError={i=>(i.target.src=`${DefaultProfile}`)} alt={user.name}  style={{width:'100%',height:"15vw",objectFit:"cover"}}/>
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">{user.email}</p>
          <Link className="btn btn-raised btn-primary btn-sm float-left" to={`/user/${user._id}`}>View Profile</Link>
          <button  onClick={()=>this.clickFollowButton(user,i)} className="btn btn-raised btn-primary btn-sm float-right">Follow</button>
        </div>
      </div>
    ))
  }
    </div>
)

  render(){
    const {users,open,followMessage}=this.state;
    return(
      <div className="jumbotron">
      <h2 className="mt-5 mb-5">FindPeople</h2>
      <div className="alert alert-succes">
      {open && <p>{followMessage}</p>}
      </div>
      {this.renderUsers(users)}

      </div>
    )
  }
}

export default FindPeople;
