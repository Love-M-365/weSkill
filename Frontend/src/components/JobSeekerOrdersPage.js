import React, { useEffect, useState } from 'react';
import { Card, Button, ListGroup, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import WeSkillNavbar from './MainNavbar';
import avtar from './photos/avtar.png';
import axios from 'axios';


const JobSeekerProfile = () => {
  const [orders, setOrders] = useState([]);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const profileId = localStorage.getItem('profileId');

  // ✅ Fetch orders using profileId
  useEffect(() => {
    if (profileId) {
      axios.get(`https://weskill.onrender.com/api/orders/orders/profile/${profileId}`)
        .then(response => setOrders(response.data))
        .catch(error => console.error('Error fetching orders:', error));
    }
    
  }, [profileId]);
  console.log(orders)
  // ✅ Fetch comments using profileId
  useEffect(() => {
    if (profileId) {
      axios.get(`https://weskill.onrender.com/api/comments/comments/${profileId}`)
        .then(response => setComments(response.data))
        .catch(error => console.error('Error fetching comments:', error));
    }
  }, [profileId]);

  return (
    <>
      <WeSkillNavbar />
      <div className="container-fluid mt-4">
        <h2 className="text-center mb-5">Job Seeker Dashboard</h2>

        <Row className="g-4">
          <Col xs={12}>
            <Row>
              {/* ✅ Orders Section */}
              <Col xs={12} md={6} className="mb-4">
                <Card className="shadow-lg">
                  <Card.Body>
                    <Card.Title className="text-center">Your Orders</Card.Title>
                    <ListGroup variant="flush">
                      {orders.length > 0 ? (
                        orders.map(order => (
                          <ListGroup.Item key={order.orderId} className="d-flex justify-content-between align-items-center">
                            <div>
                              <h5 className="mb-1">Order ID: {order.orderId}</h5>
                              <p className="mb-1">Amount: ₹{order.amount}</p>
                              <p>Status: <span className={`badge ${order.status === 'In Progress' ? 'bg-info' : 'bg-success'}`}>{order.status}</span></p>
                            </div>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <p className="text-center text-muted">No orders found</p>
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              {/* ✅ Messages Section */}
              <Col xs={12} md={6} className="mb-4">
                <Card className="shadow-lg">
                  <Card.Body>
                    <Card.Title className="text-center">Messages</Card.Title>
                    <ListGroup variant="flush">
                      {orders.map(order => (
                        <ListGroup.Item key={order.orderId} className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <img src={avtar} alt="avatar" style={{ maxHeight: "2rem", maxWidth: "2rem" }} className="rounded-circle me-3" />
                            <h6 className="mb-1">{order.userName}</h6>
                          </div>
                          <Button 
                            variant="primary" 
                            size="sm" 
                            className="btn btn-success"
                            onClick={() => navigate(`/chat/${order.userName}`)}
                          >
                            Open Chat
                          </Button>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              {/* ✅ Comments Section */}
              <Col xs={12} className="mb-4">
                <Card className="shadow-lg">
                  <Card.Body>
                    <Card.Title className="text-center">Comments</Card.Title>
                    <ListGroup variant="flush">
                      {comments.length > 0 ? (
                        comments.map((comment, index) => (
                          <ListGroup.Item key={index}>
                            {comment.text}
                          </ListGroup.Item>
                        ))
                      ) : (
                        <p className="text-center text-muted">No comments found</p>
                      )}
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
