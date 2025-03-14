import React, { useState } from 'react';
import { Card, CardContent } from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeSkillNavbar from './MainNavbar';
import { Link } from 'react-router-dom';

const PostWorkPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        basic: { specs: '', time: '', amount: '' },
        standard: { specs: '', time: '', amount: '' },
        premium: { specs: '', time: '', amount: '' },
        skills: '',
        contact: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [pack, field] = name.split('.');
        if (pack === 'basic' || pack === 'standard' || pack === 'premium') {
            setFormData({ ...formData, [pack]: { ...formData[pack], [field]: value } });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Data:', formData);
    };

    return (
        <>
        <WeSkillNavbar></WeSkillNavbar>
        
        <div className="container mt-5">
            <Card>
                <CardContent>
                    <h2 className="text-center mb-4">Post a Work</h2>
                    <form onSubmit={handleSubmit} className="p-3">
                        <div className="mb-3">
                            <label className="form-label">Work Title</label>
                            <input 
                                type="text" 
                                name="title" 
                                className="form-control" 
                                placeholder="Enter work title" 
                                value={formData.title} 
                                onChange={handleChange} 
                                required
                            />
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

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary w-100"><Link to="/job-seeker" style={{textDecoration:"none",color:"white"}} >Upload</Link></button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
        </>
    );
};

export default PostWorkPage;
