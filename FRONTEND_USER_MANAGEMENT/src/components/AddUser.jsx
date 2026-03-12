import React from 'react'
import {useForm} from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router'

function AddUser() {
  const {register,handleSubmit,formState}=useForm()
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const navigate = useNavigate()

  const onCreateUser=async(newUser)=>{
    console.log(newUser)
    setLoading(true)
    try{
      let res=await fetch("http://localhost:3000/user-api/users",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(newUser)
      });
      if(res.status===200)
        //user created it should navigate to users list
      navigate("/users-list")
      else{
        console.log(res);
        throw new Error("Error occured")
      } 
    }catch(err){
      console.log("err is",err)
      setError(err)
    }finally{
      setLoading(false)
    }
    if(loading===true)
      return <p className='text-3xl text-center text-orange-300'>Loading...</p>
    if(error===true)
      return <p className='text-3xl text-center text-orange-300'>Error...</p>
  }

  return (
    <div className='text-center bg-gray-100 shadow-2xl'>
      <h1 className='text-amber-300 text-2xl text-center '>Add New User</h1>
      {/* create user form */}
      <form onSubmit={handleSubmit(onCreateUser)} className='max-w-96 mx-auto mt-10'>
        <input type="text" {...register("name")} placeholder='Enter user name' className='mb-5 border text-2xl w-full'></input><br/>
        <input type="text" {...register("email")} placeholder='Enter your MailID' className='mb-5 border text-2xl w-full'></input>
        <input type="date" {...register("dateOfBirth")} placeholder='Enter date of birth' className='mb-5 border text-2xl w-full'></input>
        <input type="text" {...register("mobileNumber")} placeholder='Enter your phone number' className='mb-5 border text-2xl w-full'></input>
        <button type='submit' className='text-2xl bg-lime-400 text-lime-50 px-8 py-4'>Add User</button>
      </form>
    </div>
  )
}

export default AddUser