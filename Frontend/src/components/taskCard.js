import React from 'react';

const TaskCard = ({ image, title, description, completionTime, status }) => {
    return (
        <div className="d-flex border rounded-4 shadow-sm overflow-hidden" style={{ maxWidth: '600px', height: '250px' }}>
            {/* Left Side - Image */}
            <div
                className="w-50 bg-image"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            ></div>

            {/* Right Side - Task Details */}
            <div className="w-50 p-3 d-flex flex-column justify-content-between bg-light">
                <div>
                    <h5 className="fw-bold text-primary">{title}</h5>
                    <p className="text-muted mb-2">{description}</p>
                </div>
                <div>
                    <p className="mb-1"><strong>Completion Time:</strong> {completionTime}</p>
                    <span className={`badge ${status === 'Completed' ? 'bg-success' : 'bg-warning'}`}>{status}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
