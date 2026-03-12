import React from 'react'
import {useContext,useRef} from 'react'
import {CounterContext} from '../contexts/CounterContext'
import { UserContext } from '../contexts/UserContext'
import { useEffect } from 'react'

function A() {
  let {counter1,counter2,changeCounter1,changeCounter2}=useContext(CounterContext)
  let {details,updateProfile}=useContext(UserContext)
  let inputRef=useRef(null)
  console.log('componentA rendered')
  useEffect(()=>{
    //side effect
    inputRef.current.focus();
  },[])
  return (
    <div className='bg-white-200 p-2.5 shadow-2xl w-60'>
      ComponentA
      <p>Counter1:{counter1}</p>
      <button onClick={changeCounter1} className='bg-amber-300 p-2 mt-2 rounded-2xl'>Change Counter</button><br/>
      <p>Counter2:{counter2}</p>
      <button onClick={changeCounter2} className='bg-amber-300 p-2 mt-2 rounded-2xl'>Change Counter</button>
      <p>User Name:{details.name}</p>
      <p>Age:{details.age}</p>
      <p>Email:{details.email}</p>
      <button onClick={updateProfile} className='bg-amber-300 p-2 mt-2 rounded-2xl'>Update User</button>
      <input ref={inputRef} type="text" className='my-2 border-2'/>
    </div>
  )
}

export default A