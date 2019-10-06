import React,{Component} from 'react';
import {singlePost,remove,like,unlike} from './apiPost'
import { Link,Redirect } from "react-router-dom";
import DefaultProfile from '../images/puppy.jpg';
import Comment from './Comment';
import {isAuthenticated} from '../auth/index';

class SinglePost extends Component{
  constructor(){
    super()
    this.state={
      post:"",
      loading:false,
      redirectToHome:false,
      redirectToLogin:false,
      like:false,
      likes:0,
      comments:[]
    }
  }

  checkLike = likes => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  componentDidMount=()=>{
    const postId=this.props.match.params.postId
    this.setState({loading:true})
    singlePost(postId).then(data =>{
      if(data.error){console.log(data.error)}
      else{
        console.log(data)
        this.setState({
          loading:false,
          post:data,
          like:this.checkLike(data.likes),
          likes:data.likes.length,
          comments:data.comments
        })
      }
    })
  }

  deletePost =()=>{
    const postId=this.props.match.params.postId;
    const token=isAuthenticated().token;
    remove(postId,token).then(data =>{
      if(data.error){console.log(data.error)}
      this.setState({redirectToHome:true})
    })
  }
  deletConfirmed=()=>{
    let answer = window.confirm("Are you sure you want delete post?")
    if(answer){
      this.deletePost()
    }
  }

  likeToggle =()=>{
    if(!isAuthenticated()){
      this.setState({redirectToLogin:true})
      return false
    }
    const postId=this.state.post._id;
    const token=isAuthenticated().token;
    const userId=isAuthenticated().user._id;
    let callApi = this.state.like ? unlike :like;
    console.log("callApi",callApi,"like Sattus before execution:",this.state.like);
    callApi(userId,postId,token).then( data => {
      console.log(data)
      if(data.error){
        console.log(data.error)
      }else{
        this.setState({
          like: !this.state.like,
          likes: data.likes.length
        })
      }
    })
    console.log("After exeecution:","like Sattus:",this.state.like);

  }
  updateComments=comments=>{
    this.setState({comments:comments})
  }

  renderPost=(post)=>{
    const {likes,like}=this.state
    var postedId = post.postedBy?`/user/${post.postedBy._id}`:"";
    var postedByName = post.postedBy?post.postedBy.name:" Unknown";
    var postedAt = post.postedBy?post.created:" Unknown";
    return(
      <div className="card-body">
      <img className="img-thumbnail mb-3" src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
      onError={i=>(i.target.src=`${DefaultProfile}`)} alt={post.title}  style={{width:'auto',height:"400px"}}/>

      {like?(
        <h3 onClick={this.likeToggle}><i className="fa fa-thumbs-up text-success"> </i>{likes} Likes</h3>
      )
        :(
          <h3 onClick={this.likeToggle}><i className="fa fa-thumbs-up text-warning"></i>{likes} Likes</h3>
        )}

      <p className="card-text">{post.body}</p>
      <p className="font-italic mark ">PostedBy:<Link  to={`${postedId}`}>{postedByName}</Link>on {new Date(postedAt).toDateString()}</p>
      <div className="d-inline-block">
      <Link className="btn btn-raised btn-primary btn-sm mr-5" to={`/`}>Back to Posts</Link>
      {isAuthenticated().user && isAuthenticated().user._id === post.postedBy._id   && (
        <>
        <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-warning btn-sm mr-5">
        Update Post
        </Link>
        <button onClick={this.deletConfirmed} className="btn btn-raised btn-danger">
        Delete Post
        </button>
        </>
      )}
      </div>
      </div>
    )
  }

  render(){
    const {post,redirectToHome,redirectToLogin,comments}=this.state;
    console.log(comments)
    if (redirectToHome) {
      return <Redirect to={`/`} />;
    }
    else if (redirectToLogin) {
      return <Redirect to={`/signin`} />;
    }
    return(
      <div className="container">
      <h2 className="display-2 mt-5 mb-5">{post.title}</h2>

      {!post ? (
        <div className="jumbotron text-center">
        <h2>Loading...</h2>
        </div>
      ) : (
        this.renderPost(post)
      )}
      <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updateComments}/>
      </div>
    )
  }
}

export default SinglePost;
