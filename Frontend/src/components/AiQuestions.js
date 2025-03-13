import React, { useState } from 'react';
import { Button, Card, CardContent } from './Card';
import image1 from "./photos/react.jpg";
import image2 from "./photos/Graphic.jpg";
import image3 from "./photos/cw.jpg";
import image4 from "./photos/logo.jpg";
import image5 from "./photos/uiux.webp";
import image6 from "./photos/ds.jpg";
import image7 from "./photos/other.jpg";
import WeSkillNavbar from './MainNavbar';
import weSkill from "./photos/weskillremovedbg.png";
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: "What type of service are you looking for?",
    options: [
      { label: "Web Development", image: image1 },
      { label: "Graphic Design", image: image2 },
      { label: "Logo Design", image: image4 },
      { label: "Content Writing", image: image3 },
      { label: "Photography", image: image5 },
      { label: "Animation", image: image6 },
      { label: "AI Text-to-Audio", image: image7 },
      { label: "Other", image: image7 }
    ]
  },
  {
    question: "What framework would you like to use for Web Development?",
    options: [
      { label: "React" },
      { label: "Angular" },
      { label: "Vue" }
    ]
  },
  {
    question: "What is your preferred database for the Web Development project?",
    options: [
      { label: "MongoDB" },
      { label: "MySQL" },
      { label: "PostgreSQL" }
    ]
  },
  {
    question: "Would you like to integrate any additional technologies?",
    options: [
      { label: "Node.js" },
      { label: "Express.js" },
      { label: "Other" }
    ]
  }
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true); // State to handle showing the welcome message
  const [serviceType, setServiceType] = useState(null); // Store selected service type
  const navigate = useNavigate();
  const handleNext = () => {
    if (!selectedOption) return alert("Please select an option before proceeding.");

    setAnswers({ ...answers, [questions[currentQuestion].question]: selectedOption });
    setSelectedOption(null);

    if (currentQuestion === 0 && serviceType === "Web Development" && selectedOption === "Web Development") {
      setCurrentQuestion(1);
    } else if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log('User Responses:', answers);
      navigate('/taskList');
    }
  };

  const handleSkip = () => {
    setSelectedOption(null); // Reset selected option
    navigate('/dashboard'); // Move to next question
  };

  const handleStart = () => {
    setShowWelcome(false); // Hide the welcome message when the user starts the questionnaire
  };

  return (
    <>
      <WeSkillNavbar />

      <div className="container d-flex justify-content-center align-items-center vh-100">
        <Card className="p-5 shadow-lg rounded-4 w-100" style={{ maxWidth: '700px' }}>
          <CardContent>
            {showWelcome ? (
              // Welcome message section
              <div className="text-center">
                <div className="mb-4">
                  <img src={weSkill} alt="WeSkill Logo" className="img-fluid rounded mb-3" style={{ maxHeight: "10rem", maxWidth: '20rem' }} />
                </div>
                <h2 className="text-primary mb-4" style={{ fontFamily: "Big Shoulders Inline", fontSize: "5rem" }}>
                  Welcome to WeSkill!
                </h2>
                <p className="lead text-secondary mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  We're excited to have you here. Let's get started with a quick questionnaire to help us understand your needs.
                </p>
                <Button className="bg-success mt-3 px-4 py-2" onClick={handleStart}>
                  Get Started
                </Button>
              </div>
            ) : (
              // Questionnaire section
              <>
                <h2 className="text-primary mb-4 text-center">
                  {questions[currentQuestion].question}
                </h2>

                {/* Display options with images for the first question */}
                <div className="d-flex flex-wrap gap-3 justify-content-center mb-4">
                  {currentQuestion === 0
                    ? questions[currentQuestion].options.map((option, index) => (
                        <div
                          key={index}
                          className={`option-card p-3 rounded-3 text-center ${selectedOption === option.label ? 'border border-primary shadow' : 'border'}`}
                          style={{ width: '150px', cursor: 'pointer' }}
                          onClick={() => {
                            setSelectedOption(option.label);
                            setServiceType(option.label);
                          }}
                        >
                          <img src={option.image} alt={option.label} className="img-fluid rounded mb-2" style={{ maxHeight: "5rem" }} />
                          <div>{option.label}</div>
                        </div>
                      ))
                    : questions[currentQuestion].options.map((option, index) => (
                        <div
                          key={index}
                          className={`option-card p-3 rounded-3 text-center ${selectedOption === option.label ? 'border border-primary shadow' : 'border'}`}
                          style={{ width: '150px', cursor: 'pointer' }}
                          onClick={() => setSelectedOption(option.label)}
                        >
                          <div>{option.label}</div>
                        </div>
                      ))}
                </div>

                <div className="d-flex justify-content-between">
                  <Button
                    className="mt-3 px-4 py-2"
                    onClick={handleSkip}
                  >
                    Skip
                  </Button>
                  <Button
                    className="mt-3 px-4 py-2"
                    onClick={handleNext}
                    disabled={!selectedOption}
                  >
                    {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Questionnaire;
