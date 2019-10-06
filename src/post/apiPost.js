export const createPost = (userid,token,post)=>{
  console.log("post:",post)
  return fetch(`${process.env.REACT_APP_API_URL}/post/${userid}`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`
    },
    body:post
  })
  .then( response => {
    return response.json()
  })
  .catch(err=>console.log(err))
}

export const updatePost = (postid,token,post)=>{
  console.log("post:",post,'postidL: ',postid)
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postid}`,{
    method:"PUT",
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`
    },
    body:post
  })
  .then( response => {
    return response.json()
  })
  .catch(err=>console.log(err))
}



export const list = () =>{
  return fetch(`${process.env.REACT_APP_API_URL}/posts`,{
    method:"GET"
  })
  .then( response => {
    return response.json()
  }).catch(err=>console.log(err))
}

export const postsByUser = (userId,token) =>{
  return fetch(`${process.env.REACT_APP_API_URL}/post/by/${userId}`,{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    }
  })
  .then( response => {
    console.log(response)
    return response.json()
  }).catch(err=>console.log(err))
}


export const singlePost = (postId) =>{
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
    method:"GET"
  })
  .then( response => {
    return response.json()
  }).catch(err=>console.log(err))
}

export const remove =(postId,token) =>{
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
    method:"DELETE",
    headers:{
          Accept:"application/json",
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
    }
  })
  .then( response => {
    return response.json()
  }).catch(err=>console.log(err))
}

export const like =(userId,postId,token) =>{
  return fetch(`${process.env.REACT_APP_API_URL}/post/like`,{
    method:"PUT",
    headers:{
          Accept:"application/json",
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({postId:postId,userId:userId})
  })
  .then( response => {
    return response.json()
  }).catch(err=>console.log(err))
}


export const unlike =(userId,postId,token) =>{
  console.log("userId:",userId,"postId:",postId,"token:",token)
  return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`,{
    method:"PUT",
    headers:{
          Accept:"application/json",
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({postId:postId,userId:userId})
  })
  .then( response => {
    return response.json()
  }).catch(err=>console.log(err))
}

export const comment =(userId,postId,token,comment) =>{
  return fetch(`${process.env.REACT_APP_API_URL}/post/comment`,{
    method:"PUT",
    headers:{
          Accept:"application/json",
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({postId:postId,userId:userId,comment:comment})
  })
  .then( response => {
    return response.json()
  }).catch(err=>console.log(err))
}

export const uncomment =(userId,postId,token,comment) =>{
  console.log("comment:",comment)
  return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`,{
    method:"PUT",
    headers:{
          Accept:"application/json",
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({postId:postId,userId:userId,comment:comment})
  })
  .then( response => {
    return response.json()
  }).catch(err=>console.log(err))
}
