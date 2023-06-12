
import React from 'react'
import ReactDom from 'react-dom'

const POPUP_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
}

const OUTER_REGION_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    zIndex: 1000
}

const PopUp = ({onYes, onNo }) => {
  
    return ReactDom.createPortal(
        <>
            <div style={OUTER_REGION_STYLES} />
            <div style={POPUP_STYLES}>
               Session Expired, Stay Logged in ?
                <button onClick={onYes}>Yes</button>
                <button onClick={onNo}>No, Sign out.</button>
            </div>
        </>,
        document.getElementById('popup')
    )
}

export default PopUp