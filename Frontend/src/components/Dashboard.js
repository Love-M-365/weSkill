import React, { useState } from 'react';
import WeSkillNavbar from './MainNavbar';
import image1 from "./photos/react.jpg";
import image2 from "./photos/Graphic.jpg";
import image3 from "./photos/cw.jpg";
import image4 from "./photos/ve.jpg";
import weSkill from "./photos/ws.png";
import image5 from "./photos/uiux.webp";
import image6 from "./photos/ds.jpg";
import image7 from "./photos/dm.png";
import image8 from "./photos/android.jpg";
import image9 from "./photos/photo.jpg";
import image10 from "./photos/vo.jpg";
import image11 from "./photos/animation.jpg";
import image12 from "./photos/smm.png";
import { FaStar, FaBriefcase, FaTags, FaComment, FaUser } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

const workFields = [
    { name: "Web Development", image: image1, description: "Develop websites and web applications", profiles: [
        { name: "Rajesh Kumar", rating: 4.8, worksDone: 120, topComment: "Great work!", tags: ['ReactJS', 'Frontend', 'Web Developer'] },
        { name: "Anjali Mehta", rating: 4.5, worksDone: 95, topComment: "Very professional!", tags: ['VueJS', 'JavaScript', 'Frontend Developer'] }
    ]},
    { name: "Graphic Design", image: image2, description: "Create visual concepts and designs", profiles: [
        { name: "Vikram Singh", rating: 4.7, worksDone: 200, topComment: "Outstanding designs!", tags: ['Photoshop', 'Illustrator', 'Graphic Designer'] },
        { name: "Pooja Sharma", rating: 4.6, worksDone: 150, topComment: "Creative and detail-oriented.", tags: ['Figma', 'Branding', 'Graphic Designer'] }
    ]},
    { name: "Content Writing", image: image3, description: "Write blogs, articles, and content for websites", profiles: [
        { name: "Rohit Verma", rating: 4.9, worksDone: 100, topComment: "Great writing skills.", tags: ['SEO', 'Content Writer', 'Blogger'] },
        { name: "Megha Kapoor", rating: 4.4, worksDone: 80, topComment: "Engaging content!", tags: ['Copywriting', 'Blogging', 'Content Creator'] }
    ]},
    { name: "Video Editing", image: image4, description: "Edit and produce professional videos", profiles: [
        { name: "Rohan Sharma", rating: 4.8, worksDone: 90, topComment: "Amazing transitions!", tags: ['Premiere Pro', 'After Effects', 'Video Editor'] },
        { name: "Priya Mehta", rating: 4.5, worksDone: 70, topComment: "Creative storytelling.", tags: ['DaVinci Resolve', 'Editing', 'Visual Effects'] }
    ]},
    { name: "UI/UX Design", image: image5, description: "Design interactive and user-friendly interfaces", profiles: [
        { name: "Arjun Verma", rating: 4.7, worksDone: 85, topComment: "User-focused designs!", tags: ['Figma', 'Adobe XD', 'UI Designer'] },
        { name: "Neha Kapoor", rating: 4.6, worksDone: 60, topComment: "Intuitive designs.", tags: ['Wireframing', 'Prototyping', 'UX Designer'] }
    ]},
    { name: "Data Science", image: image6, description: "Analyze and interpret complex data", profiles: [
        { name: "Rahul Gupta", rating: 4.9, worksDone: 75, topComment: "Excellent insights!", tags: ['Python', 'Machine Learning', 'Data Scientist'] },
        { name: "Meera Nair", rating: 4.5, worksDone: 50, topComment: "Great data visualizations!", tags: ['R', 'Data Analytics', 'AI'] }
    ]},
    { name: "Digital Marketing", image: image7, description: "Promote businesses through digital channels", profiles: [
        { name: "Amit Singh", rating: 4.8, worksDone: 110, topComment: "Effective campaigns!", tags: ['SEO', 'Google Ads', 'Marketing'] },
        { name: "Ishita Jain", rating: 4.6, worksDone: 90, topComment: "Creative strategies!", tags: ['Social Media', 'Brand Marketing', 'Analytics'] }
    ]},
    { name: "App Development", image: image8, description: "Build mobile applications for various platforms", profiles: [
        { name: "Vikram Raj", rating: 4.7, worksDone: 65, topComment: "Smooth and responsive apps!", tags: ['React Native', 'Flutter', 'App Developer'] },
        { name: "Pooja Malhotra", rating: 4.4, worksDone: 55, topComment: "Efficient coding!", tags: ['Kotlin', 'iOS', 'Android'] }
    ]},
    { name: "Photography", image: image9, description: "Capture and edit stunning photographs", profiles: [
        { name: "Sahil Khan", rating: 4.9, worksDone: 150, topComment: "Incredible shots!", tags: ['Portrait', 'Landscape', 'Photography'] },
        { name: "Aarohi Sharma", rating: 4.6, worksDone: 130, topComment: "Creative compositions!", tags: ['Event Photography', 'Editing', 'Photojournalism'] }
    ]},
    { name: "Voice Over", image: image10, description: "Provide voice-over services for various content", profiles: [
        { name: "Karan Batra", rating: 4.8, worksDone: 60, topComment: "Versatile voice talent!", tags: ['Podcast', 'Audiobook', 'Voice Artist'] },
        { name: "Riya Choudhary", rating: 4.5, worksDone: 45, topComment: "Engaging voice quality!", tags: ['Animation', 'Dubbing', 'Narration'] }
    ]},
    { name: "Animation", image: image11, description: "Create animated content for various media", profiles: [
        { name: "Ankit Tiwari", rating: 4.7, worksDone: 80, topComment: "Impressive animations!", tags: ['2D Animation', '3D Modeling', 'Animator'] },
        { name: "Sanya Grover", rating: 4.4, worksDone: 55, topComment: "Great storytelling in animation!", tags: ['Motion Graphics', 'Visual Effects', 'Animation'] }
    ]},
    { name: "Social Media Management", image: image12, description: "Manage and grow social media presence", profiles: [
        { name: "Kabir Malik", rating: 4.8, worksDone: 100, topComment: "Excellent content strategies!", tags: ['Instagram', 'Facebook Ads', 'SM Manager'] },
        { name: "Simran Kaur", rating: 4.6, worksDone: 80, topComment: "Boosted engagement drastically!", tags: ['Content Creation', 'Brand Management', 'Social Media'] }
    ]},
];


const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedField, setSelectedField] = useState(null);

    const filteredFields = workFields.filter(field =>
        field.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const navigate = useNavigate(); // Use navigate for page redirection

    const handleCardClick = (field) => {
        navigate('/profiles', { state: { selectedField: field } });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedField(null);
    };

    return (
        <>
            <WeSkillNavbar />
            <div className="fixed-banner m-4">
                <img 
                    src={weSkill}
                    alt="WeSkill Highlights"
                    className="d-block w-100"
                    style={{ borderRadius: "2rem" }} 
                />
            </div>

            <div className="container my-5">
                {/* Search Bar */}
                <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Search for work fields..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Work Fields Grid */}
                <div className="row g-3">
                    {filteredFields.map((field, index) => (
                        <div className="col-6 col-md-4 col-lg-3" key={index}>
                            <div className="card text-center p-3 shadow-sm clickable-card" onClick={() => handleCardClick(field)}>
                                <img 
                                    src={field.image}
                                    alt={field.name}
                                    className="card-img-top"
                                    style={{ height: "10rem" }}
                                />
                                <div className="card-body">{field.name}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for Work Field Details */}
                {selectedField && (
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedField.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img 
                                src={selectedField.image} 
                                alt={selectedField.name} 
                                className="d-block w-100 mb-3" 
                                style={{ height: "200px", objectFit: "cover" }} 
                            />
                            <p>{selectedField.description}</p>

                            {/* Profile List (Vertical Layout) */}
                            <h5>Profiles in {selectedField.name}:</h5>
                            <div>
                                {selectedField.profiles.map((profile, index) => (
                                    <div className="card text-start p-3 shadow-sm mb-3" key={index} style={{ width: "100%" }}>
                                        <div className="card-body">
                                            <div className="d-flex align-items-center mb-3">
                                                <FaUser className="me-2 text-primary" size={24} />
                                                <h6>{profile.name}</h6>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <div><FaStar className="text-warning me-1" size={20} /> {profile.rating}</div>
                                                <div><FaBriefcase className="text-success me-1" size={20} /> {profile.worksDone} Works</div>
                                            </div>
                                            <div className="mb-2"><FaComment className="text-info me-1" size={20} /> {profile.topComment}</div>
                                            <div className="d-flex flex-wrap">
                                                <FaTags className="text-secondary me-2" size={20} />
                                                {profile.tags.map((tag, i) => (
                                                    <span key={i} className="badge bg-primary me-2 mb-1">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>

            {/* Custom Styling for Cards */}
            <style jsx>{`
                .clickable-card {
                    cursor: pointer;
                    border: 1px solid #dee2e6;
                    border-radius: 0;
                    background-color: #ffffff;
                    box-shadow: none;
                }
                .clickable-card:hover {
                    background-color: #f8f9fa;
                }
                .card-body {
                    text-align: left;
                }
                .card-body h6 {
                    font-weight: bold;
                }
            `}</style>
        </>
    );
};

export default Dashboard;
