import React,{Component} from 'react';
import {comment,uncomment} from './apiPost'
import { Link } from "react-router-dom";
import DefaultProfile from '../images/puppy.jpg';
import {isAuthenticated} from '../auth/index';

class Comment extends Component{
  constructor(){
    super()
    this.state={
      text:"",
      error:"",
      loading:false,
      redirectToHome:false
    }
  }
  isValid = () => {
        const { text } = this.state;
        if (!text.length > 0 || text.length > 150) {
            this.setState({
                error:
                    "Comment should not be empty and less than 150 characters long"
            });
            return false;
        }
        return true;
    };

  handleRequest = event => {
    this.setState({ error:"",text: event.target.value });
  };
  addComment = event => {
    event.preventDefault();
    if(!isAuthenticated()){
      this.setState({error:"Please Login!!!!"});
      return false
    }
    if(this.isValid()){
      const userId=isAuthenticated().user._id;
      const token=isAuthenticated().token;
      const postId=this.props.postId;
      const commentValue={text:this.state.text}
      comment(userId,postId,token,commentValue).then( data => {
        if(data.error){
          console.log(data.error)
        }else{
          console.log(data)
          this.setState({
            text:""
          })
          this.props.updateComments(data.comments);
        }
      });
      this.setState({ text: event.target.value });
    }

  };

  deleteComment =(comment)=>{
    const userId=isAuthenticated().user._id;
    const token=isAuthenticated().token;
    const postId=this.props.postId;
    uncomment(userId,postId,token,comment).then( data => {
      if(data.error){
        console.log(data.error)
      }else{
        console.log(data)
        this.setState({
          text:""
        })
        this.props.updateComments(data.comments);
      }
    });

  }

  deletConfirmed=(comment)=>{
    let answer = window.confirm("Are you sure you want delete comment?")
    if(answer){
      this.deleteComment(comment)
    }
  }

  render(){
    const {comments}=this.props
    const {error}=this.state


    return(
      <div>
      <h2 className="mt-5 mb-5">Leave a comment</h2>
      <form onSubmit={this.addComment}>
      <div className="form-group">
      <input type="textarea" className="form-control"  onChange={this.handleRequest} value={this.state.text} placeholder="Leave a comment....."></input>
      <button className="btn btn-raised btn-success mt-1">POST</button>
      </div>
      </form>
      <div className="alert alert-danger" style={{display: error? "" : "none"}}>{error}</div>

      <div className="row">
      <div className="col-md-12">
      <h3 className="text-primary">{comments.length} Comments</h3>
      {comments.map( (comment,i) => {
        return(
          <div key={i}>
          <div  >
          <Link to={`/user/${comment.postedBy._id}`} alt={comment.postedBy.name}>
          <img className="float-left mr-2" height="30px" src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`} alt={comment.postedBy.name} onError={i=>(i.target.src=`${DefaultProfile}`)} />
          </Link>
          <div>
          <p className="lead">{comment.text}</p>
          </div>
          <p className="font-italic mark ">PostedBy:<Link  to={`/user/${comment.postedBy._id}`}>{comment.postedBy.name}</Link> on {new Date(comment.created).toDateString()}
          <> {isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id   && (

              <span onClick={()=>this.deletConfirmed(comment)} className="font-italic mark text-danger mr-1 float-right">
              Delete Comment
              </span>

            )}
            </>
            </p>
          </div>
          </div>
        )}
      )}
      </div>
      </div>
      </div>
    )
  }
}
export default Comment;
