// ProfileDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaLink } from 'react-icons/fa';
import WeSkillNavbar from './MainNavbar';

const ProfileDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/profiles/my-profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setProfile(response.data.profile);
        } else {
          setError('Profile not found');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-primary" onClick={() => navigate('/create-profile')}>
          Create Profile
        </button>
      </div>
    );
  }

  return (
    <>
      <WeSkillNavbar />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center">
                {profile.profilePhoto ? (
                  <img 
                    src={profile.profilePhoto} 
                    alt="Profile" 
                    className="rounded-circle mb-3" 
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="d-flex justify-content-center mb-3">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" 
                      style={{ width: '150px', height: '150px' }}>
                      <FaUser size={60} className="text-white" />
                    </div>
                  </div>
                )}
                <h3>{profile.fullName}</h3>
                <p className="text-muted">{profile.primarySkill}</p>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h4 className="mb-4">About Me</h4>
                <p>{profile.bio}</p>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <FaBriefcase className="me-3 text-primary" size={20} />
                      <div>
                        <h6 className="mb-0">Work Type</h6>
                        <p className="text-muted mb-0">
                          {profile.typeOfWork?.join(', ') || 'Not specified'}
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <FaGraduationCap className="me-3 text-primary" size={20} />
                      <div>
                        <h6 className="mb-0">Education</h6>
                        <p className="text-muted mb-0">
                          {profile.highestQualification} in {profile.fieldOfStudy}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <FaMapMarkerAlt className="me-3 text-primary" size={20} />
                      <div>
                        <h6 className="mb-0">Work Preference</h6>
                        <p className="text-muted mb-0">
                          {profile.preferredWorkLocation || 'Not specified'}
                        </p>
                      </div>
                    </div>

                    {profile.links?.length > 0 && (
                      <div className="d-flex align-items-center mb-3">
                        <FaLink className="me-3 text-primary" size={20} />
                        <div>
                          <h6 className="mb-0">Links</h6>
                          <div className="d-flex flex-wrap">
                            {profile.links.map((link, index) => (
                              <a 
                                key={index} 
                                href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="me-2 mb-1"
                              >
                                {new URL(link).hostname}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-end">
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/edit-profile')}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDashboard;