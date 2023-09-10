import React from 'react'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:9000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // Save the authtoken and redirect
            localStorage.setItem('token', json.authtoken)
            localStorage.setItem("userName", json.data.user.name)
            props.showAlert("Logged in Successfully", "success")
            navigate("/");

        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <section className="" style={{ backgroundColor: '#eee', height: '100vh' }}>
            <div className="container  h-100">
                <div className="row d-flex justify-content-center align-items-center h-100" style={{ width: '140%', marginLeft: "-220px" }}>
                    <div class="col col-lg-9 col-xl-7">
                        <div class="card rounded-3"

                        >
                            <div class="card-body p-4" >
                                <div className='mt-3'>
                                    <h2>Login to continue to MindWrite</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                            <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name='email' aria-describedby="emailHelp" />
                                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                            <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name='password' />
                                        </div>

                                        <button type="submit" className="btn btn-success" >Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section >
    )
}

export default Login