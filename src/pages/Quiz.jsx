import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 1,
    question: 'What is the primary purpose of React?',
    options: [
      'To manage the database',
      'To handle HTTP requests',
      'To build user interfaces',
      'To style web pages',
    ],
    correctAnswer: 2,
  },
  {
    id: 2,
    question:
      'Which method is used to update state in a React class component?',
    options: ['setState()', 'updateState()', 'changeState()', 'modifyState()'],
    correctAnswer: 10,
  },
  {
    id: 3,
    question: 'What does the useState hook in React do?',
    options: [
      'Handles side effects',
      'Manages state in a functional component',
      'Defines a lifecycle method',
      'Performs API calls',
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question:
      'Which of the following is NOT a lifecycle method in React class components?',
    options: [
      'componentDidMount',
      'componentWillUpdate',
      'componentWillUnmount',
      'useEffect',
    ],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: 'What is JSX?',
    options: [
      'A JavaScript library',
      'A tool for styling React components',
      'A syntax extension for JavaScript',
      'A data-fetching library',
    ],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "What is the purpose of React's key prop?",
    options: [
      'To set unique IDs for components',
      'To add event listeners',
      'To optimize rendering performance of lists',
      'To pass props to child components',
    ],
    correctAnswer: 2,
  },
  {
    id: 7,
    question: "Which statement best describes React's Virtual DOM?",
    options: [
      'It is a copy of the real DOM that React updates directly.',
      'It is a lightweight representation of the real DOM used for performance optimization.',
      'It is a database for storing DOM elements.',
      'It is a library used to manage DOM manipulations.',
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    question:
      'Which hook is used to perform side effects in functional components?',
    options: ['useState', 'useEffect', 'useReducer', 'useContext'],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: 'What is React.Fragment used for?',
    options: [
      'To define a part of the Redux store',
      'To group multiple elements without adding extra nodes to the DOM',
      'To handle forms',
      'To optimize application performance',
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: 'Which command is used to create a new React app?',
    options: [
      'npm create react-app my-app',
      'npm init react-app my-app',
      'npx create-react-app my-app',
      'react-cli create my-app',
    ],
    correctAnswer: 10,
  },
];

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [finish, setFinish] = useState(false);
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);
  const [curr, setCurr] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('quiz_name', name);
    // localStorage.setItem("quiz_score" , score)
  }, [name]);

  useEffect(() => {
    const getName = localStorage.getItem('quiz_name');
    // const getScore = localStorage.getItem("quiz_score");
    setName(getName);
    // setScore(getScore);
  }, []);

  const handleAns = (cr, id) => {
    let tempScore = score;

    if (QUESTIONS[cr].correctAnswer == id) {
      tempScore += 2;
    } else {
      tempScore = Math.max(0 , tempScore-1);
    }

    setScore(tempScore);

    if (curr + 1 < QUESTIONS.length) {
      setCurr((prev) => prev + 1);
    } else {
      finishQuiz(tempScore);
    }
  };

  const finishQuiz = (finalScore) => {
    setFinish(true);

    const newResult = {
      name,
      score: finalScore,
      date: new Date().toISOString(),
    };

    const oldResult = JSON.parse(localStorage.getItem('quiz_result')) || [];

    localStorage.setItem(
      'quiz_result',
      JSON.stringify([...oldResult, newResult])
    );
  };

  console.log('====================================');
  console.log(finish);
  console.log(name);
  console.log(score);
  console.log('====================================');

  return (
    <div className="px-20 py-12">
      <button
        className="absolute top-5 right-5 rounded bg-black px-6 py-2 text-white"
        onClick={() => navigate('/leaderboard')}
      >
        LeaderBoard
      </button>
      {!started && !finish && (
        <div className="felx flex-col">
          <h2 className="mb-4 text-2xl font-semibold">Start Quiz</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-l border px-3 py-1"
          />
          <button
            className="rounded-r bg-black px-4 py-1 text-white"
            onClick={() => {
              if (!name.trim()) return;
              setStarted(true);
            }}
          >
            Start Quiz
          </button>
        </div>
      )}
      {/* question  */}
      {started && !finish && (
        <div>
          <h3 className="mb-4 text-2xl font-bold">
            QUESTIONS {curr + 1} / {QUESTIONS.length}
          </h3>
          <div className="rounded-2xl border p-6">
            <p className="mb-2 text-xl font-semibold">
              {QUESTIONS[curr].question}
            </p>
            <div className="flex flex-col items-start">
              {QUESTIONS[curr].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAns(curr, idx)}
                  className={`m-2 rounded border px-6 py-2 text-lg ${idx % 2 == 0 ? 'bg-gray-300' : 'bg-gray-100'}`}
                >
                  <span className="rounded-full border bg-black px-3 py-1 text-white">
                    {idx + 1}
                  </span>{' '}
                  - {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* score  */}
      {finish && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">Your Score is:</h1>
          <span className="m-6 rounded-full border bg-amber-300 px-4 py-2 text-4xl font-bold">
            {score}
          </span>
          <button
            className="mb-4 rounded bg-black px-4 py-2 text-white"
            onClick={() => {
              setStarted(false);
              setScore(0);
              setCurr(0);
              setFinish(false);
            }}
          >
            Restart
          </button>
          <button
            className="rounded bg-black px-4 py-2 text-white"
            onClick={() => navigate('/leaderboard')}
          >
            Leader Board
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
