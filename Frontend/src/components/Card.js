import React from 'react';

export const Card = ({ children, className = '' }) => (
    <div className={`card shadow-sm p-4 ${className}`}>{children}</div>
);

export const CardContent = ({ children }) => (
    <div className="card-body">{children}</div>
);

export const Button = ({ children, onClick, className = '' }) => (
    <button className={`btn btn-primary ${className}`} onClick={onClick}>
        {children}
    </button>
);
