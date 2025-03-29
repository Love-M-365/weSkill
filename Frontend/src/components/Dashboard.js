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
        { name: "Rajesh Kumar", rating: 4.8, uploadedWorks: 120, topComment: "Great work!", tags: ['ReactJS', 'Frontend', 'Web Developer'], description: "Expert in creating dynamic and responsive web applications." },
        { name: "Anjali Mehta", rating: 4.5, uploadedWorks: 95, topComment: "Very professional!", tags: ['VueJS', 'JavaScript', 'Frontend Developer'], description: "Specialized in building user-friendly and interactive web designs." }
    ]},
    { name: "Graphic Design", image: image2, description: "Create visual concepts and designs", profiles: [
        { name: "Vikram Singh", rating: 4.7, uploadedWorks: 200, topComment: "Outstanding designs!", tags: ['Photoshop', 'Illustrator', 'Graphic Designer'], description: "Known for innovative and trend-setting graphic designs." },
        { name: "Pooja Sharma", rating: 4.6, uploadedWorks: 150, topComment: "Creative and detail-oriented.", tags: ['Figma', 'Branding', 'Graphic Designer'], description: "Excels at designing brand identities and marketing materials." }
    ]},
    { name: "Content Writing", image: image3, description: "Write blogs, articles, and content for websites", profiles: [
        { name: "Rohit Verma", rating: 4.9, uploadedWorks: 100, topComment: "Great writing skills.", tags: ['SEO', 'Content Writer', 'Blogger'], description: "Skilled in producing high-quality and SEO-optimized content." },
        { name: "Megha Kapoor", rating: 4.4, uploadedWorks: 80, topComment: "Engaging content!", tags: ['Copywriting', 'Blogging', 'Content Creator'], description: "Expert in creating persuasive and creative content." }
    ]},
    { name: "Video Editing", image: image4, description: "Edit and produce professional videos", profiles: [
        { name: "Rohan Sharma", rating: 4.8, uploadedWorks: 90, topComment: "Amazing transitions!", tags: ['Premiere Pro', 'After Effects', 'Video Editor'] },
        { name: "Priya Mehta", rating: 4.5, uploadedWorks: 70, topComment: "Creative storytelling.", tags: ['DaVinci Resolve', 'Editing', 'Visual Effects'] }
    ]},
    { name: "UI/UX Design", image: image5, description: "Design interactive and user-friendly interfaces", profiles: [
        { name: "Arjun Verma", rating: 4.7, uploadedWorks: 85, topComment: "User-focused designs!", tags: ['Figma', 'Adobe XD', 'UI Designer'] },
        { name: "Neha Kapoor", rating: 4.6, uploadedWorks: 60, topComment: "Intuitive designs.", tags: ['Wireframing', 'Prototyping', 'UX Designer'] }
    ]},
    { name: "Data Science", image: image6, description: "Analyze and interpret complex data", profiles: [
        { name: "Rahul Gupta", rating: 4.9, uploadedWorks: 75, topComment: "Excellent insights!", tags: ['Python', 'Machine Learning', 'Data Scientist'] },
        { name: "Meera Nair", rating: 4.5, uploadedWorks: 50, topComment: "Great data visualizations!", tags: ['R', 'Data Analytics', 'AI'] }
    ]},
    { name: "Digital Marketing", image: image7, description: "Promote businesses through digital channels", profiles: [
        { name: "Amit Singh", rating: 4.8, uploadedWorks: 110, topComment: "Effective campaigns!", tags: ['SEO', 'Google Ads', 'Marketing'] },
        { name: "Ishita Jain", rating: 4.6, uploadedWorks: 90, topComment: "Creative strategies!", tags: ['Social Media', 'Brand Marketing', 'Analytics'] }
    ]},
    { name: "App Development", image: image8, description: "Build mobile applications for various platforms", profiles: [
        { name: "Vikram Raj", rating: 4.7, uploadedWorks: 65, topComment: "Smooth and responsive apps!", tags: ['React Native', 'Flutter', 'App Developer'] },
        { name: "Pooja Malhotra", rating: 4.4, uploadedWorks: 55, topComment: "Efficient coding!", tags: ['Kotlin', 'iOS', 'Android'] }
    ]},
    { name: "Photography", image: image9, description: "Capture and edit stunning photographs", profiles: [
        { name: "Sahil Khan", rating: 4.9, uploadedWorks: 150, topComment: "Incredible shots!", tags: ['Portrait', 'Landscape', 'Photography'] },
        { name: "Aarohi Sharma", rating: 4.6, uploadedWorks: 130, topComment: "Creative compositions!", tags: ['Event Photography', 'Editing', 'Photojournalism'] }
    ]},
    { name: "Voice Over", image: image10, description: "Provide voice-over services for various content", profiles: [
        { name: "Karan Batra", rating: 4.8, uploadedWorks: 60, topComment: "Versatile voice talent!", tags: ['Podcast', 'Audiobook', 'Voice Artist'] },
        { name: "Riya Choudhary", rating: 4.5, uploadedWorks: 45, topComment: "Engaging voice quality!", tags: ['Animation', 'Dubbing', 'Narration'] }
    ]},
    { name: "Animation", image: image11, description: "Create animated content for various media", profiles: [
        { name: "Ankit Tiwari", rating: 4.7, uploadedWorks: 80, topComment: "Impressive animations!", tags: ['2D Animation', '3D Modeling', 'Animator'] },
        { name: "Sanya Grover", rating: 4.4, uploadedWorks: 55, topComment: "Great storytelling in animation!", tags: ['Motion Graphics', 'Visual Effects', 'Animation'] }
    ]},
    { name: "Social Media Management", image: image12, description: "Manage and grow social media presence", profiles: [
        { name: "Kabir Malik", rating: 4.8, uploadedWorks: 100, topComment: "Excellent content strategies!", tags: ['Instagram', 'Facebook Ads', 'SM Manager'] },
        { name: "Simran Kaur", rating: 4.6, uploadedWorks: 80, topComment: "Boosted engagement drastically!", tags: ['Content Creation', 'Brand Management', 'Social Media'] }
    ]},
];


const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedField, setSelectedField] = useState(null);

    const filteredFields = workFields.filter(field =>
        field.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const navigate = useNavigate(); 

    const handleCardClick = (field) => {
        navigate('/aiquestions', { state: { selectedField: field.name } });
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
