import React, { useState } from 'react';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    adminName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const { adminName, email, phoneNumber, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform client-side validation (e.g., checking for empty fields)

    // Send a POST request to your server for admin registration
    try {
      const response = await fetch('http://localhost:3001/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminName, email, phoneNumber, password }),
      });

      if (response.ok) {
        // Admin registration successful, handle the success (e.g., redirect to login page)
        console.log('Admin registered successfully');
      } else {
        // Admin registration failed, handle the error (e.g., display an error message)
        console.error('Admin registration failed');
        console.log(response);
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
              <h2 className="card-title text-center">Admin Registration</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="adminName">Admin Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="adminName"
                    name="adminName"
                    value={adminName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
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
                <button type="submit" className="btn btn-primary btn-block">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
