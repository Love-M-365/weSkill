import React, { useState, useEffect } from "react";
import { ListGroup, Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import WeSkillNavbar from "./MainNavbar";
import PostedWork from "./Postedwork"; 
import pp from "./photos/pp.jpg";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import postwork from '../components/photos/postwork.jpg'

const JobSeekerDashboard = () => {
  const [toast, setToast] = useState(null);
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndWorks = async () => {
      try {
        const token = localStorage.getItem('token');
        const profileResponse = await axios.get('https://weskill.onrender.com/api/profiles/my-profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (profileResponse.data.success) {
          const userProfile = profileResponse.data.profile;
          setProfile(userProfile);

          // Fetch works based on profile ID
          const worksResponse = await axios.get(`https://weskill.onrender.com/api/works/${userProfile._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (worksResponse.data && worksResponse.data.length > 0) {
            setTasks(worksResponse.data);
          }
          else{
            setTasks("");
          }
        } else {
          setError('Profile not found');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndWorks();
  }, []);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
        
      </Container>
    );
  }

  return (
    <>
      <WeSkillNavbar />
      <Container fluid className="mt-4">
        {toast && (
          <Alert variant={toast.type} className="position-fixed top-0 end-0 m-3">
            {toast.message}
          </Alert>
        )}

        <Row>
          {/* Profile Section */}
          <Col md={12} className="mb-4">
            <Card>
              <Card.Body className="d-flex">
                <div className="me-3">
                  <img
                    src={profile.profilePhoto || pp}
                    alt="Profile"
                    className="img-fluid rounded-circle"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </div>

                <div className="flex-grow-1">
                  <Card.Title>{profile.fullName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {profile.additionalSkills?.join(' | ')}
                  </Card.Subtitle>
                  <hr />
                  <Card.Text>{profile.bio || 'No bio available'}</Card.Text>
                  <div className="mt-4">
                    <h5 className="mb-3">Badges</h5>
                    <div className="d-flex flex-wrap">
                      {profile.badges && profile.badges.length > 0 ? (
                        profile.badges.map((badge, index) => (
                          <span
                            key={index}
                            className="badgeUI badgeUI-gold m-2"
                            style={{ padding: "10px", borderRadius: "8px" }}
                          >
                            {badge}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted">No badges earned yet</span>
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mt-4">
                    <Button variant="primary" className="me-2" onClick={() => navigate('/edit-profile')}>
                      Edit Profile
                    </Button>
                    <Button variant="success">
                      <Link to="/jobseekerorderspage" style={{ textDecoration: "none", color: "white" }}>
                        View Dashboard
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Add Post Work Section */}
          <Col md={12}>
            <Card className="mb-4">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <h5 className="m-0">Add New Work</h5>
                <Button variant="success">
                  <Link to="/postwork" style={{ textDecoration: "none", color: "white" }}>
                    Post Work
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Posted Works Section */}
          <Col md={12} className="mb-4">
            <Card>
              <Card.Header as="h5">Posted Works</Card.Header>
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
                        image={postwork}
                      />
                    ))
                  ) : (
                    <p style={{ textAlign: "center" }}>Not posted yet</p>
                  )}
                </Row>
                <Button variant="outline-info" className="mt-2 w-100">
                  See More
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
