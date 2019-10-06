 import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {isAuthenticated} from '../auth/index';
import {read,update,updateUser} from './apiUser'
import DefaultProfile from '../images/user.jpeg';


class EditProfile extends Component {
  constructor (){
    super()
    this.state={
      id:"",
      name:"",
      email:"",
      password:"",
      redirectToProfile:false,
      error:"",
      about:"",
      fileSize:0,
      loading:false
    }
  }
  init=(userid)=>{
  const token = isAuthenticated().token;
    read(userid,token)
    .then( data => {
      if(data.error){
        //console.log(data.error)
        this.setState({redirectToProfile:true})
      }else{
      //console.log(data)
      this.setState({
        id:data._id,
        name:data.name,
        email:data.email,
        error:"",
        about:data.about
      })
      }
    })
  }
  handleRequest = name => event=>{
    const value = name === "photo" ? event.target.files[0] :event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.setState({error:""})
    this.userData.set(name,value);
    this.setState({[name]: value,fileSize:fileSize })

  }

  clickSubmit = event => {
    event.preventDefault();
    this.setState({loading:true})
    if(this.isValid()){
      // /const {name,email,password} = this.state;
      const token = isAuthenticated().token;
      const userid=this.props.match.params.userid;
      //console.log("userid:",userid)
      update(userid,token,this.userData).then(data => {
        if(data.error) this.setState({error:data.error})
        else{
          updateUser(data,()=>{
            this.setState({
            redirectToProfile:true
            })
          })

        }
      })
    }

  }

  componentDidMount(){
    this.userData=new FormData();
    const userid=this.props.match.params.userid
    this.init(userid)
  }
isValid=()=>{
  const {name,email,fileSize}=this.state
  if(name.length === 0){
    this.setState({error:"Name is required",loading:false})
    return false;
  }
  if(fileSize > 100000){
    this.setState({error:"File Size should be less than 100Kb",loading:false})
    return false;
  }
  if(email.length === 0){
    this.setState({error:"Email is required",loading:false})
    return false;
  }
  if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    this.setState({error:"Valid Email is required",loading:false})
    return false;
  }
  // if(password.length >= 1 &&  password.length <= 8 ){
  //   this.setState({error:"Password length should be in between 8-12"})
  //   return false;
  // }
  return true;
}
  signupform =(name,email,password,about) => {
    return(
      <form>
      <div className="form-group">
      <label className="text-muted">Upload Profile picture</label>
      <input onChange={this.handleRequest("photo")} type="file" className="form-control" accept="image/*"></input>
      </div>
      <div className="form-group">
      <label className="text-muted">Name</label>
      <input onChange={this.handleRequest("name")} type="text" className="form-control" value={name}></input>
      </div>
      <div className="form-group">
      <label className="text-muted">About</label>
      <textarea onChange={this.handleRequest("about")} type="text" className="form-control" value={about}></textarea>
      </div>
      <div className="form-group">
      <label className="text-muted">Email</label>
      <input onChange={this.handleRequest("email")} type="email" className="form-control" value={email}></input>
      </div>
      <div className="form-group">
      <label className="text-muted">Password</label>
      <input onChange={this.handleRequest("password")} type="password" className="form-control" value={password}></input>
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update</button>
      </form>
    )
  }
  render(){
    const {id,name,email,password,redirectToProfile,error,loading,about}=this.state
    if(redirectToProfile){
      return <Redirect  to={`/user/${id}`}/>
    }

    const photoUrl= id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}`: DefaultProfile ;

    return(
      <div className="container">
      <h2 className="mt-5 ml-5" >EditUser</h2>
      <div className="alert alert-danger" style={{display: error? "" : "none"}}>{error}
      </div>
      {loading ? <div className="jumbotron text-centered"><h2>Loading.....</h2></div> : ""}
      <img style ={{height:"200px","width":"auto"}} className="img-thumbnail" src={photoUrl} alt={this.state.name}/>
      {this.signupform(name,email,password,about)}
      </div>
    )
  }
}

export default EditProfile;
