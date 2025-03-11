import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const WelcomePage = () => {
    return (
        <Container className="my-5 text-center">
            {/* Hero Section */}
            <div className="py-5 bg-dark text-white rounded shadow-sm">
                <h1 className="display-4 fw-bold">Welcome to WeSkill! 🚀</h1>
                <p className="lead">Connect, Collaborate, and Grow with the Right Opportunities.</p>
            </div>

            {/* Choose Role Section */}
            <Row className="my-5">
                <Col md={6}>
                    <Card className="shadow-sm border-0">
                        <Card.Body>
                            <h4>🙋‍♂️ I'm a Job Seeker</h4>
                            <p>Showcase your skills, find exciting projects, and grow your career.</p>
                            <Button variant="primary" className="w-100">Get Started as Seeker</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="shadow-sm border-0">
                        <Card.Body>
                            <h4>💼 I'm a Job Provider</h4>
                            <p>Post projects, discover skilled individuals, and expand your team.</p>
                            <Button variant="success" className="w-100">Get Started as Provider</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Platform Highlights */}
            <Row className="my-5 g-4">
                <Col md={4}>
                    <Card className="shadow-sm text-center">
                        <Card.Body>
                            <h5>🌍 Explore Opportunities</h5>
                            <p>Discover a wide range of projects and job offers tailored for you.</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm text-center">
                        <Card.Body>
                            <h5>📈 Skill-Based Rankings</h5>
                            <p>Earn recognition for your work and improve your ranking based on efficiency and quality.</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm text-center">
                        <Card.Body>
                            <h5>🤝 Community Support</h5>
                            <p>Engage with peers, share insights, and grow together in our vibrant community.</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Call to Action */}
            <div className="text-center my-4">
                <h3>Ready to Elevate Your Skills?</h3>
                <Button variant="dark" className="px-4 py-2 mt-2">Join Now</Button>
            </div>
        </Container>
    );
};

export default WelcomePage;
