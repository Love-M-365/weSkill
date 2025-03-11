import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

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
    userType: '', // job seeker or job provider
    workTypes: [], // full-time, part-time, freelance (multiple options)
    primarySkill: '',
    additionalSkill:'',
    additionalSkills: [], // list of additional skills
    companyName: '',
    companyIndustry: ''
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
    <div>
      <Navbar></Navbar>
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="text-center mb-4">Register for WeSkill</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
        
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
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
              <div className="mb-3">
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
          )}

          {step === 2 && (
            <div>
              <h4>What type of user are you?</h4>
              <div className="d-flex justify-content-around">
                <div
                  className={`card ${formData.userType === 'job-seeker' ? 'border-primary' : ''}`}
                  style={{ width: '18rem', cursor: 'pointer' }}
                  onClick={() => setFormData({ ...formData, userType: 'job-seeker' })}
                >
                  <div className="card-body text-center">
                    <h5 className="card-title">Job Seeker</h5>
                    <p className="card-text">Looking for a job? Join us as a job seeker.</p>
                  </div>
                </div>
                <div
                  className={`card ${formData.userType === 'job-provider' ? 'border-primary' : ''}`}
                  style={{ width: '18rem', cursor: 'pointer' }}
                  onClick={() => setFormData({ ...formData, userType: 'job-provider' })}
                >
                  <div className="card-body text-center">
                    <h5 className="card-title">Job Provider</h5>
                    <p className="card-text">Looking for talents? Join us as a job provider.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && formData.userType === 'job-seeker' && (
            <div>
             
              <h5>What type of work are you looking for?</h5>
              <div className="d-flex justify-content-around">
               
                <div
                  className={`card ${formData.workTypes.includes('part-time') ? 'border-primary' : ''}`}
                  style={{ width: '18rem', cursor: 'pointer' }}
                  onClick={() => handleWorkTypeChange({ target: { value: 'part-time' } })}
                >
                  <div className="card-body text-center">
                    <h5 className="card-title">Part-Time</h5>
                    <p className="card-text">Looking for part-time work.</p>
                  </div>
                </div>
                <div
                  className={`card ${formData.workTypes.includes('freelance') ? 'border-primary' : ''}`}
                  style={{ width: '18rem', cursor: 'pointer' }}
                  onClick={() => handleWorkTypeChange({ target: { value: 'freelance' } })}
                >
                  <div className="card-body text-center">
                    <h5 className="card-title">Freelance</h5>
                    <p className="card-text">Looking for freelance work.</p>
                  </div>
                </div>
              </div>

              <div className="mb-3">
  <label className="form-label">Primary Skill/Profession</label>
  <select
    className="form-control"
    name="primarySkill"
    value={formData.primarySkill}
    onChange={handleChange}
  >
    <option value="">Select a Profession</option>
    <option value="developer">Software Developer</option>
    <option value="designer">Graphic Designer</option>
    <option value="writer">Content Writer</option>
    <option value="marketing">Digital Marketer</option>
    <option value="teacher">Teacher</option>
    <option value="freelancer">Freelancer</option>
    <option value="engineer">Engineer</option>
    <option value="doctor">Doctor</option>
    <option value="lawyer">Lawyer</option>
    <option value="accountant">Accountant</option>
    <option value="business">Entrepreneur</option>
    <option value="photographer">Photographer</option>
    <option value="artist">Artist</option>
    <option value="musician">Musician</option>
    <option value="chef">Chef</option>
    <option value="consultant">Consultant</option>
    <option value="dataAnalyst">Data Analyst</option>
    <option value="productManager">Product Manager</option>
    <option value="salesManager">Sales Manager</option>
    <option value="mechanic">Mechanic</option>
    <option value="nurse">Nurse</option>
    <option value="scientist">Scientist</option>
    <option value="socialWorker">Social Worker</option>
    <option value="architect">Architect</option>
    <option value="pilot">Pilot</option>
    <option value="actor">Actor</option>
    <option value="fashionDesigner">Fashion Designer</option>
    <option value="fitnessTrainer">Fitness Trainer</option>
  </select>
</div>

              <div className="mb-3">
  <label className="form-label">Additional Skills</label>
  <select
    style={{ display: "block" }}
    className="form-control drop-down"
    name="additionalSkill"
    value={formData.additionalSkill}
    onChange={handleChange}
    
  > 
    <option value="">Select skills</option>
    <option value="webDevelopment">Web Development</option>
    <option value="graphicDesign">Graphic Design</option>
    <option value="contentWriting">Content Writing</option>
    <option value="seo">SEO & Digital Marketing</option>
    <option value="dataAnalysis">Data Analysis</option>
    <option value="machineLearning">Machine Learning</option>
    <option value="cyberSecurity">Cybersecurity</option>
    <option value="videoEditing">Video Editing</option>
    <option value="uxDesign">UX/UI Design</option>
    <option value="cloudComputing">Cloud Computing</option>
    <option value="projectManagement">Project Management</option>
    <option value="socialMediaManagement">Social Media Management</option>
    <option value="businessStrategy">Business Strategy</option>
    <option value="networking">Networking</option>
    <option value="gameDevelopment">Game Development</option>
    <option value="blockchain">Blockchain Development</option>
    <option value="devOps">DevOps</option>
    <option value="photography">Photography</option>
    <option value="illustration">Illustration</option>
    <option value="videoProduction">Video Production</option>
  </select>
</div>

              <button
                type="button"
                className="btn btn-success"
                onClick={addSkill}
              >
                Add Skill
              </button>

              <div className="mt-3">
                {formData.additionalSkills.length > 0 && (
                  <div>
                    
                    <div className="d-flex flex-wrap">
                      {formData.additionalSkills.map((skill, index) => (
                        <div key={index} className="badge bg-danger m-1 p-2">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {step === 4 && formData.userType === "job-seeker" && (
            <div>
           
              <div className="mb-3">
  <label className="form-label">Highest Qualification</label>
  <select
    className="form-control"
    name="highestQualification"
    value={formData.highestQualification}
    onChange={handleChange}
    required
  >
    <option value="">Select Qualification</option>
    <option value="highSchool">High School (10th)</option>
    <option value="intermediate">Intermediate (12th)</option>
    <option value="diploma">Diploma</option>
    <option value="bachelor">Bachelor’s Degree</option>
    <option value="master">Master’s Degree</option>
    <option value="phd">Ph.D.</option>
    <option value="mba">MBA</option>
    <option value="btech">B.Tech/B.E.</option>
    <option value="mtech">M.Tech/M.E.</option>
    <option value="mbbs">MBBS</option>
    <option value="ca">Chartered Accountant (CA)</option>
    <option value="law">Law (LLB/LLM)</option>
    <option value="others">Others</option>
  </select>
</div>
<div className="mb-3">
  <label className="form-label">Field of Study</label>
  <select
    className="form-control"
    name="fieldOfStudy"
    value={formData.fieldOfStudy}
    onChange={handleChange}
  >
    <option value="">Select Field of Study</option>
    <option value="computerScience">Computer Science</option>
    <option value="engineering">Engineering</option>
    <option value="businessManagement">Business Management</option>
    <option value="medicine">Medicine</option>
    <option value="law">Law</option>
    <option value="arts">Arts & Humanities</option>
    <option value="socialSciences">Social Sciences</option>
    <option value="finance">Finance & Accounting</option>
    <option value="marketing">Marketing</option>
    <option value="psychology">Psychology</option>
    <option value="education">Education</option>
    <option value="architecture">Architecture</option>
    <option value="design">Design & Fine Arts</option>
    <option value="dataScience">Data Science & Analytics</option>
    <option value="physics">Physics</option>
    <option value="chemistry">Chemistry</option>
    <option value="biology">Biology</option>
    <option value="mathematics">Mathematics</option>
    <option value="economics">Economics</option>
    <option value="nursing">Nursing</option>
    <option value="philosophy">Philosophy</option>
    <option value="politicalScience">Political Science</option>
    <option value="history">History</option>
    <option value="environmentalScience">Environmental Science</option>
    <option value="mediaStudies">Media Studies</option>
    <option value="hospitality">Hospitality & Tourism</option>
    <option value="agriculture">Agriculture</option>
    <option value="biotechnology">Biotechnology</option>
  </select>
</div>

              <h6>Preferred Work Location</h6>
              <div className="d-flex gap-2">
                {["Remote", "On-Site", "Hybrid"].map((loc) => (
                  <div key={loc} className={`card p-3 ${formData.preferredWorkLocation === loc ? "border-primary" : ""}`} onClick={() => setFormData({ ...formData, preferredWorkLocation: loc })}>
                    {loc}
                  </div>
                ))}
              </div>
              <h6>Upload your Resume/CV</h6>
              <input type="file" className="form-control mt-2" onChange={handleFileChange} />
              <input type="text" className="form-control mt-2" name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="Portfolio/Work Samples (URL)" />
              <textarea className="form-control mt-2" name="about" value={formData.about} onChange={handleChange} placeholder="Tell us about your work"></textarea>
              <h6>Comfortable with Freelance/Contract Work?</h6>
              <div className="d-flex gap-3">
                <div className={`card p-3 ${formData.freelancePreference === "yes" ? "border-primary" : ""}`} onClick={() => setFormData({ ...formData, freelancePreference: "yes" })}>
                  Yes
                </div>
                <div className={`card p-3 ${formData.freelancePreference === "no" ? "border-primary" : ""}`} onClick={() => setFormData({ ...formData, freelancePreference: "no" })}>
                  No
                </div>
              </div>
            </div>
          )}
          {step === 3 && formData.userType === 'job-provider' && (
            <div>
              <h4>Job Provider Information</h4>
              <div className="mb-3">
                <label className="form-label">Company/Organization Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Company Industry</label>
                <input
                  type="text"
                  className="form-control"
                  name="companyIndustry"
                  value={formData.companyIndustry}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between mt-4">
            
            {step > 1 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="btn btn-primary"
            >
              {step === 4 ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
