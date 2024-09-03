import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const questions = [
    {
      question: '🌍 What is the capital of France? 🇫🇷',
      answers: ['🏙️ Paris', '🏙️ London', '🏙️ Berlin', '🏙️ Madrid'],
      correct: '🏙️ Paris',
    },
    {
      question: '🔴 Which planet is known as the Red Planet? 🚀',
      answers: ['🌍 Earth', '🔴 Mars', '🪐 Jupiter', '🌕 Venus'],
      correct: '🔴 Mars',
    },
    {
      question: '🌊 What is the largest ocean on Earth? 🌐',
      answers: ['🌊 Atlantic Ocean', '🌊 Indian Ocean', '❄️ Arctic Ocean', '🌊 Pacific Ocean'],
      correct: '🌊 Pacific Ocean',
    },
    {
      question: '📜 Who wrote "Romeo and Juliet"? ✒️',
      answers: ['📚 William Shakespeare', '📚 Mark Twain', '📚 Charles Dickens', '📚 Ernest Hemingway'],
      correct: '📚 William Shakespeare',
    },
    {
      question: '🔬 What is the chemical symbol for gold? ⚗️',
      answers: ['🔤 Au', '🔤 Ag', '🔤 Pb', '🔤 Fe'],
      correct: '🔤 Au',
    },
    {
      question: '🌍 How many continents are there on Earth? 🌎',
      answers: ['5️⃣', '6️⃣', '7️⃣', '8️⃣'],
      correct: '7️⃣',
    },
    {
      question: '🏞️ Which is the longest river in the world? 🌍',
      answers: ['🌊 Nile', '🌊 Amazon', '🌊 Yangtze', '🌊 Mississippi'],
      correct: '🌊 Nile',
    },
    {
      question: '🖼️ Who painted the Mona Lisa? 🎨',
      answers: ['🎨 Leonardo da Vinci', '🎨 Vincent van Gogh', '🎨 Pablo Picasso', '🎨 Claude Monet'],
      correct: '🎨 Leonardo da Vinci',
    },
    {
      question: '💎 What is the hardest natural substance on Earth? 🌍',
      answers: ['🥇 Gold', '🔩 Iron', '💎 Diamond', '🥈 Silver'],
      correct: '💎 Diamond',
    },
    {
      question: '🪐 Which planet is known as the "Gas Giant"? 🚀',
      answers: ['🔴 Mars', '🌕 Venus', '🪐 Saturn', '🪐 Jupiter'],
      correct: '🪐 Jupiter',
    }
  ];

  // Ensure currentQuestion is within the valid range
  if (currentQuestion >= questions.length) {
    console.error("Current question index is out of range.");
    return null;
  }

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correct) {
      setScore((prev) => prev + 1);
      setFeedback('🎉 Correct! Well done! 🎉');
    } else {
      setFeedback('❌ Oops! That\'s not right. Try the next one! ❌');
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setFeedback('');
      } else {
        const username = localStorage.getItem('username');
        const userStats = JSON.parse(localStorage.getItem(username)) || { wins: 0, losses: 0, topScore: 0 };

        if (score + 1 === questions.length) {
          userStats.wins += 1;
        } else {
          userStats.losses += 1;
        }

        // Update top score if current score is higher
        if (score + 1 > userStats.topScore) {
          userStats.topScore = score + 1;
        }

        // Save or update the user's stats
        localStorage.setItem(username, JSON.stringify(userStats));
        localStorage.setItem('score', score + 1);

        // Update leaderboard
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        const existingUserIndex = leaderboard.findIndex(entry => entry.username === username);

        if (existingUserIndex !== -1) {
          // Update existing user's score
          leaderboard[existingUserIndex].score = Math.max(leaderboard[existingUserIndex].score, score + 1);
        } else {
          // Add new user to leaderboard
          leaderboard.push({ username, score: score + 1 });
        }

        leaderboard = leaderboard.sort((a, b) => b.score - a.score);
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

        navigate('/result');
      }
    }, 1500);
  };

  return (
    <div style={pageStyle}>
      <h3>{questions[currentQuestion].question}</h3>
      {questions[currentQuestion].answers.map((answer) => (
        <button key={answer} onClick={() => handleAnswer(answer)} style={buttonStyle}>
          {answer}
        </button>
      ))}
      {feedback && <p style={feedbackStyle}>{feedback}</p>}
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
  margin: '5px',
};

const feedbackStyle = {
  marginTop: '20px',
  fontSize: '1.2em',
};

export default QuizPage;
