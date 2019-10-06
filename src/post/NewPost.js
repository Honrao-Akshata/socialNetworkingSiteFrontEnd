import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {isAuthenticated} from '../auth/index';
import {createPost} from './apiPost'



class NewPost extends Component {
 constructor (){
   super()
   this.state={
     title:"",
     body:"",
     user:{},
     error:"",
     photo:"",
     fileSize:0,
     loading:false,
     redirectToProfile:false
   }
 }

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
  const token = isAuthenticated().token;
     const userid=isAuthenticated().user._id;
     console.log(this.postData);
     createPost(userid,token,this.postData).then(data => {
       if(data.error) this.setState({error:data.error})
       else{
          // console.log(this.postData)
          this.setState({
            loading:false,
            photo:"",
            title:"",
            body:"",
            redirectToProfile:true

          })
       }
     })


 }

 componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }


newPostForm = (title, body) => (
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
            Create Post
        </button>
    </form>
);

 render(){
   const {
            title,
            body,
            user,
            error,
            loading,
            redirectToProfile
        } = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${user._id}`} />;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create a new post</h2>
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

                {this.newPostForm(title, body)}
            </div>
        );
 }
}

export default NewPost;
