import React from 'react'
import {Link , withRouter} from 'react-router-dom';
import {isAuthenticated , signout} from '../auth/index';

const isActive=(history,path)=>{
if (history.location.pathname === path) return {color: "#ff9900"}
else return {color: "#ffffff"}
};


const Menu= ({history}) => (
  <div >
  <ul className="nav nav-tabs bg-primary">
    <li className="nav-item">
    <Link className="nav-link " style={isActive(history,"/")}  to="/">Home</Link>
    </li>
    <li className="nav-item">
    <Link className="nav-link " style={isActive(history,"/users")}  to="/users">Users</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link "style={isActive(history,`/create/post`)} to={`/create/post}`}>create Posts </Link>
      </li>
    {!isAuthenticated() && (
      <>

      <li className="nav-item">
        <Link className="nav-link " style={isActive(history,"/signup")} to="/signup">singup</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link " style={isActive(history,"/signin")}  to="/signin">signin</Link>
      </li>

      </>
    )}
    {isAuthenticated() && (
    <>
      <li className="nav-item">
        <Link className="nav-link "style={isActive(history,`/user/findPeople/${isAuthenticated().user._id}`)} to={`/user/findPeople/${isAuthenticated().user._id}`}>FindPeople </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link "style={isActive(history,`/user/${isAuthenticated().user._id}`)} to={`/user/${isAuthenticated().user._id}`}>{`${isAuthenticated().user.name}'profile`} </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link "style={isActive(history,`/create/post`)} to={`/create/post}`}>create Posts </Link>
            </li>
          <li className="nav-item" >
            <span className="nav-link" style={isActive(history,"/signout"),{cursor:"pointer"},{color:"#fff"}} onClick={() => signout(() => {history.push("/")})}>Signout</span>
          </li>
    </>
    )}
  </ul>
  </div>
)
export default withRouter(Menu);
