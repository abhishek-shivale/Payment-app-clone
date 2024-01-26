import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Sendmoney from './Sendmoney'

function Search() {
    const [users, setUser] = useState('')
    const [result, setResult] = useState([])
    const [value, setValue] = useState(false)
    const [ID,setID] = useState(null)
    const FeatchUser = async () => {
      const token = window.localStorage.getItem('token')
      let sendData = {
          headers:{
              authorization: `Bearer ${token}`
          }
      }
        const res = await axios.get(`http://localhost:3000/api/v1/user/bulk/?filter=${users}`,sendData)
      const data = await res.data;
      setResult(data.user)
    }
    function onclick (id){
      if(value===true){setValue(false)}
      else {setValue(true)}
      setID(id);
    }
    useEffect(()=>{
      if(users === ''|| users === null) return
      // const SET = setTimeout(()=>{
        FeatchUser()
      // },1000)
      // return clearTimeout(SET)
    },[users])
  return (
    <>

    <div className=' my-20 relative shadow-md shadow-black h-96 overflow-scroll '>
    <div className='flex justify-center border'>
    <input onChange={(e)=>{setUser(e.target.value)}} value={users} type="text" className='focus:outline-none border border-black h-12 w-[500px] mx-4' placeholder='Search user' />
    </div>
    <div className='flex justify-center'>
    <Sendmoney trigger={value} id={ID} />
    </div>
    <div className='px-10 my-4 h-full text-block border'>
    
    {
        result.map((use)=>(
          
          <div key={use.userName} className='flex justify-evenly shadow py-4 border my-2'>
            <div className='h-10 w-10 rounded-full overflow-hidden'>
              <img className='rounded-full overflow-hidden' src="https://images7.alphacoders.com/134/thumb-440-1343238.webp" alt="" />
            </div>
            <div>
              <p>
                {use.userName}
              </p>
            </div>
           
            <div>
                <button onClick={()=>{
                  onclick(use.id)
                }} 
                  className='py-1 px-4 bg-blue-500 border border-blue-500'>Send Money</button>
           </div>
          </div>
        ))
      }

    </div>

   </div>
   
   </>
  )
}

export default Search

// {result.map((use)=>{
//   // {console.log(use)}
//     <div key={use} className='flex justify-evenly bg-gray-500'>
//       <div className=''>
//         <p className='text-black'>ajskdsh</p>
//       {/* <img src='' /> */}
//       </div>
//       <div>
//         {use.userName}
//       </div>
//     </div>
//   })}