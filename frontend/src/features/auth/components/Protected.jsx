import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const Protected = ({children}) => {
    const user = useSelector(state=> state.auth.user)
    const loading = useSelector(state=> state.auth.loading)

    if(!loading) {
        <h1>Loading...</h1>
    }

    if(!user) {
        <Navigate to="/login" />
    }
  return children
}

export default Protected