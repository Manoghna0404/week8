import React, { useContext } from 'react'
import { CounterContext } from '../contexts/CounterContext'
import { useTest } from '../store/TestStore'

function C() {
  let {counter1,changeCounter1}=useContext(CounterContext)
  const y=useTest(state=>state.y)
  const incrementY=useTest(state=>state.incrementY)
  const user=useTest(state=>state.user)
  const updateUser=useTest(state=>state.updateUser)
  console.log('componentC rendered')
  return (
    <div className='bg-white-200 p-2.5 shadow-2xl w-60'>
      ComponentC
      <p>Y:{y}</p>
      <p>Counter1:{counter1}</p>
      <button onClick={incrementY} className='bg-amber-300 p-2 mt-2 rounded-2xl'>Increment Y</button><br/>
      <p>Name:{user.name}</p>
      <p>age:{user.age}</p>
      <button onClick={()=>updateUser('manoghna prasad')} className='bg-amber-300 p-2 mt-2 rounded-2xl'>Update User</button><br/>
    </div>
  )
}

export default C