import { UserContext } from "./UserContext";
import { useState } from "react";
import React from 'react'

function UserContextProvider({children}) {
    const [details,setDetails]=useState({
        name:"manoghna",
        age:20,
        email:"manu@gmail.com" 
    })

    const updateProfile=()=>{
        let result=({...details,name:"lakshmi manoghna"})
        setDetails(result)
        console.log(result)
    }
  return (
    <UserContext.Provider value={{details,updateProfile}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider