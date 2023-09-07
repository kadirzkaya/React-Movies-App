import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import MovieContext from '../context/MovieContext';

const ProtectedRoutes=({redirectPath="/login"})=> {
  const { token } = useContext(MovieContext);

  if (token==="") {
    return <Navigate to={redirectPath}/>

  }else{
    return <Outlet/>
  }
}

export default ProtectedRoutes