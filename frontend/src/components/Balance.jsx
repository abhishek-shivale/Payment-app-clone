import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Balance() {
    const [balance, setBalance] = useState(0)
    const FetchBalance = async() =>{
        const token = window.localStorage.getItem('token')
        let sendData = {
            headers:{
                authorization: `Bearer ${token}`
            }
        }
        const res = await axios.get(`http://localhost:3000/api/v1/account/balance/`,sendData)
        const data = await res.data.balance
        setBalance(data)
    }
    useEffect(()=>{
        FetchBalance()
    },[])
  return (
    <div className=''>
        
        <h1>Your Balance: {balance}</h1>
    </div>
  )
}

export default Balance