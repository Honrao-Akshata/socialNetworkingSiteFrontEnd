import React,{Component} from 'react';
import {singlePost,updatePost} from './apiPost'
import { Redirect } from "react-router-dom";
import DefaultProfile from '../images/puppy.jpg';
import {isAuthenticated} from '../auth/index';

class EditPost extends Component{
  constructor(){
    super()
    this.state={
      post:"",
      id:"",
      title:"",
      body:"",
      error:"",
      loading:false,
      redirectToHome:false,
      fileSize:0
    }
  }
  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 100000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false
      });
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  }

  init=(postId)=>{
    // const token = isAuthenticated().token;
    this.setState({loading:true})
    singlePost(postId).then(data =>{
      if(data.error){console.log(data.error)}
      this.setState({
        id:data._id,
        title:data.title,
        body:data.body,
        loading:false,
        post:data,
        error:""})
      })
    }

    componentDidMount=()=>{
      this.postData = new FormData();
      this.setState({ user: isAuthenticated().user });
      const postId=this.props.match.params.postId
      this.setState({loading:true})
      this.init(postId)
    }

    editPostForm = (title, body) => (
      <form>
      <div className="form-group">
      <label className="text-muted">Post Photo</label>
      <input
      onChange={this.handleRequest("photo")}
      type="file"
      accept="image/*"
      className="form-control"
      />
      </div>
      <div className="form-group">
      <label className="text-muted">Title</label>
      <input onChange={this.handleRequest("title")} type="text" className="form-control"   value={title}            />
      </div>

      <div className="form-group">
      <label className="text-muted">Body</label>
      <textarea
      onChange={this.handleRequest("body")}
      type="text"
      className="form-control"
      value={body}
      />
      </div>

      <button
      onClick={this.clickSubmit}
      className="btn btn-raised btn-primary">
      Update Post
      </button>
      </form>
    );
    handleRequest = name => event => {
      this.setState({ error: "" });
      const value = name === "photo" ? event.target.files[0] : event.target.value;
      const fileSize = name === "photo" ? event.target.files[0].size : 0;
      this.postData.set(name, value);
      console.log(this.postData.get(name));
      this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
      event.preventDefault();
      this.setState({loading:true})

      if (this.isValid()) {
        const token = isAuthenticated().token;
        const postid=this.state.id;
        console.log(this.postData);
        updatePost(postid,token,this.postData).then(data => {
          if(data.error) this.setState({error:data.error})
          else{
            // console.log(this.postData)
            this.setState({
              loading:false,
              photo:"",
              title:"",
              body:"",
              redirectToHome:true
            })
          }
        })

      }
    }

    render(){
      const {title,body,id,redirectToHome,error,loading} = this.state
      if (redirectToHome) {
          return <Redirect to={`/`} />;
      }
      return(
        <div className="container">
        <h2 className="display-2 mt-5 mb-5">{title}</h2>
        <div className="alert alert-danger" style={{display: error? "" : "none"}}>{error}
        </div>
        {loading ? <div className="jumbotron text-centered"><h2>Loading.....</h2></div> : ""}
        <img style ={{height:"200px","width":"auto"}} className="img-thumbnail" src={`${process.env.REACT_APP_API_URL}/post/photo/${id}`}  onError={i=>(i.target.src=`${DefaultProfile}`)} alt={this.state.title}/>
        {this.editPostForm(title, body)}
        </div>
      )
    }
  }

  export default EditPost;
