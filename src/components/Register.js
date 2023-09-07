import React, {  useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieContext from '../context/MovieContext';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setToken } = useContext(MovieContext);




  const registerAction = (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    let payload = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword
    }
    axios.post('/api/register', payload)
      .then((r) => {
        setIsSubmitting(false)
        localStorage.setItem('token', r.data.token)
        setToken(r.data.token)
        navigate("/login");
      })
      .catch((e) => {
        setIsSubmitting(false)
        if (e.response.data.errors !== undefined) {
          setValidationErrors(e.response.data.errors);
        }
      });
  }

  return (
    <div className="row justify-content-center mt-5 w-100">
      <div className="col-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-4">Register</h5>
            <form onSubmit={(e) => registerAction(e)}>
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="form-label">Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => { setName(e.target.value) }}
                />
                {validationErrors.name !== undefined &&
                  <div className="flex flex-col">
                    <small className="text-danger">
                      {validationErrors.name[0]}
                    </small >
                  </div>
                }

              </div>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label">Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                />
                {validationErrors.email !== undefined &&
                  <div className="flex flex-col">
                    <small className="text-danger">
                      {validationErrors.email[0]}
                    </small >
                  </div>
                }

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
                  onChange={(e) => setPassword(e.target.value)}
                />
                {validationErrors.password !== undefined &&
                  <div className="flex flex-col">
                    <small className="text-danger">
                      {validationErrors.password[0]}
                    </small >
                  </div>
                }
              </div>
              <div className="mb-3">
                <label
                  htmlFor="confirm_password"
                  className="form-label">Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm_password"
                  name="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-primary btn-block">Register Now
                </button>
                <p
                  className="text-center">Have already an account <Link className='link' to="/">Login here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register