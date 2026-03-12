import React from 'react'
import A from './components/A'
import B from './components/B'
import C from './components/C'


function App() {
  return (
    <div className='flex justify-around items-center mt-6'>
      {/* selector of A */}
        <A/>         
        <B/>
        <C/>
    </div>
  )
}

export default App