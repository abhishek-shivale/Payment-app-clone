import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Balance from '../components/Balance'
import Search from '../components/Search'


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
function edit (){

}
function Clear (){
  window.localStorage.clear()
  navigate('/signin')
}
  return (
    <div className='w-full'>
      <div className=' '>
        <div className='font-extrabold py-5 px-10 shadow-md shadow-black  flex justify-between mx-24 relative top-14'>
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
              <div ref={reff} className='border hidden bg-white cursor-auto absolute right-14 top-16 h-32 w-18 px-5  '>
              <button onClick={Clear} className='cursor-pointer border border-black px-5 my-2 py-3'>LogOut</button>
              <button onClick={edit} className='cursor-pointer border block border-black px-5 py-3'>Profile</button>
            </div>
            </div> 
          </div> 
        </div>
      </div>
      <Search />
    </div>
  )
}

export default Dashboard