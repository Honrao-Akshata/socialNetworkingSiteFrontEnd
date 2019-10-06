import React,{Component} from 'react';
import {list} from './apiPost'
import { Link } from "react-router-dom";
import DefaultProfile from '../images/puppy.jpg';

class Posts extends Component{
  constructor(){
    super()
    this.state={
      posts:[],
      loading:false
    }
  }

  componentDidMount=()=>{
    this.setState({loading:true})
    list().then(data =>{
      if(data.error){console.log(data.error)}
      else{
        // console.log("data:",data  )
        this.setState({posts:data,loading:false})
      }
    })
  }


  renderPosts=(posts)=>{
    // console.log("posts:",posts);
    return(
      <div className="row">
    {posts.map((post,i) => {
      var postedId = post.postedBy?`/user/${post.postedBy._id}`:"";
      var postedByName = post.postedBy?post.postedBy.name:" Unknown";
      var postedAt = post.postedBy?post.created:" Unknown";
      // console.log(postedAt);
      return(
        <div className="card col-md-4"  key={i} style={{width: "18rem"}}>
        <div className="card-body">
        <img className="img-thumbnail mb-3" src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} onError={i=>(i.target.src=`${DefaultProfile}`)} alt={post.title}  style={{width:'100%',height:"200px",objectFit:"cover"}}/>
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body.substring(0,100)}</p>
        <p className="font-italic mark ">PostedBy:<Link  to={`${postedId}`}>{postedByName}</Link>on {new Date(postedAt).toDateString()}</p>
        <Link className="btn btn-raised btn-primary btn-sm" to={`/post/${post._id}`}>Read More</Link>
        </div>
        </div>
      )
    }
  )
}
    </div>
  )
}


render(){
  const {posts,loading}=this.state;
  return(
    <div>
    {loading ? (
        <div className="jumbotron text-center">
            <h2>Loading...</h2>
        </div>
    ) : (
        ""
    )}
    <div className="jumbotron">
    <h2 className="mt-5 mb-5">Recent Posts</h2>
    {this.renderPosts(posts)}

    </div>
    </div>
  )
}
}

export default Posts;
