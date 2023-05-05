import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { MyContext } from '../context/context'

export default function ProtectRoute({children}) {
    const {user} =useContext(MyContext)

    if(!user){
        return children
    }else{
        return <Navigate to="/profile/:id" />
    }
  
}