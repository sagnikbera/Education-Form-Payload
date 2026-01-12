import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Quiz = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [score, setScore] = useState(0);
  const [finish, setFinish] = useState(false);
  const [started, setStarted] = useState(false);
  const [curr, setCurr] = useState(0);
  const [ans, setAns] = useState([]);
  const [timeleft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories));
    
    const storedName = localStorage.getItem('quiz_name');
    if (storedName) setName(storedName);
  }, []);

  useEffect(() => {
    if (!started || finish) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, finish]);

  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const handleStartQuiz = async () => {
    if (!name.trim()) return alert("Please enter your name");
    setLoading(true);
    let apiUrl = `https://opentdb.com/api.php?amount=${amount}`;
    if (category) apiUrl += `&category=${category}`;
    if (difficulty) apiUrl += `&difficulty=${difficulty}`;
    if (type) apiUrl += `&type=${type}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      if (data.response_code === 0) {
        const formatted = data.results.map((q) => {
          const opts = [...q.incorrect_answers, q.correct_answer]
            .map(decodeHTML)
            .sort(() => Math.random() - 0.5);
          return {
            question: decodeHTML(q.question),
            options: opts,
            correctAnswer: opts.indexOf(decodeHTML(q.correct_answer))
          };
        });
        setQuestions(formatted);
        setAns(new Array(formatted.length).fill(undefined));
        setTimeLeft(formatted.length * 60);
        setStarted(true);
        localStorage.setItem('quiz_name', name);
      }
    } catch (error) {
      alert("Error fetching trivia.");
    } finally {
      setLoading(false);
    }
  };

  const handleAns = (qIdx, optIdx) => {
    const updated = [...ans];
    updated[qIdx] = optIdx;
    setAns(updated);
    if (curr + 1 < questions.length) setCurr(curr + 1);
  };

  const finishQuiz = () => {
    let finalScore = 0;
    questions.forEach((q, i) => {
      if (ans[i] === q.correctAnswer) finalScore += 2;
      else if (ans[i] !== undefined) finalScore = Math.max(0, finalScore - 1);
    });
    setScore(finalScore);
    setFinish(true);
    const results = JSON.parse(localStorage.getItem('quiz_result')) || [];
    results.push({ name, score: finalScore, date: new Date().toISOString() });
    localStorage.setItem('quiz_result', JSON.stringify(results));
  };

  if (loading) return <div className="p-20 text-center text-2xl">Loading Trivia...</div>;

  return (
    <div className="px-20 py-12">
      <button className="absolute top-5 right-5 rounded bg-black px-6 py-2 text-white" onClick={() => navigate('/leaderboard')}>LeaderBoard</button>

      {!started && !finish ? (
        <div className="flex flex-col max-w-lg gap-4 mx-auto border p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Quiz Setup</h2>
          <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" />
          <div className="flex gap-2 items-center">
            <span className="font-semibold">Questions:</span>
            {[10, 15, 20, 25].map(n => (
              <button key={n} onClick={() => setAmount(n)} className={`border px-3 py-1 rounded ${amount === n ? 'bg-black text-white' : 'bg-gray-100'}`}>{n}</button>
            ))}
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
            <option value="">Any Category</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="border p-2 rounded">
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded">
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
          <button onClick={handleStartQuiz} className="bg-black text-white py-2 rounded font-bold mt-4">Start Quiz</button>
        </div>
      ) : started && !finish ? (
        <div>
          <h2 className="mb-4 text-xl font-bold text-red-600">Time Left: {Math.floor(timeleft/60)}:{timeleft%60 < 10 ? '0':''}{timeleft%60}</h2>
          <h3 className="mb-4 text-2xl font-bold">QUESTIONS {curr + 1} / {questions.length}</h3>
          <div className="rounded-2xl border p-6">
            <p className="mb-2 text-xl font-semibold">{questions[curr].question}</p>
            <div className="flex flex-col items-start">
              {questions[curr].options.map((opt, idx) => (
                <button key={idx} onClick={() => handleAns(curr, idx)} className={`m-2 rounded border px-6 py-2 text-lg ${idx % 2 === 0 ? 'bg-gray-300' : 'bg-gray-100'}`}>
                  <span className="rounded-full border bg-black px-3 py-1 text-white">{idx + 1}</span> - {opt}
                </button>
              ))}
            </div>
            <div className="flex gap-4 justify-between mt-4">
              <div className='flex gap-4'>
                <button className="flex items-center justify-center rounded bg-blue-500 px-3 py-1" onClick={() => setCurr(curr - 1)} disabled={curr === 0}><FaChevronLeft /><span className="font-semibold">Back</span></button>
                <button className="flex items-center justify-center rounded bg-blue-500 px-3 py-1" onClick={() => setCurr(curr + 1)} disabled={curr === questions.length - 1}><span className="font-semibold">Next</span><FaChevronRight /></button>
              </div>
              <button className="rounded bg-black px-4 py-1 font-semibold text-white" onClick={() => window.confirm("Finish exam?") && finishQuiz()}>Submit Test</button>
            </div>
          </div>
          {/* STATUS BAR */}
          <div className="mt-6 flex gap-2 flex-wrap">
            {questions.map((_, index) => {
              const userSelectedId = ans[index];
              const isAnswered = userSelectedId !== undefined;
              const isCorrect = isAnswered && userSelectedId === questions[index].correctAnswer;
              return (
                <div key={index} className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${!isAnswered ? 'bg-gray-300 text-black' : isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{index + 1}</div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">Your Score is:</h1>
          <span className="m-6 rounded-full border bg-amber-300 px-4 py-2 text-4xl font-bold">{score}</span>
          <button className="mb-4 rounded bg-black px-4 py-2 text-white" onClick={() => window.location.reload()}>Restart</button>
          <button className="mb-4 rounded bg-black px-4 py-2 text-white" onClick={() => navigate('/anspage', { state: { ans, customQuestions: questions } })}>See Ans</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;