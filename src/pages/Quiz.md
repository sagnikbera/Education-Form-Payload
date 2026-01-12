import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Quiz = () => {
  // 1. New State for AI questions
  const [questions, setQuestions] = useState([]);
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [loading, setLoading] = useState(false);

  // Existing Quiz State
  const [score, setScore] = useState(0);
  const [finish, setFinish] = useState(false);
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);
  const [curr, setCurr] = useState(0);
  const [ans, setAns] = useState([]);
  const [timeleft, setTimeLeft] = useState(0);

  const navigate = useNavigate();

  // Load name from storage
  useEffect(() => {
    const storedName = localStorage.getItem('quiz_name');
    if (storedName) setName(storedName);
  }, []);

  useEffect(() => {
    localStorage.setItem('quiz_name', name);
  }, [name]);

  // Timer logic based on dynamic questions
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

  // 2. Updated API call to your backend
  const handleStartAIQuiz = async () => {
    if (!name.trim() || !topic.trim()) {
      alert('Please enter both Name and Topic');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, count: numQuestions }),
      });

      if (!res.ok) throw new Error('Failed to generate quiz');

      const data = await res.json();
      
      // 3. Populate state with AI data
      setQuestions(data);
      setAns([]);
      setCurr(0);
      setTimeLeft(data.length * 60); // 1 minute per question
      setStarted(true);
    } catch (err) {
      console.error(err);
      alert('Quiz generation failed. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const finishQuiz = () => {
    let finalScore = 0;
    // Calculate score using dynamic questions array
    questions.forEach((q, i) => {
      const userAns = ans[i];
      if (userAns !== undefined) {
        if (userAns === q.correctAnswer) finalScore += 2;
        else finalScore = Math.max(0, finalScore - 1);
      }
    });

    setScore(finalScore);
    setFinish(true);

    const results = JSON.parse(localStorage.getItem('quiz_result')) || [];
    results.push({ name, score: finalScore, topic, date: new Date().toISOString() });
    localStorage.setItem('quiz_result', JSON.stringify(results));
  };

  // UI remains similar but uses 'questions' state instead of 'QUESTIONS' constant
  return (
    <div className="px-20 py-12 min-h-screen bg-gray-50">
      {!started && !finish && (
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-5">
          <h2 className="text-3xl font-bold text-center">AI Quiz</h2>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" />
          <input placeholder="Topic (e.g. Java)" value={topic} onChange={(e) => setTopic(e.target.value)} className="border p-2 rounded" />
          <div className="flex gap-2">
            {[10, 15, 20].map(n => (
              <button key={n} onClick={() => setNumQuestions(n)} className={`flex-1 border p-1 rounded ${numQuestions === n ? 'bg-black text-white' : ''}`}>{n}</button>
            ))}
          </div>
          <button onClick={handleStartAIQuiz} disabled={loading} className="bg-blue-600 text-white p-3 rounded font-bold">
            {loading ? 'Generating...' : 'Start Quiz'}
          </button>
        </div>
      )}

      {started && !finish && questions.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Question {curr + 1} / {questions.length}</h3>
          <div className="bg-white p-8 rounded-2xl shadow">
            <p className="text-xl font-semibold mb-6">{questions[curr].question}</p>
            {questions[curr].options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAns(curr, idx)} className={`w-full mb-3 p-4 border rounded ${ans[curr] === idx ? 'bg-blue-600 text-white' : ''}`}>
                {idx + 1}. {opt}
              </button>
            ))}
            <div className="flex justify-between mt-6">
              <button disabled={curr === 0} onClick={() => setCurr(curr - 1)}><FaChevronLeft /> Back</button>
              <button disabled={curr === questions.length - 1} onClick={() => setCurr(curr + 1)}>Next <FaChevronRight /></button>
            </div>
            <button className="mt-6 bg-red-600 text-white px-6 py-2 rounded" onClick={finishQuiz}>Submit</button>
          </div>
        </div>
      )}

      {finish && (
        <div className="text-center bg-white p-10 rounded shadow max-w-md mx-auto">
          <h2 className="text-2xl font-bold">Score: {score}</h2>
          <button onClick={() => navigate('/anspage', { state: { ans, customQuestions: questions } })} className="mt-4 bg-blue-600 text-white p-3 rounded">Review Answers</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;