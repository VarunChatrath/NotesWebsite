import React from 'react'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = credentials
        const response = await fetch(`http://localhost:9000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })

        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // Save the authtoken and redirect
            localStorage.setItem('token', json.authtoken)
            localStorage.setItem("userName", json.data.user.name)
            navigate("/");
            props.showAlert("Account Created Successfully", "success")
        }
        else {
            props.showAlert("Invalid Details", "danger")
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
                            <div className='container mt-2'>
                                <h2 className='my-2'>Create an account to use MindWrite</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="my-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" name="name" className="form-control" id="name" onChange={onChange} aria-describedby="emailHelp" />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" name='email' className="form-control" id="email" onChange={onChange} aria-describedby="emailHelp" />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" name='password' minLength={5} required onChange={onChange} id="password" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                                        <input type="password" className="form-control" name='cpassword' minLength={5} required onChange={onChange} id="cpassword" />
                                    </div>

                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section >
    )
}

export default Signup