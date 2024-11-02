import React, { useState } from 'react';
import { Modal, Button } from 'rsuite';
import './InfoModal.css';

const InfoModal = () => {
    const [isOpen, setIsOpen] = useState(false); 

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };
    
    return (
        <>
            <button className='infoButton' onClick={handleOpen}>
                <i className="fa-solid fa-circle-info"></i>
            </button>
            <Modal open={isOpen} onHide={handleClose} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>How to use the map:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modalInfo'>
                        <i class="fa-solid fa-angle-right"></i><p>Use the searchbar to find a country.</p>
                    </div>
                    <div className='modalInfo'>
                        <i class="fa-solid fa-angle-right"></i><p>Left click a country to mark it as <span>visited</span>.</p>
                    </div>
                    <div className='modalInfo'>
                        <i class="fa-solid fa-angle-right"></i><p>Right click a country to mark it as <span>want to see</span>.</p>
                    </div>
                    <div className='modalInfo'>
                        <i class="fa-solid fa-angle-right"></i><p>To remove a country from <span>visited</span> or <span>want to see</span> click the corresponding mouse button again.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="subtle">
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default InfoModal;
