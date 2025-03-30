import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import weskill from './photos/weskillremovedbg.png';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    gender: '',
    email: '',
    password: '',
    city: '',
    country: '',
    role: 'provider', 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("register response:", data); // Log the entire response data
        
        const { token } = data; // Extract the token from the parsed data
  
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('userId', data.user._id);
          localStorage.setItem('name', data.user.name);
          console.log("Token stored in localStorage:", token);
          if (data.profileId) {
            localStorage.setItem('profileId', data.profileId); 
            
        }
        } else {
          console.error("No token received in response.");
        }
        navigate('/welcomemsg')
      } else {
        setError(data.message || 'An unknown error ocurred'); // Error from the server
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div style={{ backgroundColor: 'whitesmoke' }}>
      <Navbar />
      <div className="container mt-5">
        <div className="card p-4">
          <h2 className="text-center mb-4">
            <img src={weskill} style={{ maxHeight: '10rem', maxWidth: '30rem', marginBottom: '2rem' }} alt="WeSkill Logo" />
            <br />
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="container">
              <div className="row g-3">
                <div className="col-sm-6 col-12">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6 col-12">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="provider">Provider</option>
                    <option value="seeker">Seeker</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn m-3 btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
