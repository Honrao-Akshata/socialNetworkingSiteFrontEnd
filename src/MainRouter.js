import React from "react";
import { Route, Switch } from "react-router-dom";
import {Home} from './core/Home';
import Menu from './core/Menu';
import {signout} from './auth/index';
import Signin from './user/Signin'
import Signup from './user/Signup';
import Profile from './user/Profile';
import Users from './user/Users';
import ForgotPassword from './user/ForgotPassword';
import EditProfile from './user/EditProfile';
import FindPeople from './user/FindPeople';
import PrivateRoute from './auth/PrivateRoute';
import NewPost from './post/NewPost';
import SinglePost from './post/SinglePost';
import EditPost from './post/EditPost';
import ResetPassword from './user/ResetPassword';

export const MainRouter = () => (
  <div>
  <Menu/>
  <Switch>
  <Route exact path="/users" component={Users}></Route>
  <Route exact path="/signin" component={Signin}></Route>
  <Route exact path="/signup" component={Signup}></Route>
  <Route exact path="/signout" component={signout}></Route>
  <Route exact path="/forgotPassword" component={ForgotPassword}></Route>
  <Route exact path="/user/:userid" component={Profile}></Route>
  <Route exact path="/post/:postId" component={SinglePost}></Route>
  <Route exact path="/reset-password/:token" component={ResetPassword}></Route>
  <PrivateRoute exact path="/create/:userid" component={NewPost}/>
  <PrivateRoute exact path="/user/findPeople/:userid" component={FindPeople}/>
  <PrivateRoute exact path="/user/edit/:userid" component={EditProfile}/>
  <PrivateRoute exact path="/post/edit/:postId" component={EditPost}/>
  <Route exact path="/" component={Home}></Route>
  </Switch>
  </div>
)
