import React from 'react';
import ReactDOM from 'react-dom';

const POPUP_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    borderRadius: '10px',
    zIndex: 1000,
};

const OUTER_REGION_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    zIndex: 1000,
};

const TEXT_STYLES = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '18px',
    marginBottom: '20px',
};

const BUTTON_CONTAINER_STYLES = {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'center',
};

const BUTTON_STYLES = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    padding: '8px 16px',
    borderRadius: '5px',
    margin: '10px 0',
    cursor: 'pointer',
};

const PopUp = ({ onYes, onNo }) => {

    return ReactDOM.createPortal(
        <>
            <div style={OUTER_REGION_STYLES} />
            <div style={POPUP_STYLES}>
                <p style={TEXT_STYLES}>Session Expired, Stay Logged in?</p>
                <div style={BUTTON_CONTAINER_STYLES}>
                    <button style={BUTTON_STYLES} onClick={onYes}>Yes</button>
                    <button style={BUTTON_STYLES} onClick={onNo}>No, Sign out.</button>
                </div>
            </div>
        </>,
        document.getElementById('popup')
    );
};

export default PopUp;
