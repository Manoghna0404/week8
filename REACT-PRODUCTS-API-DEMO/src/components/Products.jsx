import React from 'react'
import {useLocation} from 'react-router'

function Products() {

  const {state}=useLocation()
  console.log(state?.products)
  return (
    <div className='flex justify-between p-10 flex-col sm:flex-row'>
        <div className='w-2/5 mt-10'>
          <img src={state?.products?.image} className='w-60'/>
        </div>
        <div className='w-3/5 p-2 sm:p-10 mt-10'>
          <p><span className='font-bold'>Title:</span>{state?.products?.title}</p>
          <p><span className='font-bold'>Description:</span>{state?.products?.description}</p>
          <p><span className='font-bold'>Price:</span>{state?.products?.price}</p>
          <p><span className='font-bold'>Category:</span>{state?.products?.category}</p>
        </div>
    </div>
  )
}

export default Products