import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Bell } from 'react-bootstrap-icons';
import { useNavigate , Link } from 'react-router-dom'; 
import logo from './photos/weskillremovedbg.png'
const WeSkillNavbar = () => {
  const [profileCreated, setProfileCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const userProfile = localStorage.getItem("userProfile"); 
    if (userProfile) {
      setProfileCreated(true); 
    }
  }, []);
  
  const handleJobSeekerButtonClick = async () => {
    const profileId = localStorage.getItem("profileId");
    console.log(profileId);
    if (profileId === null) {
      navigate("/questionnaire");
    } else {
     
      navigate(`/job-Seeker`);
      
    }
};


  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#"><img src={logo} style={{maxHeight:"3rem",maxWidth:"3rem"}}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/myorders">My Orders</Nav.Link>
            <Nav.Link as={Link} to="/community">Community</Nav.Link>
            <Nav.Link as={Link} to="/support">Support</Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            {/* Notification Icon */}
            <Nav.Link href="#notifications">
              <Bell size={20} className="text-light me-3" />
            </Nav.Link>

            {/* Job Seeker Button */}
            <Button 
              onClick={handleJobSeekerButtonClick} // Handle the button click
              style={{
                backgroundColor: '#28a745',
                border: 'none',
                borderRadius: '25px',
                padding: '6px 20px',
                boxShadow: '0 0 8px #28a745'
              }}
            >
             Job Seeker
            </Button>

            <NavDropdown title="Profile" id="basic-nav-dropdown" className="ms-3">
              <NavDropdown.Item href="#view-profile">View Profile</NavDropdown.Item>
              <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default WeSkillNavbar;
