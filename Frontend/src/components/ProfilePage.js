import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaBriefcase, FaTags, FaStar } from "react-icons/fa";
import WeSkillNavbar from "./MainNavbar";

const ProfileList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State for profiles and loading status
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current profile index

  // Get selectedField and answers from previous page
  const { selectedField, answers } = location.state || {
    selectedField: { name: "All Profiles", description: "Browse the best talent" },
    answers: {},
  };

  const fetchProfiles = async () => {
    try {
      setLoading(true);

      // Prepare the request payload
      const filters = {
        category: selectedField || "Web Development",
        ...(Object.keys(answers || {}).length > 0 && { filters: answers }),
      };

      console.log("Filters sent to API:", filters);

      // API call
      const response = await axios.post(
        "http://localhost:5000/api/profiles/filter",
        filters
      );

      console.log("Fetched profiles:", response.data);
      setProfiles(response.data || []); // Assuming response.data is the array of profiles
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setProfiles([]); // Handle empty state on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Handle navigation between profiles
  const handleNextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousProfile = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };
  const handleProfileClick = (profile) => {
    navigate('/profile-details', { state: { profileId: profile._id , userId: profile.userId} });
  };
  

  // Render rating stars
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          size={18}
          className={i <= rating ? "text-warning" : "text-muted"}
        />
      );
    }
    return <div className="d-flex align-items-center">{stars}</div>;
  };

  return (
    <>
      <WeSkillNavbar />
      <div className="container my-5">
        <h2 className="mb-4">{selectedField?.name || "Profiles you need"}</h2>
        <p>{selectedField?.description || "Explore some sample profiles to get started."}</p>

        {loading ? (
  <p className="text-center">Loading profiles...</p>
) : profiles.length > 0 ? (
  <div className="list-group">
    {profiles.map((profile, index) => (
      <div
        key={index}
        className="list-group-item list-group-item-action shadow-sm p-3 mb-3 profile-card"
        onClick={() => handleProfileClick(profile)}
      >
        <div className="d-flex align-items-center">
          <div className="profile-pic me-3">
            <FaUser className="text-white" size={40} />
          </div>
          <div className="flex-grow-1">
            <h5 className="mb-1">{profile.fullName}</h5>
            <p className="text-muted mb-2" style={{ fontStyle: "italic" }}>
              {profile.bio || "No bio available"}
            </p>
            <div className="d-flex align-items-center text-muted mb-2">
              <FaBriefcase className="text-success me-1" size={18} />
              <span>{profile.typeOfWork || "N/A"}</span>
            </div>

            {/* Display ratings */}
            <div className="d-flex align-items-center mb-2">
              <span className="me-2">Rating:</span>
              {renderRatingStars(profile.rating || 0)}
            </div>

            {/* Display preferred work location */}
            <p className="text-muted mb-2">
              Preferred Work Location: {profile.preferredWorkLocation || "N/A"}
            </p>

            {/* Display additional skills */}
            <div className="d-flex flex-wrap">
              <FaTags className="text-secondary me-2" size={18} />
              {profile.badges?.length > 0 ? (
                profile.badges.map((badge, i) => (
                  <span key={i} className="badge bg-primary me-2 mb-1">
                    {badge}
                  </span>
                ))
              ) : (
                <span className="text-muted">0 badges earned</span>
              )}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <p className="text-center">No profiles found.</p>
)}


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

export default ProfileList;
