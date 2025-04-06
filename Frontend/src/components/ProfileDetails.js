import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { FaStar, FaBriefcase, FaCheckCircle, FaUser } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import WeSkillNavbar from './MainNavbar';
import TaskCard from './taskCard';
import Toast from './ToastMessage';
import axios from 'axios';


const ProfileDetails = () => {
  const [toast, setToast] = useState(null);
  const [profile, setProfile] = useState(null);
  const [works, setWorks] = useState([]);
  const [pricingDetails, setPricingDetails] = useState([]);
  const [comments,setComments]=useState([]);
  const location = useLocation();
  const { profileId } = location.state || {};
  let navigate=useNavigate();
  const userId =localStorage.getItem('userId');
  const userName =localStorage.getItem('name');


  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };
  useEffect(() => {
      if (profileId) {
        axios.get(`https://weskill.onrender.com/api/comments/comments/${profileId}`)
          .then(response => setComments(response.data))
          .catch(error => console.error('Error fetching comments:', error));
      }
    }, [profileId]);
  console.log(profileId)
  useEffect(() => {
    // Fetch Profile Details and Works
    const fetchProfileData = async () => {
      try {
        const profileResponse = await axios.get(`https://weskill.onrender.com/api/profiles/${profileId}`);
        setProfile(profileResponse.data);
        console.log(profileResponse.data)
        const worksResponse = await axios.get(`https://weskill.onrender.com/api/works/${profileId}`);
        setWorks(worksResponse.data);
        console.log(worksResponse.data)
        const pricing = worksResponse.data.map((work) => ({
            level: work.category,
            price: {
              basic: `₹${work.basic.amount}`,
              standard: `₹${work.standard.amount}`,
              premium: `₹${work.premium.amount}`,
            },
            time: {
              basic: `${work.basic.time} days`,
              standard: `${work.standard.time} days`,
              premium: `${work.premium.time} days`,
            },
            features: {
              basic: work.basic.specs,
              standard: work.standard.specs,
              premium: work.premium.specs,
            },
          }));
          setPricingDetails(pricing);
      } catch (error) {
        showToast('error', 'Failed to fetch profile details or works.');
        console.error('Error:', error);
      }
    };

    if (profileId) fetchProfileData();
  }, [profileId]);

  if (!profile) {
    return (
      <div className="container my-5 text-center">
        <p>Loading profile details...</p>
      </div>
    );
  }


  return (
    <>
      <WeSkillNavbar />
      <div className="container my-5">
        {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

        <div className="card border-0 p-4 mb-4 shadow-sm">
          <div className="d-flex align-items-center mb-4">
            <div className="profile-pic me-3">
              <FaUser size={50} />
            </div>
            <div>
              <h2 className="mb-1">{profile.fullName}</h2>
              <div className="d-flex text-muted">
                <FaStar className="text-warning me-2" /> {profile.rating} Rating
                <FaBriefcase className="text-success ms-4 me-2" /> {profile.worksDone} Works Done
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h4>About </h4>
            <p>
              {profile.fullName} is an experienced professional specializing in {profile.badges.join(', ')}.
              Known for their excellent results and customer satisfaction, they deliver quality work
              with precision and creativity.
            </p>
          </div>

          {/* Pricing Details */}
          <h2 className="text-center mb-4 text-primary">Choose Your Plan</h2>
      <div className="row">
        {pricingDetails && pricingDetails.length > 0 ? (
          ["basic", "standard", "premium"].map((planType, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="card border-0 shadow h-100">
                {/* Plan Header */}
                <div
                  className={`card-header text-white text-center ${
                    planType === "basic"
                      ? "bg-primary"
                      : planType === "standard"
                      ? "bg-warning"
                      : "bg-success"
                  }`}
                >
                  <h5 className="mb-0 text-uppercase">{planType} Plan</h5>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  {/* Pricing */}
                  <h3 className="text-center fw-bold">
                    {pricingDetails[0]?.price?.[planType] || "N/A"}
                  </h3>
                  <p className="text-center text-muted">
                    Delivery in {pricingDetails[0]?.time?.[planType] || "N/A"}
                  </p>

                  {/* Features */}
                  <h6 className="fw-bold mt-4">Features:</h6>
                  <ul className="list-group list-group-flush">
                    {pricingDetails[0]?.features?.[planType]
                      ?.split(",") // Split features string into an array
                      .map((feature, i) => (
                        <li key={i} className="list-group-item">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          {feature.trim()}
                        </li>
                      )) || (
                      <li className="list-group-item text-muted">
                        No features available.
                      </li>
                    )}
                  </ul>
                </div>

                {/* Card Footer */}
                <div className="card-footer text-center bg-light">
                  <button
                    className={`btn ${
                      planType === "basic"
                        ? "btn-primary"
                        : planType === "standard"
                        ? "btn-warning text-dark"
                        : "btn-success"
                    } w-100 fw-bold`}
                    onClick={() =>
                     
                      navigate('/paymentpage',{
                        state: {
                          upiId: "ishmalikbps@oksbi",
                          paymentAmount: 1,
                          orderId: "order123",
                          profileId,
                          profileName: `${profile.fullName}`,
                          userName,
                          userId
                        },
                      })
                    }
                  >
                    Select {planType} Plan
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-danger">
            Pricing details are not available at the moment.
          </p>
        )}
      </div>


      <div className="container-fluid bg-light py-5">
      <div className="container">
        <h3 className="text-primary border-bottom border-3 border-primary pb-2 mb-4">
          Comments
        </h3>
        <div className="row">
          {comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3">
              <div className="p-3 border-start border-4 border-primary bg-white rounded">
                <p className="text-dark fs-5 mb-1">{comment.text}</p>
                <small className="text-muted">
                  {new Date(comment.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
