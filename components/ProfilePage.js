import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    const previousPlayers = JSON.parse(localStorage.getItem('previousPlayers')) || [];
    if (!previousPlayers.includes(username)) {
      if (previousPlayers.length === 2) {
        previousPlayers.shift(); // Remove the oldest player
      }
      previousPlayers.push(username); // Add the new player
    }
    localStorage.setItem('previousPlayers', JSON.stringify(previousPlayers));
    localStorage.setItem('username', username);
    navigate('/quiz');
  };

  return (
    <div style={pageStyle}>
      <h2>Create Your Profile</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleContinue} style={buttonStyle}>Continue</button>
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

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginBottom: '10px',
  width: '80%',
};

const buttonStyle = {
  backgroundColor: 'grey',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default ProfilePage;
