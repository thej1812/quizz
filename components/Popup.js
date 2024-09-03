import React from 'react';

const Popup = ({ children, onClose }) => {
  return (
    <div style={popupOverlayStyle}>
      <div style={popupStyle}>
        {children}
        <button style={closeButtonStyle} onClick={onClose}>X</button>
      </div>
    </div>
  );
};

const popupOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const popupStyle = {
  backgroundColor: 'black',
  padding: '20px',
  borderRadius: '8px',
  color: 'white',
  position: 'relative',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer',
};

export default Popup;
