import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests
import WeSkillNavbar from './MainNavbar';
import { useAuth } from '../AuthContext';
export default function JobSeekerQ() {
  const { user } = useAuth();
  const userId = localStorage.getItem('userId');
  const name = localStorage.getItem('userName');
  const [step, setStep] = useState(1);
  const [formDataState, setFormDataState] = useState({
    fullName: "",
    typeOfWork: [],
    primarySkill: '',
    additionalSkill: '',
    additionalSkills: [],
    highestQualification: '',
    fieldOfStudy: '',
    preferredWorkLocation: '',
    profilePhoto: null,
    links: '',
    bio: '',
    freelancePreference: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormDataState({ ...formDataState, [e.target.name]: e.target.value });
  };

 
  const handleWorkTypeChange = (e) => {
    const value = e.target.value;
    setFormDataState(prev => ({
      ...prev,
      typeOfWork: [value] // Store as array with single selected value
    }));
  };

  const addSkill = () => {
    if (formDataState.additionalSkill && !formDataState.additionalSkills.includes(formDataState.additionalSkill)) {
      setFormDataState((prev) => ({
        ...prev,
        additionalSkills: [...prev.additionalSkills, prev.additionalSkill],
        additionalSkill: '',
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormDataState({ ...formDataState, profilePhoto: e.target.files[0] });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
     
   
        
        try {
          const token = localStorage.getItem('token');
          
          // Prepare data EXACTLY like Postman does
          const requestData = {
            userId: userId, // From your component state
            fullName: name,
            typeOfWork: formDataState.typeOfWork[0],
            primarySkill: formDataState.primarySkill,
            additionalSkills: formDataState.additionalSkills,
            highestQualification: formDataState.highestQualification,
            fieldOfStudy: formDataState.fieldOfStudy,
            preferredWorkLocation: formDataState.preferredWorkLocation,
            profilePhoto: formDataState.profilePhoto, // Can be URL or file path
            links: formDataState.links,
            bio: formDataState.bio
          };
      
          // Debug: Log the request data
          console.log('Submitting data:', JSON.stringify(requestData, null, 2));
      
          const response = await axios.post(
            'http://localhost:5000/api/profiles/create',
            requestData,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          );
      
          navigate('/job-seeker');
        } catch (error) {
          console.error('Full error details:', {
            message: error.message,
            response: error.response?.data,
            request: {
              url: error.config?.url,
              headers: error.config?.headers,
              data: error.config?.data
            },
            stack: error.stack
          });
          setError(error.response?.data?.message || 'Failed to create profile. Please check all fields.');
        }
      };
  };
  
  return (
    <div>
       <WeSkillNavbar></WeSkillNavbar>
      <div className="container mt-5">
        <div className="card p-4">
          <h2 className="text-center mb-4">Building Your Job-Seeker Profile</h2>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Work Type & Skills */}
            {step === 1 && (
              <div>
                <h5>What type of work are you looking for?</h5>
                <div className="d-flex justify-content-around">
                  <div
                    className={`card ${formDataState.typeOfWork.includes('part-time') ? 'border-primary' : ''}`}
                    style={{ width: '18rem', cursor: 'pointer' }}
                    onClick={() => handleWorkTypeChange({ target: { value: 'part-time' } })}
                  >
                    <div className="card-body text-center">
                      <h5 className="card-title">Part-Time</h5>
                      <p className="card-text">Looking for part-time work.</p>
                    </div>
                  </div>
                  <div
  className={`card ${formDataState.typeOfWork.includes('freelance') ? 'border-primary' : ''}`}
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
                    value={formDataState.primarySkill}
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
                    style={{ display: 'block' }}
                    className="form-control"
                    name="additionalSkill"
                    value={formDataState.additionalSkill}
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

                <button type="button" className="btn btn-success" onClick={addSkill}>
                  Add Skill
                </button>

                <div className="mt-3">
                  {formDataState.additionalSkills.length > 0 && (
                    <div className="d-flex flex-wrap">
                      {formDataState.additionalSkills.map((skill, index) => (
                        <div key={index} className="badge bg-danger m-1 p-2">
                          {skill}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Qualification & Work Preferences */}
            {step === 2 && (
              <div>
                <div className="mb-3">
                  <label className="form-label">Highest Qualification</label>
                  <select
                    className="form-control"
                    name="highestQualification"
                    value={formDataState.highestQualification}
                    onChange={handleChange}
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
                    value={formDataState.fieldOfStudy}
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
                  {['Remote', 'On-Site', 'Hybrid'].map((loc) => (
                    <div
                      key={loc}
                      className={`card p-3 ${formDataState.preferredWorkLocation === loc ? 'border-primary' : ''}`}
                      onClick={() => setFormDataState({ ...formDataState, preferredWorkLocation: loc })}
                    >
                      {loc}
                    </div>
                  ))}
                </div>
                <h6>Upload your Photo</h6>
                <input type="file" className="form-control mt-2" onChange={handleFileChange} />
                <input
                  type="text"
                  className="form-control mt-2"
                  name="links"
                  value={formDataState.links}
                  onChange={handleChange}
                  placeholder="links/Work Samples (URL)"
                />
                <textarea
                  className="form-control mt-2"
                  name="bio"
                  value={formDataState.bio}
                  onChange={handleChange}
                  placeholder="Tell us bio your work"
                ></textarea>
              </div>
            )}
            
            {/* Navigation buttons */}
            <div className="d-flex justify-content-between mt-4">
              {step > 1 && (
                <button type="button" className="btn btn-secondary" onClick={() => setStep(step - 1)}>
                  Back
                </button>
                
              )}
              <button type="submit" className="btn btn-primary">
                {step === 2 ? 'Submit' : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
