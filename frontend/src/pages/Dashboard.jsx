import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Balance from '../components/Balance'


function Dashboard() {
  const navigate = useNavigate()

const reff = useRef(null)
function ref (){
  const x = reff.current
  if(x.style.display === 'block'){
    x.style.display = 'none'
  }else{
    x.style.display = 'block'
  }
}
function Clear (){
  window.localStorage.clear()
  navigate('/signin')
}
  return (
    <div className=''>
      <div>
        <div className='font-extrabold flex justify-between mx-24 relative top-14'>
          <p className='text-3xl'>Payment App</p>
          <span>
            <div>
            <Balance />
            </div>
          </span>
          <div className='flex'>
            <p>Hello, User</p>
            <div className='rounded-full mx-5 bg-black cursor-pointer overflow-hidden h-10 w-10 hover: block' >
              <img className='scale-2 ' onClick={ref} src="https://www.sarkariexam.com/wp-content/uploads/2023/07/Solo-Leveling-Season-1-Release-Date-and-Time-Countdown-When-Is-It-Coming-Out.jpg" alt="" />
              <div ref={reff} className='border hidden cursor-auto absolute right-4 top-10 h-32 w-18'>
              <button onClick={Clear} className='cursor-pointer'>LogOut</button>
            </div>
            </div> 
          </div> 
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard