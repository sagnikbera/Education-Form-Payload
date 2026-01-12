import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

const LeaderBoard = () => {
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const res = localStorage.getItem('quiz_result');
    if (res) setResult(JSON.parse(res));
  }, []);

  const clearResult = () => {
    localStorage.removeItem('quiz_result');
    setResult([]);
  };

  const columns = [
    { name: '#', cell: (row, index) => index + 1, width: '60px' },
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { id: 'score', name: 'Score', selector: (row) => row.score, sortable: true },
    { name: 'Date', selector: (row) => new Date(row.date).toLocaleDateString() },
  ];

  return (
    <div className="mx-auto max-w-3xl p-10">
      <h2 className="mb-6 text-3xl font-semibold">LeaderBoard</h2>
      <DataTable
        columns={columns}
        data={result}
        pagination
        highlightOnHover
        defaultSortFieldId="score"
        defaultSortAsc={false}
        className="rounded-2xl border"
      />
      <div className="mt-6 flex justify-between">
        {result.length > 0 && <button onClick={clearResult} className="rounded bg-black px-6 py-2 text-white">Clear Result</button>}
        <button className="rounded bg-black px-6 py-2 text-white" onClick={() => navigate('/quiz')}>Back to Quiz</button>
      </div>
    </div>
  );
};

export default LeaderBoard;