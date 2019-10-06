import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import DefaultProfile from '../images/user.jpeg';
class ProfileTabs extends Component{
  render(){
    const {followers,following,posts}=this.props;
    return (
      <div>

      <div className="row">
      <div className="col-md-4">
      <h3 className="text-primary">FOLLOWERS</h3>
      <hr/>

      {followers.map( (person,i) => {
        return(
          <div key={i}>
          <div >
          <Link to={`/user/${person._id}`}>
          <img className="float-left mr-2" height="30px" src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`} alt={person.name} onError={i=>(i.target.src=`${DefaultProfile}`)} />
          <div className="lead">{person.name}</div>
          </Link>
          <p style={{clear : 'both'}}>
          {person.about}</p>
          </div>
          </div>

        )}
      )}

      </div>
      <div className="col-md-4">
      <h3 className="text-primary">FOLLOWING</h3>
      <hr/>

      {following.map( (person,i) => {
        return(
          <div key={i}>
          <div >
          <Link to={`/user/${person._id}`}>
          <img className="float-left mr-2" height="30px" src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`} alt={person.name} onError={i=>(i.target.src=`${DefaultProfile}`)} />
          <div className="lead">{person.name}</div>
          </Link>
          <p style={{clear : 'both'}}>
          {person.about}</p>
          </div>
          </div>

        )}
      )}
      </div>
      <div className="col-md-4">
      <h3 className="text-primary">POSTS</h3>
      <hr/>
      {posts.map( (post,i) => {
        return(
          <div key={i}>
          <div >
          <Link  to={`/post/${post._id}`}>
          <div className="lead">{post.title}</div>
          <img className="float-left mr-2" height="30px" src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}  alt={post.title} onError={i=>(i.target.src=`${DefaultProfile}`)} />

          <p >{post.body.substring(0,100)}</p>
          </Link>
          </div>
          </div>
        )}
      )}
      </div>
      </div>
      </div>
    )}
}
export default ProfileTabs;
