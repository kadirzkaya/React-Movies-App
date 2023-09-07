import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import user from '../img/user.png'
import MovieContext from '../context/MovieContext';

function Navbar() {
    const { token } = useContext(MovieContext);

    return (
        <div>
            <nav className="navbar bg-primary justify-content-center d-flex justify-content-around" data-bs-theme="dark">
                <span className='text-light fw-bold'>Movie App</span>
                <ul className='navbar-nav flex-row gap-5' >

                    {
                        token ? (
                            <>
                                <li className='nav-item'>
                                    <Link className='nav-link' to="/">Home</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to="/profile"><img src={user} alt='user' className='userIcon' /></Link>
                                </li>
                            </>) : (
                            <>
                                <li className='nav-item'>
                                    <Link className='nav-link' to="/register">Register</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to="/login">Login</Link>
                                </li></>)
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar