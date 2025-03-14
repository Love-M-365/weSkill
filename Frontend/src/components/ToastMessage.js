import React from 'react';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Toast = ({ type, message, onClose }) => {
    const variantMap = {
        success: 'success',
        error: 'danger',
        info: 'info',
        warning: 'warning'
    };

    return (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-5" style={{ zIndex: 1050, width: 'auto' }}>
            <Alert
                variant={variantMap[type] || 'info'}
                onClose={onClose}
                dismissible
                className="shadow-lg fw-bold"
            >
                {message}
            </Alert>
        </div>
    );
};

export default Toast;
