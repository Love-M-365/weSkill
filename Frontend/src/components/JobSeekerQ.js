import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeSkillNavbar from './MainNavbar';


export default function JobSeekerQ() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    workTypes: [],
    primarySkill: '',
    additionalSkill: '',
    additionalSkills: [],
    highestQualification: '',
    fieldOfStudy: '',
    preferredWorkLocation: '',
    resume: null,
    portfolio: '',
    about: '',
    freelancePreference: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWorkTypeChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      workTypes: prev.workTypes.includes(value)
        ? prev.workTypes.filter((item) => item !== value)
        : [...prev.workTypes, value],
    }));
  };

  const addSkill = () => {
    if (formData.additionalSkill && !formData.additionalSkills.includes(formData.additionalSkill)) {
      setFormData((prev) => ({
        ...prev,
        additionalSkills: [...prev.additionalSkills, prev.additionalSkill],
        additionalSkill: '',
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
      // Save form data, maybe to localStorage or API
      // After submission, navigate to profile page
      navigate('/profile');
    }
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
                    {/* Add more options */}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Additional Skills</label>
                  <select
                    style={{ display: 'block' }}
                    className="form-control"
                    name="additionalSkill"
                    value={formData.additionalSkill}
                    onChange={handleChange}
                  >
                    <option value="">Select skills</option>
                    <option value="webDevelopment">Web Development</option>
                    <option value="graphicDesign">Graphic Design</option>
                    {/* Add more options */}
                  </select>
                </div>

                <button type="button" className="btn btn-success" onClick={addSkill}>
                  Add Skill
                </button>

                <div className="mt-3">
                  {formData.additionalSkills.length > 0 && (
                    <div className="d-flex flex-wrap">
                      {formData.additionalSkills.map((skill, index) => (
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
                    value={formData.highestQualification}
                    onChange={handleChange}
                  >
                    <option value="">Select Qualification</option>
                    <option value="bachelor">Bachelor’s Degree</option>
                    <option value="master">Master’s Degree</option>
                    {/* Add more options */}
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
                    <option value="businessManagement">Business Management</option>
                    {/* Add more options */}
                  </select>
                </div>

                <h6>Preferred Work Location</h6>
                <div className="d-flex gap-2">
                  {['Remote', 'On-Site', 'Hybrid'].map((loc) => (
                    <div
                      key={loc}
                      className={`card p-3 ${formData.preferredWorkLocation === loc ? 'border-primary' : ''}`}
                      onClick={() => setFormData({ ...formData, preferredWorkLocation: loc })}
                    >
                      {loc}
                    </div>
                  ))}
                </div>
                <h6>Upload your Resume/CV</h6>
                <input type="file" className="form-control mt-2" onChange={handleFileChange} />
                <input
                  type="text"
                  className="form-control mt-2"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="Portfolio/Work Samples (URL)"
                />
                <textarea
                  className="form-control mt-2"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Tell us about your work"
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
