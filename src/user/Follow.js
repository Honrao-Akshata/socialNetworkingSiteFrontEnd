import React,{Component} from 'react';
import {follow,unfollow} from './apiUser';


class Follow extends Component {
followClick=()=>{
  console.log(this.props.onButtonClick)
  this.props.onButtonClick(follow)
}
unfollowClick=()=>{
  console.log(this.props.onButtonClick)
  this.props.onButtonClick(unfollow)
}

  render(){
    return (
    <div className="d-inline-block mt-5">
    {
      !this.props.following ?
      (  <button onClick={this.followClick} className="btn btn-raised btn-success mr-5">FOLLOW</button>)
      :
      (<button  onClick={this.unfollowClick} className="btn btn-raised btn-danger mr-5">UNFOLLOW</button>)
    }


    </div>)
  }
}
export default Follow
