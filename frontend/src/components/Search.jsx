import axios from 'axios'
import React, { useState } from 'react'

function Search() {
    const [input, setInput] = useState('')
    const FeatchUser = async () => {
        const res = axios.post(``)
    }
  return (
    <div>
        <div>
            <input type="text" placeholder='Search User' onChange={(e)=>{setInput(e.target.value)}} value={input}/>
        </div>
    </div>
  )
}

export default Search