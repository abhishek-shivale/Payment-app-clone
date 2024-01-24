import React, { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'


function authComponent(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate()

    
    const signupFunction = async()=>{
        if(firstName === '', lastName === '', email ==='', password ===''){return}
        const res = await fetch(`http://localhost:3000/api/v1/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                userName: email,
                password: password,
            }),

            });
        const data = await res.json()
        console.log(data.msg);
        setError(data.msg);
        if(res.status === 200){
         return navigate('/signin') 
        }
    }

    const signinFunction = async()=>{
      if(email ==='', password ===''){return}
      const res = await fetch(`http://localhost:3000/api/v1/user/signin`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              userName: email,
              password: password,
          }),

          });
      const data = await res.json()
      console.log(data);
      setError(data.msg);
      const token = data.token
      if(res.status === 200){
        window.localStorage.setItem('token',token)
       return navigate('/dashboard') 
      }
  }

  return (
<div className='flex justify-center items-center h-screen w-full'>
  <div className='bg-white border border-gray-300 rounded-lg p-8 max-w-md'>
    <div className='flex justify-center mb-4'>
      <h1 className='text-xl font-bold'>{props.title}</h1>
    </div>
    <div className='space-y-4'>
      {
        props.signup === true ? <><div>
        <label className='custom-text'>First Name:</label>
        <input required className='custom-class' type='text' placeholder='Enter First Name' onChange={(e)=>{setFirstName(e.target.value) }} value={firstName} />
      </div>
      <div>
        <label className='custom-text'>Last Name:</label>
        <input required className='custom-class' type='text' placeholder='Enter Last Name'
        onChange={(e)=>{setLastName(e.target.value) }} value={lastName}
        />
      </div> </> : <></>
      }
      <div>
        <label className='custom-text'>Email:</label>
        <input required className='custom-class' type='email' placeholder='Enter Email'
            onChange={(e)=>{setEmail(e.target.value) }} value={email}
        />
      </div>
      <div>
        <label className='custom-text'>Password:</label>
        <input required className='custom-class' type='password' placeholder='Enter Password'
        onChange={(e)=>{setPassword(e.target.value) }} value={password}
        />
      </div>
      <div className=''>
        <button onClick={props.signup === true ? signupFunction : signinFunction} className='bg-blue-500 block pl-28 pr-28 mb-2 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800'>
          Submit
        </button>
       {
        props.signup === true ? <> <p className='text-sm text-gray-600'>
        Already have an account? <Link to={'/signin'}><span className='underline cursor-pointer'>Signin</span></Link>
      </p></>:  <p className='text-sm text-gray-600'>
          Don't have an account?<Link to={'/signup'}><span className='underline cursor-pointer'>Signup</span></Link> 
        </p>
       }
        <p className='text-red-600 ml-5'><span>{error}</span></p>
      </div>
    </div>
  </div>
</div>

  )
}

export default authComponent