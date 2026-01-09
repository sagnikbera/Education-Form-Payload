import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QUESTIONS } from '../data/questions';

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [finish, setFinish] = useState(false);
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);
  const [curr, setCurr] = useState(0);
  const [ans, setAns] = useState([]);

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
    let isAns = false;

    if (QUESTIONS[cr].correctAnswer == id) {
      tempScore += 2;
      isAns = true;
    } else {
      tempScore = Math.max(0, tempScore - 1);
    }

    setScore(tempScore);
    setAns((prev) => [...prev, id]);

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

  // console.log('====================================');
  // console.log(finish);
  // console.log(name);
  // console.log(score);
  // console.log('====================================');

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
        <div className="">
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
              setAns([]);
            }}
          >
            Restart
          </button>
          <button
            className="mb-4 rounded bg-black px-4 py-2 text-white"
            onClick={() =>
              navigate('/anspage', {
                state: {
                  ans: ans,
                },
              })
            }
          >
            See Ans
          </button>
          <button
            className="rounded bg-black px-4 py-2 text-white"
            onClick={() => navigate('/leaderboard')}
          >
            Leader Board
          </button>
        </div>
      )}
      {/* status bas  */}
      {started && !finish && (
        <div className="mt-6 flex gap-2">
          {QUESTIONS.map((_, index) =>{
            const useSelectedId = ans[index]
            const isAnswered = useSelectedId !== undefined;
            const isCorrect = isAnswered && useSelectedId === QUESTIONS[index].correctAnswer;

            return (
            <div
              key={index}
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 font-semibold ${
                !isAnswered ? 'bg-gray-300 text-black' : isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} `}
            >
              {index + 1}
            </div>
          )})}
        </div>
      )}
    </div>
  );
};

export default Quiz;
