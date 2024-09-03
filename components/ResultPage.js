import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const score = localStorage.getItem('score') || 0;
  const username = localStorage.getItem('username');
  const userStats = JSON.parse(localStorage.getItem(username)) || { wins: 0, losses: 0, topScore: 0 };
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  const navigate = useNavigate();

  const handleRestart = () => {
    localStorage.removeItem('score');
    navigate('/');
  };

  return (
    <div style={pageStyle}>
      <h1>🎉 Quiz Completed! 🎉</h1>
      <p>{username}, Your Score: {score} 🎯</p>
      <p>🏆 Total Wins: {userStats.wins}</p>
      <p>💔 Total Losses: {userStats.losses}</p>
      <p>🔥 Your Top Score: {userStats.topScore}</p>

      <h2>🥇 Leaderboard 🥇</h2>
      <ol>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.username}: {entry.score} 🎯
          </li>
        ))}
      </ol>

      <button onClick={handleRestart} style={buttonStyle}>🔄 Play Again</button>
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

export default ResultPage;
