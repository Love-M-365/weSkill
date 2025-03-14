import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Button } from './Card';
import { Link } from 'react-router-dom';
import WeSkillNavbar from './MainNavbar';
import weSkill from "./photos/weskillremovedbg.png";

// Dummy profile data
const profiles = [
  {
    name: "Dev sharma",
    skills: "Web Development, React, Node.js",
    experience: "Intermediate",
    image: "./photos/react.jpg",
  },
  {
    name: "Rajat Sood",
    skills: "Graphic Design, Photoshop, Illustrator",
    experience: "Beginner",
    image: "./photos/Graphic.jpg",
  },
  {
    name: "Priya Ramshewari",
    skills: "Content Writing, SEO, Blog Posts",
    experience: "Advanced",
    image: "./photos/cw.jpg",
  },
  // More profiles can be added here
];

const TaskList = () => {
  const location = useLocation();
  const { answers } = location.state || {};  // Retrieve the answers passed via the location state

  return (
    <>
      <WeSkillNavbar />

      <div className="container my-5">
        <h2 className="text-center mb-5">Task List Based on Your Responses</h2>

        <div className="row justify-content-center">
          {profiles.map((profile, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <Card className="shadow-lg rounded-4">
                <CardContent>
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="img-fluid rounded mb-3"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <h5 className="text-primary">{profile.name}</h5>
                  <p className="text-secondary">{profile.skills}</p>
                  <p className="text-muted">Experience: {profile.experience}</p>

                  <div className="d-flex justify-content-between mt-4">
                    <Link to={`/profile/${profile.name}`} className="btn btn-info w-48">
                      View Profile
                    </Link>
                    
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskList;
