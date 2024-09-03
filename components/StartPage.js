import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/profile');
  };

  return (
    <div style={pageStyle}>
      <h1>Welcome to the Quiz Game!</h1>
      <button onClick={handleStart} style={buttonStyle}>Start</button>
    </div>
  );
};

const pageStyle = {
  backgroundColor: 'black',
  color: 'white',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

const buttonStyle = {
  backgroundColor: 'grey',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default StartPage;
