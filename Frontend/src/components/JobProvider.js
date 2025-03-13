import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye, FaUsers } from 'react-icons/fa'; // Importing icons for views and applicants

const JobProvider = () => {
  // Sample tasks posted by providers with views and applicants count
  const postedTasks = [
    { 
      title: "Build a Landing Page", 
      description: "Create a responsive landing page for a startup website.", 
      budget: "$100", 
      category: "Web Development", 
      img: "https://via.placeholder.com/150", 
      views: 120, 
      applicants: 5 
    },
    { 
      title: "Data Cleaning for Dataset", 
      description: "Clean and preprocess a dataset for analysis.", 
      budget: "$50", 
      category: "Data Science", 
      img: "https://via.placeholder.com/150", 
      views: 80, 
      applicants: 3 
    },
    { 
      title: "Logo Design", 
      description: "Design a professional logo for a new brand.", 
      budget: "$80", 
      category: "Design", 
      img: "https://via.placeholder.com/150", 
      views: 150, 
      applicants: 7 
    },
    { 
      title: "React Component Development", 
      description: "Develop reusable React components for a project.", 
      budget: "$120", 
      category: "Web Development", 
      img: "https://via.placeholder.com/150", 
      views: 200, 
      applicants: 10 
    },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Your Posted Tasks 💼</h2>

      {/* Button to redirect to the task input page */}
      <Row className="mb-4 justify-content-center">
        <Col md={6} className="d-flex justify-content-center">
          <Link to="/post-task">
            <Button className="btn btn-lg btn-danger shadow-lg" style={{ fontSize: '20px', padding: '15px 30px', borderRadius: '30px' }}>
              <strong>Post a Task</strong>
            </Button>
          </Link>
        </Col>
      </Row>

      {/* Display Posted Tasks */}
      <Row className="g-4">
        {postedTasks.map((task, index) => (
          <Col key={index} md={6} lg={4}>
            <Card className="border-0 shadow-sm">
              <Card.Img variant="top" src={task.img} />
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">{task.category}</Card.Subtitle>
                <Card.Footer className="text-muted">
                  <small>Budget: {task.budget}</small>
                </Card.Footer>
                
                {/* Stats Section (Views and Applicants) */}
                <Row className="mt-3">
                  <Col className="d-flex align-items-center">
                    <FaEye size={20} className="me-2" />
                    <span>{task.views} Views</span>
                  </Col>
                  <Col className="d-flex align-items-center justify-content-end">
                    <FaUsers size={20} className="me-2" />
                    <span>{task.applicants} Applicants</span>
                  </Col>
                </Row>

                <Button variant="primary" className="mt-3" onClick={() => alert(`Task "${task.title}" details`)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
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

      {/* Popular Categories */}
      <Row className="mt-5">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="card-title">Popular Categories 🏷️</h4>
              <Row className="g-3">
                <Col md={4}>
                  <Card className="border-0 text-center">
                    <Card.Body>
                      <h5 className="card-title">Web Development</h5>
                      <Button variant="outline-primary" className="mt-3">View Tasks</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="border-0 text-center">
                    <Card.Body>
                      <h5 className="card-title">Data Science</h5>
                      <Button variant="outline-primary" className="mt-3">View Tasks</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="border-0 text-center">
                    <Card.Body>
                      <h5 className="card-title">Design</h5>
                      <Button variant="outline-primary" className="mt-3">View Tasks</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JobProvider;
