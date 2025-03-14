import React from 'react';
import Navbar from './Navbar';
import image4 from './photos/image.png'


export default function LoginPage() {
  return (
    <div >
       <>
    <Navbar></Navbar>
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card shadow">
            <div className="card-body">
              <img src={image4} style={{
                height:"8rem",
                width: "8rem",
                display:"block",
                marginLeft:"auto",
                marginRight:"auto"
                
              }}/>
              <form>
             

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
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
                  Don't have an account ?{' '}
                  <a href="/login" className="text-decoration-none">
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
  )
}
