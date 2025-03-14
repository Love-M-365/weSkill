import React, { useState } from "react";
import { ListGroup,Container, Row, Col, Card, Button } from "react-bootstrap";
import WeSkillNavbar from "./MainNavbar";
import PostedWork from "./Postedwork"; 
import pp from "./photos/pp.jpg";
import image from './photos/Postedwork.jpg'
import { Link } from 'react-router-dom';
const JobSeekerDashboard = () => {
   const [toast, setToast] = useState(null);
  
  
      const showToast = (type, message) => {
          setToast({ type, message });
          setTimeout(() => setToast(null), 3000);
      };
  const [tasks, setTasks] = useState([
    {
      title: "Website Development",
      description: "Create a responsive e-commerce website.",
      basic: { specs: "Basic Design", time: "5", amount: "1000" },
      standard: { specs: "Enhanced Design with SEO", time: "10", amount: "2500" },
      premium: { specs: "Full-stack with admin panel", time: "15", amount: "5000" },
      skills: "React, Node.js, MongoDB",
      image: image
    }
  ]);

  return (
    <>
      <WeSkillNavbar />
      <Container fluid className="mt-4">
      
        <Row>
          {/* Profile Section */}
          <Col md={12} className="mb-4">
            <Card>
              <Card.Body className="d-flex">
                <div className="me-3">
                  <img
                    src={pp}
                    alt="Profile"
                    className="img-fluid rounded-circle"
                    style={{ width: '100px', height: '100px' }}
                  />
                </div>

                <div className="flex-grow-1">
                  <Card.Title>Love Maggo</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Web Developer | React | JavaScript | Node.js
                  </Card.Subtitle>
                  <hr />
                  <Card.Text>
                    Highly skilled web developer with extensive experience in frontend and backend technologies.
                  </Card.Text>

                  <div className="d-flex justify-content-start align-items-center mt-2">
                    <div className="d-flex align-items-center me-3">
                      <span className="badge bg-warning text-dark me-2">0 ⭐</span>
                      <span className="text-muted">Based on 0 reviews</span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-start mt-4 m-2">
                    <Button variant=" btn btn-primary" className="w-auto m-2">Edit Profile</Button>
                    <Button variant="btn btn-success" className="w-auto m-2 "><Link to="/jobseekerorderspage" style={{textDecoration:"none",color:"white"}}>View Dashboard</Link></Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            {/* Section: Add Post Work Button */}
            <Row className="mt-4">
              <Col md={12}>
                <Card className="mb-4">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <h5 className="m-0">Add New Work</h5>
                    <Button variant="success"><Link to='/postwork' style={{textDecoration:"none",color:"white"}} >Post Work</Link></Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Section: Posted Jobs */}
            <Row>
              <Col md={12} className="mb-4">
                <Card>
                  <Card.Header as="h5">Posted Jobs</Card.Header>
                  <Card.Body>
                    <Row>
                      {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                          <PostedWork
                            key={index}
                            title={task.title}
                            description={task.description}
                            basic={task.basic}
                            standard={task.standard}
                            premium={task.premium}
                            skills={task.skills}
                            image={task.image}
                          />
                        ))
                      ) : (
                        <p style={{ textAlign: "center" }}>Not posted yet</p>
                      )}
                    </Row>
                    <Button variant="outline-info" className="mt-2 w-100">See More</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Networking Section: Connect with Others */}
      <Row className="mt-5">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="card-title">Connect with Like-minded People 🤝</h4>
              <p>Find people in your domain or competitors to connect, collaborate, and learn together.</p>

              {/* Interest Groups */}
              <h5>Interest Groups</h5>
              <ListGroup>
                {['Web Development Enthusiasts', 'AI and Machine Learning Developers', 'Design Experts', 'React Developers'].map((group, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    {group}
                    <span className="badge bg-primary">45 Members</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {/* Button to Explore more networking options */}
              <Button variant="outline-primary" className="mt-3">
                Explore More Connections
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      </Container>
    </>
  );
};

export default JobSeekerDashboard;
