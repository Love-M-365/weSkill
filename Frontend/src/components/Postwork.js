import React, { useState } from "react";
import { Card, CardContent } from "./Card";
import "bootstrap/dist/css/bootstrap.min.css";
import WeSkillNavbar from "./MainNavbar";
import { useNavigate } from "react-router-dom";

const PostWorkPage = () => {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    basic: { specs: "", time: "", amount: "" },
    standard: { specs: "", time: "", amount: "" },
    premium: { specs: "", time: "", amount: "" },
    skills: "",
    sample: "",
    contact:""
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const [pack, field] = name.split(".");
    if (pack === "basic" || pack === "standard" || pack === "premium") {
      setFormData({ ...formData, [pack]: { ...formData[pack], [field]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve profileId from localStorage
    const profileId = localStorage.getItem("profileId");
    if (!profileId) {
      alert("Profile ID not found. Please log in.");
      return;
    }

    // Include profileId in the submission data
    const dataToSubmit = { ...formData, profileId };

    try {
      const response = await fetch("https://weskill.onrender.com/api/works/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Work created successfully:", result);
        navigate("/job-seeker"); // Redirect to the job-seeker page
      } else {
        const error = await response.json();
        alert("Failed to create work: " + error.message);
      }
    } catch (error) {
      console.error("Error while submitting work:", error);
      alert("An error occurred while submitting the work.");
    }
  }
  return (
    <>
      <WeSkillNavbar></WeSkillNavbar>

      <div className="container mt-5">
        <Card>
          <CardContent>
            <h2 className="text-center mb-4">Post a Work</h2>
            <form onSubmit={handleSubmit} className="p-3">
              <div className="mb-3">
                <label className="form-label">Work Category</label>
                <select
                  className="form-control"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Content Writing">Content Writing</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Data Entry">Data Entry</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="App Development">App Development</option>
                  <option value="SEO Services">SEO Services</option>
                  <option value="Social Media Management">Social Media Management</option>
                  <option value="Virtual Assistance">Virtual Assistance</option>
                  <option value="Translation Services">Translation Services</option>
                  <option value="AI/ML Development">AI/ML Development</option>
                  <option value="Blockchain Development">Blockchain Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Game Development">Game Development</option>
                  <option value="Photography">Photography</option>
                  <option value="Voice Over">Voice Over</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Legal Consulting">Legal Consulting</option>
                  <option value="Education & Tutoring">Education & Tutoring</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  placeholder="Describe the work details..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                ></textarea>
              </div>

              {/* Basic Plan */}
              <div className="mb-3">
                <label className="form-label">Basic Pack Specifications</label>
                <input
                  type="text"
                  name="basic.specs"
                  className="form-control"
                  placeholder="Enter basic pack details"
                  value={formData.basic.specs}
                  onChange={handleChange}
                  required
                />
                <label className="form-label mt-2">Time for Completion (Days)</label>
                <input
                  type="number"
                  name="basic.time"
                  className="form-control"
                  placeholder=""
                  value={formData.basic.time}
                  onChange={handleChange}
                  required
                />
                <label className="form-label mt-2">Amount (₹)</label>
                <input
                  type="number"
                  name="basic.amount"
                  className="form-control"
                  placeholder="Enter amount for basic pack"
                  value={formData.basic.amount}
                  onChange={handleChange}
                  required
                />
              </div>

               {/* Standard Plan */}
               <div className="mb-3">
                            <label className="form-label">Standard Pack Specifications</label>
                            <input 
                                type="text" 
                                name="standard.specs"
                                className="form-control" 
                                placeholder="Enter standard pack details" 
                                value={formData.standard.specs} 
                                onChange={handleChange} 
                                required
                            />
                            <label className="form-label mt-2">Time for Completion (Days)</label>
                            <input 
                                type="number" 
                                name="standard.time"
                                className="form-control"
                                placeholder="" 
                                value={formData.standard.time} 
                                onChange={handleChange} 
                                required
                            />
                            <label className="form-label mt-2">Amount (₹)</label>
                            <input 
                                type="number" 
                                name="standard.amount"
                                className="form-control"
                                placeholder="Enter amount for standard pack" 
                                value={formData.standard.amount} 
                                onChange={handleChange} 
                                required
                            />
                        </div>

                        {/* Premium Plan */}
                        <div className="mb-3">
                            <label className="form-label">Premium Pack Specifications</label>
                            <input 
                                type="text" 
                                name="premium.specs"
                                className="form-control" 
                                placeholder="Enter premium pack details" 
                                value={formData.premium.specs} 
                                onChange={handleChange} 
                                required
                            />
                            <label className="form-label mt-2">Time for Completion (Days)</label>
                            <input 
                                type="number" 
                                name="premium.time"
                                className="form-control"
                                placeholder="" 
                                value={formData.premium.time} 
                                onChange={handleChange} 
                                required
                            />
                            <label className="form-label mt-2">Amount (₹)</label>
                            <input 
                                type="number" 
                                name="premium.amount"
                                className="form-control"
                                placeholder="Enter amount for premium pack" 
                                value={formData.premium.amount} 
                                onChange={handleChange} 
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Skills tags</label>
                            <input 
                                type="text" 
                                name="skills" 
                                className="form-control" 
                                placeholder="" 
                                value={formData.skills} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">links for Sample work</label>
                            <input 
                                type="text" 
                                name="sample"
                                className="form-control" 
                                placeholder="" 
                                value={formData.sample} 
                                onChange={handleChange} 
                                required
                            />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary w-100">Upload</button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
        </>
    );
};

export default PostWorkPage;