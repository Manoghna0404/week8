import React from 'react'
import { useContext } from 'react'
import { CounterContext } from '../contexts/CounterContext'
import { UserContext } from '../contexts/UserContext'
import { useTest } from '../store/TestStore'
function B() {
  let {counter1,changeCounter1}=useContext(CounterContext)
  let {details,updateProfile}=useContext(UserContext)
  const x=useTest(state=>state.x)
  const  incrementX=useTest(state=>state.incrementX)
  const incrementValue=useTest(state=>state.incrementXByValue)
  console.log('componentB rendered')
  return (
    <div className='bg-white-200 p-2.5 shadow-2xl w-60'>
      ComponentB
      <p>X:{x}</p>
      <p>Counter1:{counter1}</p>
      <button onClick={incrementX} className='bg-amber-300 p-2 mt-2 rounded-2xl'>Increment X</button><br/>
      <button onClick={()=>{incrementValue(20)}} className='bg-amber-300 p-2 mt-2 rounded-2xl'>Increment By Value</button>
      <p>User Name:{details.name}</p>
      <p>Age:{details.age}</p>
      <p>Email:{details.email}</p>
      <button onClick={updateProfile} className='bg-amber-300 p-2 mt-2 rounded-2xl'>Update User</button>
    </div>
  )
}

export default B