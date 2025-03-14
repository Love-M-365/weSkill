import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaBriefcase, FaComment, FaTags, FaUser } from 'react-icons/fa';
import WeSkillNavbar from './MainNavbar';
import image1 from "./photos/react.jpg";

const ProfilesPage = () => {
    const sampleProfiles = [{ 
        name: "Web Development", 
        image: image1, 
        description: "Develop websites and web applications", 
        profiles: [
            { name: "Rajesh Kumar", rating: 4.8, worksDone: 120, topComment: "Great work!", tags: ['ReactJS', 'Frontend', 'Web Developer'], description: "Expert in creating dynamic and responsive web applications." },
            { name: "Anjali Mehta", rating: 4.5, worksDone: 95, topComment: "Very professional!", tags: ['VueJS', 'JavaScript', 'Frontend Developer'], description: "Specialized in building user-friendly and interactive web designs." }
        ]
    }];

    const location = useLocation();
    const navigate = useNavigate();
    const { selectedField } = location.state || {};

    // Use sample profiles if no profiles are available
    const profilesToDisplay = selectedField?.profiles?.length ? selectedField.profiles : sampleProfiles[0].profiles;

    const handleProfileClick = (profile) => {
        navigate('/profile-details', { state: { profile } });
    };

    return (
        <>
        <WeSkillNavbar />
        <div className="container my-5">
            <h2 className="mb-4">{selectedField?.name || "Profiles you need"}</h2>
            <p>{selectedField?.description || "Explore some sample profiles to get started."}</p>

            <div>
                {profilesToDisplay.map((profile, index) => (
                    <div 
                        className="card shadow-sm p-3 mb-3 profile-card" 
                        key={index} 
                        onClick={() => handleProfileClick(profile)}
                    >
                        <div className="d-flex align-items-center">
                            <div className="profile-pic me-3">
                                <FaUser className="text-white" size={40} />
                            </div>

                            <div className="flex-grow-1">
                                <h5 className="mb-1">{profile.name}</h5>
                                <p className="text-muted mb-2" style={{ fontStyle: "italic" }}>
                                    {profile.description || "No description available"}
                                </p>
                                <div className="d-flex align-items-center text-muted mb-2">
                                    <FaStar className="text-warning me-1" size={18} />
                                    <span className="me-3">{profile.rating}</span>
                                    <FaBriefcase className="text-success me-1" size={18} />
                                    <span>{profile.worksDone} Works</span>
                                </div>
                                <p className="text-muted mb-2">
                                    <FaComment className="text-info me-1" size={16} />
                                    {profile.topComment}
                                </p>
                                <div className="d-flex flex-wrap">
                                    <FaTags className="text-secondary me-2" size={18} />
                                    {profile.tags.map((tag, i) => (
                                        <span key={i} className="badge bg-primary me-2 mb-1">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .profile-pic {
                    width: 60px;
                    height: 60px;
                    background-color: #007bff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                }
                .profile-card {
                    cursor: pointer;
                    transition: transform 0.2s ease-in-out;
                }
                .profile-card:hover {
                    transform: scale(1.03);
                }
                h5 {
                    font-weight: bold;
                    margin: 0;
                }
                .text-muted {
                    font-size: 0.9rem;
                }
            `}</style>
        </div>
        </>
    );
};

export default ProfilesPage;
