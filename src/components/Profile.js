import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MovieContext from '../context/MovieContext';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({})
  const { setToken } = useContext(MovieContext);


  useEffect(() => {
    if (localStorage.getItem('token') === "" || localStorage.getItem('token') === null) {
      navigate("/");
    } else {
      getUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getUser = () => {
    axios.get('/api/user', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then((r) => {
        setUser(r.data)
      })
      .catch((e) => {
        console.log(e)
      });
  }

  const logoutAction = () => {

    axios.post('/api/logout', {}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then((r) => {
        localStorage.setItem('token', "")
        setToken("");
        navigate("/login");
      })
      .catch((e) => {
        console.log(e)
      });
  }

  return (
    <div className="row justify-content-center w-100">
      <div className="col-12">
        <div className='m-5 pt-5 w-25 mx-auto'>
          <p className='fw-bold'>You are logged in</p>
          <button className='btn btn-info btn-lg text-white' onClick={() => logoutAction()}>Logout</button>
        </div>

        <h2 className="text-center mt-5">Welcome, {user.name}!</h2  >
      </div>
    </div>
  );
}

export default Profile