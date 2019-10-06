import React,{Component} from 'react';
import {isAuthenticated} from '../auth/index'
import {Redirect,Link} from 'react-router-dom';
import {read} from './apiUser';
import DeleteUser from './DeleteUser'
import Follow from './Follow'
import ProfileTabs from './ProfileTabs'
import DefaultProfile from '../images/user.jpeg';
import {postsByUser} from '../post/apiPost';

class Profile extends Component{

  constructor(){
    super()
    this.state={
      user:{following:[],followers:[]},
      redirectToSignin:false,
      following:false,
      posts:[]

    }
  }


  init=(userid)=>{
    const token = isAuthenticated().token;
    read(userid,token)
    .then( data => {
      if(data.error){
        //console.log(data.error)
        this.setState({redirectToSignin:true})
      }else{
        //console.log(data)
        this.setState({
          following:this.checkFollow(data),
          user:data
        })
        this.loadPosts(data._id)
      }
    });


  }
  loadPosts=userId=>{
    const token = isAuthenticated().token;
    postsByUser(userId,token)
    .then( data => {
      if(data.error){
        console.log(data.error);
      }else{
        //console.log(data)
        this.setState({
          posts:data
        })
      }
    });

  }

  clickFollowButton=callApi=>{
    const userId = isAuthenticated().user._id;
    console.log(userId);
    console.log(this.state.user._id);
    const token = isAuthenticated().token;
    callApi(userId,token,this.state.user._id).then(data => {
      if(data.error){this.setState({error:data.error})}
    })
  }
  componentDidMount(){
    // console.log("UserId form path:", this.props.match.params.userid)
    const userid=this.props.match.params.userid
    this.init(userid)
  }
  componentWillReceiveProps(props){
    //console.log("UserId form path:", this.props.match.params.userid)
    const userid=props.match.params.userid
    this.init(userid)
  }
  checkFollow =(user)=>{
    const jwt = isAuthenticated();
    const match = user.followers.find(follower=>{
      return follower._id === jwt.user._id
    })
    return match

  }

  render(){
    const {redirectToSignin,user,posts}=this.state
    console.log("follower:",user.followers)
    console.log("following:",user.following)

    if(redirectToSignin){
      return <Redirect to="/signin"/>
    }
    const photoUrl= user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}`: DefaultProfile ;
    return(
      <div className="container">
      <h2 >User Profile</h2>
      <div className="row">
      <div className="col-md-4">
      <img style ={{height:"300px","width":"100%"}} className="img-thumbnail" onError={i=>(i.target.src=`${DefaultProfile}`)} src={photoUrl} alt={user.name}/>
      </div>
      <div className="col-md-8">
      <div className="lead mt-2">
      <p>Hi {user.name}</p>
      <p>Email:{user.email}</p>
      <p>{`joined ${new Date(user.createdDate).toString()}`}</p>
      </div>

      {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
        <div className="d-inline-block mt-5">
        <Link  className="btn btn-raised btn-info mr-5" to={`/create/post`}>Create Post</Link>
        <Link  className="btn btn-raised btn-success mr-5" to={`/user/edit/${user._id}`}>Edit Profile</Link>
        <DeleteUser userId={user._id} />

        </div>
      ) :   (<Follow following={this.state.following} onButtonClick={this.clickFollowButton}/>) }

      </div>
      </div>
      <div className="row">
      <div className="col-md-12 "><hr/><p className="lead">{user.about}</p><hr/></div>
      <div className="col-md-12"><ProfileTabs followers={user.followers} following={user.following} posts={posts}/></div>
      </div>

      </div>
    )
  }
}

export default Profile;
