import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "./Card";
import WeSkillNavbar from "./MainNavbar";

const Profiles = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data passed from the Questionnaire component
  const { serviceType, answers } = location.state || { serviceType: "Unknown", answers: {} };

  // Handle navigation back to the questionnaire
  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
      <WeSkillNavbar />
      <div className="container py-5">
        <h2 className="text-center mb-4">Your Selected Preferences</h2>
        <Card className="shadow-lg rounded-4 mx-auto" style={{ maxWidth: "800px" }}>
          <CardContent>
            <h3 className="text-primary">Service Type: {serviceType}</h3>
            <ul className="list-group mt-3">
              {Object.entries(answers).map(([question, answer], index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{question}</span>
                  <span className="badge bg-primary rounded-pill">{answer}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-center mt-4">
              <button className="btn btn-secondary me-3" onClick={handleGoBack}>
                Back
              </button>
              <button
                className="btn btn-success"
                onClick={() => navigate("/profiles",{state:{serviceType,answers}})}
              >
                Confirm & Submit
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Profiles;
