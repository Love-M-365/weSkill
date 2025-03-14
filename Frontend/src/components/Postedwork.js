import React from 'react';

const PostedWork = ({ title, description, basic, standard, premium, skills, image }) => {
    return (
        <div className="card mt-3 p-3 d-flex flex-row align-items-start">
            {/* Left Section: Image */}
            <div className="m-3">
                <img src={image} alt="Posted Work" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
            </div>

            {/* Right Section: Text */}
            <div className="d-flex flex-column">
                <h4 className="font-weight-bold">{title}</h4>
                <p className="text-muted">{description}</p>

                <div className="mb-2">
                    <strong>Basic Pack:</strong> {basic.specs} - {basic.time} days - ₹{basic.amount}
                </div>
                <div className="mb-2">
                    <strong>Standard Pack:</strong> {standard.specs} - {standard.time} days - ₹{standard.amount}
                </div>
                <div className="mb-2">
                    <strong>Premium Pack:</strong> {premium.specs} - {premium.time} days - ₹{premium.amount}
                </div>
                <div>
                    <strong>Skills:</strong> {skills}
                </div>
            </div>
        </div>
    );
};

export default PostedWork;
