import {React ,useState} from 'react';
import { useLocation } from 'react-router-dom';
import { FaStar, FaBriefcase, FaClock, FaCheckCircle, FaUser } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import WeSkillNavbar from './MainNavbar';
import TaskCard from './taskCard'; 
import pw from './photos/pw.jpg'
import commerce from './photos/commerce.jpg'
import sm from './photos/sm.jpg'
import Toast from './ToastMessage';

const ProfileDetails = () => {
    const [toast, setToast] = useState(null);


    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3000);
    };

    const location = useLocation();
    const { profile } = location.state || {};

    if (!profile) {
        return <p>No profile details available.</p>;
    }

    const pricingDetails = [
        { level: 'Basic', price: '₹1,500', time: '2-3 days', features: ['Simple design', 'Basic revisions', 'Quick tasks'] },
        { level: 'Standard', price: '₹3,000', time: '4-6 days', features: ['Moderate complexity', 'More revisions', 'Well-documented delivery'] },
        { level: 'Premium', price: '₹7,500', time: '1-2 weeks', features: ['Complex projects', 'Unlimited revisions', 'Detailed consultation'] }
    ];

    const sampleWorks = [
        {
            image: commerce,
            title: 'E-Commerce Website',
            description: 'A fully functional e-commerce platform with user authentication and product filtering.',
            completionTime: '3 weeks',
            status: 'Completed'
        },
        {
            image: pw,
            title: 'Portfolio Website',
            description: 'A creative personal portfolio with animations and modern design.',
            completionTime: '1 week',
            status: 'In Progress'
        },
        {
            image: sm,
            title: 'Social Media App Design',
            description: 'A UI/UX design for a social media platform with engaging visual elements.',
            completionTime: '2 weeks',
            status: 'Completed'
        }
    ];

    return (
        <>
            <WeSkillNavbar />
            <div className="container my-5">
            {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
                {/* Profile Details */}
                <div className="card border-0 p-4 mb-4 shadow-sm">
                    <div className="d-flex align-items-center mb-4">
                        <div className="profile-pic me-3">
                            <FaUser  size={50} />
                        </div>
                        <div>
                            <h2 className="mb-1">{profile.name}</h2>
                            <div className="d-flex text-muted">
                                <FaStar className="text-warning me-2" /> {profile.rating} Rating
                                <FaBriefcase className="text-success ms-4 me-2" /> {profile.worksDone} Works Done
                            </div>
                        </div>
                    </div>

                    {/* Detailed Description */}
                    <div className="mb-4">
                        <h4>About {profile.name}</h4>
                        <p>
                            {profile.name} is an experienced professional specializing in {profile.tags.join(', ')}.
                            Known for their excellent results and customer satisfaction, they deliver quality work
                            with precision and creativity.
                        </p>
                    </div>

                    {/* Pricing Details */}
                    <h4>Pricing Plans</h4>
                    <div className="d-flex gap-3 flex-wrap">
                        {pricingDetails.map((plan, index) => (
                            <div key={index} className="card text-start p-3 border-0 shadow-sm" style={{ minWidth: '220px', maxWidth: '320px' }}>
                                <h5 className="text-primary fw-bold">{plan.level}</h5>
                                <p className="text-success fw-bold">₹ {plan.price}</p>
                                <p className="text-muted">
                                    <FaClock className="text-primary me-2" /> {plan.time}
                                </p>
                                <ul className="list-unstyled mb-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="d-flex align-items-center text-secondary">
                                            <FaCheckCircle className="text-success me-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant="primary"
                                    className="w-100"
                                    
                                    onClick={() => showToast('success', 'payment successfull , check your order in My orders tab !')}
                                >
                                    Proceed to Pay
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Sample Works Section using TaskCard */}
                    <div className="mt-5">
                        <h4>Sample Works</h4>
                        <div className="d-flex gap-3">
                            {sampleWorks.map((work, index) => (
                                <TaskCard
                                    key={index}
                                    image={work.image}
                                    title={work.title}
                                    description={work.description}
                                    completionTime={work.completionTime}
                                    status={work.status}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileDetails;
