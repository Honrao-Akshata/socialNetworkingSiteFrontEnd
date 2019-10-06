export const read = (userid,token)=>{
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userid}`,{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
  })
  .then( response => {
    return response.json()
  }).catch(err=>console.log(err))
}

export const follow = (userId, token ,followId) => {
  //console.log("user:",user,"userid",userid)
  console.log("token:", token)
  return fetch( `${process.env.REACT_APP_API_URL}/user/follow` , {
    method:"PUT",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({ userId:userId,followId:followId})
  })
  .then( response => {
    return response.json({message:"Follwer added"})
  }).catch(err=>console.log(err))
}
export const unfollow = (userId, token ,unfollowId) => {
  //console.log("user:",user,"userid",userid)
  console.log("token:", token)
  return fetch( `${process.env.REACT_APP_API_URL}/user/unfollow` , {
    method:"PUT",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({ userId:userId,unfollowId:unfollowId})
  })
  .then( response => {
    return response.json({message:"Follwer added"})
  }).catch(err=>console.log(err))
}

export const update = (userid,token,user)=>{
  console.log("user:",user,"userid",userid)
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userid}`,{
    method:"PUT",
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`
    },
    body:user
  })
  .then( response => {
    return response.json()
  })
  .catch(err=>console.log(err))
}


export const findPeople = (userid,token)=>{
  console.log("userid",userid)
  return fetch(`${process.env.REACT_APP_API_URL}/user/findPeople/${userid}`,{
    method:"GET",
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`
    }
  })
  .then( response => {
    return response.json()
  })
  .catch(err=>console.log(err))
}

export const remove = (userid,token)=>{
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userid}`,{
    method:"DELETE",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
  })
  .then( response => {
    return response.json()
  }).catch(err=>console.log(err))
}

export const list = () =>{
  return fetch(`${process.env.REACT_APP_API_URL}/users`,{
    method:"GET"
  })
  .then( response => {
    return response.json()
  }).catch(err=>console.log(err))
}

export const updateUser = (user, next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
}

export const forgotPassword = (email)=>{
  console.log("email: ")
  return fetch(`${process.env.REACT_APP_API_URL}/forgotPassword`,{
    method:"PUT",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email:email})
  })
  .then( response => {
    return response.json()
  })
  .catch(err=>console.log(err))
}


export const resetPassword = (token,password)=>{
  return fetch(`${process.env.REACT_APP_API_URL}/resetPassword`,{
    method:"PUT",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify({resetPasswordLink:token,newPassword:password})
  })
  .then( response => {
    return response.json()
  }).catch(err=>console.log(err))
}
