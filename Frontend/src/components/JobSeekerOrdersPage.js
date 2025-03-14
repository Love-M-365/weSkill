import React from 'react';
import { Card, Button, ListGroup, Badge, Row, Col, ProgressBar } from 'react-bootstrap';
import WeSkillNavbar from './MainNavbar';
import avtar from './photos/avtar.png'
const JobSeekerProfile = () => {
  // Sample data for tasks and messages
  const pendingTasks = [
    { id: 1, title: 'Complete Data Analysis Report', dueDate: '2025-03-20', status: 'In Progress', progress: 60 },
    { id: 2, title: 'Update Website Design', dueDate: '2025-03-25', status: 'Awaiting Response', progress: 20 },
    { id: 3, title: 'Write Blog Post', dueDate: '2025-03-22', status: 'In Progress', progress: 40 },
  ];

  const messages = [
    { id: 1, provider: 'John Doe', message: 'I have a new task for you.', unread: true },
    { id: 2, provider: 'Sarah Smith', message: 'Are you available to start today?', unread: false },
    { id: 3, provider: 'Alex Johnson', message: 'I need an update on your progress.', unread: true },
  ];

  return (
    <>
    <WeSkillNavbar></WeSkillNavbar>
   
    <div className="container-fluid mt-4">
      <h2 className="text-center mb-5">Job Seeker Dashboard</h2>

      <Row className="g-4">
        {/* Main Content Area */}
        <Col xs={12}>
          <Row>
            {/* Pending Tasks Section */}
            <Col xs={12} md={6} className="mb-4">
              <Card className="shadow-lg">
                <Card.Body>
                  <Card.Title className="text-center">Pending Tasks</Card.Title>
                  <ListGroup variant="flush">
                    {pendingTasks.map((task) => (
                      <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="mb-1">{task.title}</h5>
                          <p className="mb-1 text-muted">Due Date: <strong>{task.dueDate}</strong></p>
                          <p>Status: <span className={`badge ${task.status === 'In Progress' ? 'bg-info' : task.status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>{task.status}</span></p>
                          <ProgressBar now={task.progress} label={`${task.progress}%`} />
                        </div>
                        <Button variant="primary" size="sm" className="btn btn-primary">Mark as Complete</Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            
            {/* Chat Notifications Section */}
            <Col xs={12} md={6} className="mb-4">
              <Card className="shadow-lg">
                <Card.Body>
                  <Card.Title className="text-center">Messages from Job Providers</Card.Title>
                  <ListGroup variant="flush">
                    {messages.map((message) => (
                      <ListGroup.Item key={message.id} className={`d-flex justify-content-between align-items-center ${message.unread ? 'bg-light' : ''}`}>
                        <div className="d-flex align-items-center">
                          <div className="avatar me-3">
                            <img src={avtar} alt="avatar" style={{maxHeight:"2rem",maxWidth:"2rem"}} className="rounded-circle" />
                          </div>
                          <div>
                            <h6 className="mb-1">{message.provider}</h6>
                            <p className="mb-1">{message.message}</p>
                          </div>
                        </div>
                        {message.unread && <Badge pill bg="danger" className="align-self-start">New</Badge>}
                        <Button variant="primary" size="sm" className=" btn btn-success" style={{ padding: '6px 12px' }}>Open Chat</Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
    </>
  );
};

export default JobSeekerProfile;
