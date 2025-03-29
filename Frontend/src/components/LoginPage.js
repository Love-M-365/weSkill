import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import image4 from './photos/image.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json(); // This contains the parsed response JSON
      
      if (response.ok) {
        console.log("Login response:", data); // Log the entire response data
        
        const { token } = data; // Extract the token from the parsed data
  
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('name', data.user.name);
          console.log("Token stored in localStorage:", token);
          if (data.profileId) {
            localStorage.setItem('profileId', data.profileId); 
            
        }
        } else {
          console.error("No token received in response.");
        }
        navigate('/dashboard')
      } else {
        setError(data.message || 'Invalid email or password'); // Error from the server
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.'); // Handle other errors
    }
  };
  
  return (
    <div>
      <>
        <Navbar />
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10">
              <div className="card shadow">
                <div className="card-body">
                  <img
                    src={image4}
                    alt="Login Icon"
                    style={{
                      height: '8rem',
                      width: '8rem',
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  />
                  {error && (
                    <div className="alert alert-danger text-center" role="alert">
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </form>
                  <div className="text-center mt-3">
                    <p className="small">
                      Don't have an account?{' '}
                      <a href="/register" className="text-decoration-none">
                        Register here
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
