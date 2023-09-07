import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import datas from '../../common';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform client-side validation (e.g., checking for empty fields)

    // Send a POST request to your server for admin login
    try {
      const response = await fetch(`${datas.domain}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Admin successfully logged in, handle the success (e.g., redirect to dashboard)
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        console.log('Admin logged in successfully');
        navigate('/home');
      } else {
        // Admin login failed, handle the error (e.g., display an error message)
        console.error('Admin login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Admin Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email or Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
