import React from 'react'
import { useAuth } from '../hooks/useAuth'
// import { useNavigate } from 'react-router'
import { Navigate } from 'react-router'

const Protected = ({children}) => {

    // const navigate = useNavigate()

    const {loading,user} = useAuth()

    if(loading){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    
    if(!user){
        return <Navigate to={'/login'} />
    }

    return children
}

export default Protected