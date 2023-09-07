import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import MovieContext from '../context/MovieContext';

const ProtectedRoutesLogin=({redirectPath="/"})=> {
  const { token } = useContext(MovieContext);

  if (token==="") {
    return <Outlet/>
  }else{
    return <Navigate to={redirectPath}/>
  }
}

export default ProtectedRoutesLogin