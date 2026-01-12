import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AnsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { ans, customQuestions } = state || {};

  if (!ans || !customQuestions) {
    return <p className="p-6">No answer found! <button onClick={() => navigate('/')}>Go Back</button></p>;
  }

  return (
    <div className="mx-auto max-w-3xl p-10">
      <h2 className="mt-6 mb-6 text-3xl font-bold">Ans and your attempts</h2>
      <button className="absolute top-5 right-10 rounded bg-black px-6 py-2 text-white" onClick={() => navigate('/')}>Quiz</button>
      
      <div className="rounded border p-6">
        {customQuestions.map((q, idx) => {
          const userAns = ans[idx];
          return (
            <div className="mb-4 flex flex-col rounded-2xl border p-4 text-xl font-bold" key={idx}>
              <p className="mb-4">{idx + 1}. {q.question}</p>
              <div className="ml-6 flex flex-col items-start gap-2 font-semibold">
                {q.options.map((o, i) => {
                  const isCorrectOption = i === q.correctAnswer;
                  const isUserSelection = i === userAns;

                  let bgClass = 'bg-gray-100';
                  if (isCorrectOption) bgClass = 'bg-green-500 text-white';
                  else if (isUserSelection && userAns !== q.correctAnswer) bgClass = 'bg-red-500 text-white';

                  return (
                    <button key={i} className={`flex w-full rounded border px-6 py-1 text-start ${bgClass}`} disabled>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black text-sm mr-2">{i + 1}</span>
                      - {o}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnsPage;