import React from "react";
import { Container, Row, Col, Card, Button, ListGroup, Badge } from "react-bootstrap";
import WeSkillNavbar from "./MainNavbar";
import pp from "./photos/pp.jpg"
const JobSeekerDashboard = () => {
  return (
    <>
    <WeSkillNavbar></WeSkillNavbar>
    <Container fluid className="mt-4">
      <Row>
        {/* Profile Section */}
<Col md={12} className="mb-4">
  <Card>
    <Card.Body className="d-flex">
      {/* Profile Picture */}
      <div className="me-3">
        <img
          src= {pp}
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
          {/* Ratings */}
          <div className="d-flex align-items-center me-3">
            <span className="badge bg-warning text-dark me-2">4.5 ⭐</span>
            <span className="text-muted">Based on 120 reviews</span>
          </div>
          
         
        </div>

        <div className="d-flex justify-content-start mt-4">
          <Button variant="outline-primary" className="w-auto">Edit Profile</Button>
        </div>
      </div>
    </Card.Body>
  </Card>
</Col>

        <Col >
        <Row className="mt-4">
            {/* Section: Add Post Work Button */}
            <Col md={12}>
              <Card className="mb-4">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <h5 className="m-0">Add New Work</h5>
                  <Button variant="success">Post Work</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            

            {/* Section: Past Works */}
            <Col md={12} className="mb-4">
  <Card>
    <Card.Header as="h5">Past Works</Card.Header>
    <Card.Body>
      <Row>
        {/* Each Past Work Item as a Button-Card */}
        <Col sm={4} className="mb-3">
          <Button variant="outline-primary" className="w-100 p-4 d-flex flex-column justify-content-center text-center rounded-3 shadow-sm border-2" style={{ pointerEvents: 'none' }}>
            <h5 className="mb-3">Website for ABC Company</h5>
            <p className="text-muted">A modern website designed for ABC company, focusing on user experience.</p>
          </Button>
        </Col>
        <Col sm={4} className="mb-3">
          <Button variant="outline-primary" className="w-100 p-4 d-flex flex-column justify-content-center text-center rounded-3 shadow-sm border-2" style={{ pointerEvents: 'none' }}>
            <h5 className="mb-3">E-commerce Platform for XYZ</h5>
            <p className="text-muted">An e-commerce platform built with a focus on scalability and security.</p>
          </Button>
        </Col>
        <Col sm={4} className="mb-3">
          <Button variant="outline-primary" className="w-100 p-4 d-flex flex-column justify-content-center text-center rounded-3 shadow-sm border-2" style={{ pointerEvents: 'none' }}>
            <h5 className="mb-3">Portfolio Website</h5>
            <p className="text-muted">A personal portfolio showcasing web development projects.</p>
          </Button>
        </Col>
      </Row>
      <Button variant="outline-info" className="mt-2 w-100">See More</Button>
    </Card.Body>
  </Card>
</Col>

          </Row>

         
          
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default JobSeekerDashboard;
