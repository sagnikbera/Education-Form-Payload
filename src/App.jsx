import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import EducationForm from './pages/EducationForm';
import Quiz from './pages/Quiz';
import LeaderBoard from './pages/LeaderBoard';
import AnsPage from './pages/AnsPage';

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EducationForm />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/anspage" element={<AnsPage />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
