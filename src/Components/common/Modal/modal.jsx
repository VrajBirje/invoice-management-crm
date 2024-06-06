// components/common/Modal/Modal.js
import React from 'react';
import './modal.css';

const Modal = ({ children }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                {children}
            </div>
        </div>
    );
};

export default Modal;
