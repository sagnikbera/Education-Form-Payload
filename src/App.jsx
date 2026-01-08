import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import EducationForm from './pages/EducationForm';
import Quiz from './pages/Quiz';
import LeaderBoard from './pages/LeaderBoard';

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EducationForm />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
