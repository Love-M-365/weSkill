import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeSkillNavbar from './MainNavbar';

export default function ProfileDashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:5001/api/profiles/getProfile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div className="text-center mt-5">Loading profile...</div>;

  return (
    <>
      <WeSkillNavbar />
      <div className="container mt-5">
        <div className="card shadow-sm p-4 border-0 rounded-4">
          <h2 className="text-center mb-4 text-primary">Your Profile</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <p><strong>Full Name:</strong> {profile.fullName}</p>
              <p><strong>Student ID:</strong> {profile.studentId}</p>
              <p><strong>College:</strong> {profile.college}</p>
              <p><strong>Year of Study:</strong> {profile.yearOfStudy}</p>
              <p><strong>Major:</strong> {profile.major}</p>
              <p><strong>Minor:</strong> {profile.minor || '-'}</p>
              <p><strong>Graduation Date:</strong> {new Date(profile.graduationDate).toLocaleDateString()}</p>
              <p><strong>GPA:</strong> {profile.gpa}</p>
            </div>
            <div className="col-md-6 mb-3">
              <p><strong>Technical Skills:</strong> {profile.technicalSkills}</p>
              <p><strong>Soft Skills:</strong> {profile.softSkills}</p>
              <p><strong>Certifications:</strong> {profile.certifications}</p>
              <p><strong>Languages:</strong> {profile.languages}</p>
              <p><strong>LinkedIn:</strong> <a href={profile.linkedIn} target="_blank" rel="noreferrer">Profile</a></p>
              <p><strong>Portfolio:</strong> <a href={profile.portfolio} target="_blank" rel="noreferrer">View</a></p>
              <p><strong>Bio:</strong> {profile.bio}</p>
              <p><strong>Resume:</strong> <a href={`https://localhost:5001/uploads/${profile.resume}`} target="_blank" rel="noreferrer">Download</a></p>
            </div>
          </div>

          {profile.badges && profile.badges.length > 0 && (
            <div className="mt-4">
              <h4 className="text-secondary mb-3">Achievements & Badges</h4>
              <div className="d-flex flex-wrap gap-2">
                {profile.badges.map((badge, index) => (
                  <span key={index} className="badge bg-success p-2 fs-6">
                    🏅 {badge}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
