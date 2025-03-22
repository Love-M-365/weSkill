import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import weskill from './photos/weskillremovedbg.png'

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    country: '',
    
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWorkTypeChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      workTypes: prev.workTypes.includes(value)
        ? prev.workTypes.filter((item) => item !== value)
        : [...prev.workTypes, value]
    }));
  };

  const addSkill = () => {
    if (formData.additionalSkill && !formData.additionalSkills.includes(formData.additionalSkill)) {
      setFormData((prev) => ({
        ...prev,
        additionalSkills: [...prev.additionalSkills, prev.additionalSkill],
        additionalSkill: ''
      }));
    }
  };
  
  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    } else {
      console.log('Form Submitted:', formData);
    }
  };

  return (
    <div style={{backgroundColor:"whitesmoke"}}>
      <Navbar></Navbar>
     
    <div className="container mt-5" >
      <div className="card p-4" >
       
        <h2 className="text-center mb-4"> <img src={weskill} style={{maxHeight:"10rem",maxWidth:"30rem",marginBottom:"2rem"}}></img><br></br>Register</h2>
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
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
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
    </div>
</div>
          <div className="text-center"><button style={{textAlign:"center"}}className='btn m-3 btn-success text-center' ><Link to="/aiquestions" style={{textDecoration:"none",color:"white"}}>Submit</Link></button></div>
          </form>
          </div>
          </div>
    </div>
  );
}
