import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Sendmoney(props) {
    const [value, setValue] = useState(0)
    const navigate = useNavigate()
   async function onclick(){
    const token = window.localStorage.getItem('token');

    const sendData = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };
    
    const bodyData = {
       
        amount: value,
        to: props.id
       
    };
    try{
    const res = await axios.post(`http://localhost:3000/api/v1/account/transfer/`,bodyData,sendData)
    const data = await res.data.msg
        alert(data)
    }catch (err){
        console.log(err.message);
    }
     
    }
  return (
    props.trigger === true ?   
    <div className='h-64 w-80 absolute z-100 bg-gray-100 border border-black'>
        <div className='flex justify-center mt-10'>
            <input onChange={(e)=>{setValue(e.target.value)}} value={value} className='border border-black focus:outline-none' type="number" placeholder='Enter amount to send' />
        </div>
        <div>

        </div>
        <div className='flex justify-center mt-10'>
            <div>
            <p className='py-1 px-6'>CONFIRM</p>
            <button onClick={onclick} 
                  className='py-1 px-4 bg-blue-500 border border-blue-500'>Send Money</button>
            </div>
        </div>
    </div> 
    : <></> 
  )
}

export default Sendmoney