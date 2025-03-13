import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import WeSkillNavbar from './MainNavbar';
import image1 from './photos/react.jpg'
import image2 from './photos/dataset.jpg'
import image3 from './photos/logo.jpg'
import image4 from './photos/developer.jpg'
const JobSeeker = () => {
  // Sample tasks for job seekers
  const tasks = [
    { title: "Build a Landing Page", description: "Create a responsive landing page for a startup website.", budget: "$100", category: "Web Development", img: image1 },
    { title: "Data Cleaning for Dataset", description: "Clean and preprocess a dataset for analysis.", budget: "$50", category: "Data Science", img: image2 },
    { title: "Logo Design", description: "Design a professional logo for a new brand.", budget: "$80", category: "Design", img: image3 },
    { title: "React Component Development", description: "Develop reusable React components for a project.", budget: "$120", category: "Web Development", img: image4 },
  ];

  // Filtering state
  const [categoryFilter, setCategoryFilter] = useState("");

  // Filtered tasks based on category
  const filteredTasks = categoryFilter
    ? tasks.filter((task) => task.category.toLowerCase().includes(categoryFilter.toLowerCase()))
    : tasks;

  return (
    <>
   <WeSkillNavbar></WeSkillNavbar>
    <Container className="my-5">
     

      {/* Search Bar & Filter */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search tasks..."
            className="form-control"
            onChange={(e) => setCategoryFilter(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Control
            as="select"
            onChange={(e) => setCategoryFilter(e.target.value)}
            value={categoryFilter}
          >
            <option value="">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Design">Design</option>
          </Form.Control>
        </Col>
      </Row>

      {/* Task Listings */}
      <Row className="g-4">
        {filteredTasks.map((task, index) => (
          <Col key={index} md={6} lg={4}>
            <Card className="border-0 shadow-sm" style={{maxHeight:"28rem"}}>
              <Card.Img style={{maxHeight:"15rem"}}variant="top" src={task.img} />
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">{task.category}</Card.Subtitle>
                <Card.Footer className="text-muted">
                  <small>Budget: {task.budget}</small>
                </Card.Footer>
                <Button variant="primary" onClick={() => alert(`Interested in: ${task.title}`)}>
                  Apply Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default JobSeeker;
