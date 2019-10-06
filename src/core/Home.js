import React from 'react'
import Posts from '../post/Posts';

export const Home= () => (
  <div>
  <div className="jumbotron">
  <h2>Home</h2>
  <p className="lead">Welcome to react frontEnd</p>
  </div>
  <div className="container">
    <Posts />
  </div>
  </div>
)
