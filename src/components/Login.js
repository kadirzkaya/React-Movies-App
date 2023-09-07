import axios from 'axios';
import React, {  useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import MovieContext from '../context/MovieContext';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setToken } = useContext(MovieContext);




    const loginAction = (e) => {
        setValidationErrors({})
        e.preventDefault();
        setIsSubmitting(true)
        let payload = {
            email: email,
            password: password,
        }
        axios.post('/api/login', payload)
            .then((r) => {
                setIsSubmitting(false)
                localStorage.setItem('token', r.data.token)
                setToken(r.data.token)
                navigate("/");
            })
            .catch((e) => {
                setIsSubmitting(false)
                if (e.response.data.errors !== undefined) {
                    setValidationErrors(e.response.data.errors);
                }
                if (e.response.data.error !== undefined) {
                    setValidationErrors(e.response.data.error);
                }
            });
    }


    return (
        <div className="row justify-content-center mt-5 w-100">
            <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title mb-4">Sign In</h5>
                        <form onSubmit={(e) => { loginAction(e) }}>
                            {Object.keys(validationErrors).length !== 0 &&
                                <p className='text-center '><small className='text-danger'>Incorrect Email or Password</small></p>
                            }

                            <div className="mb-3">
                                <label
                                    htmlFor="email"
                                    className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="password"
                                    className="form-label">Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </div>
                            <div className="d-grid gap-2">
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="btn btn-primary btn-block">Login</button>
                                <p className="text-center">Don't have account? <Link className='link' to="/register">Register here</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login