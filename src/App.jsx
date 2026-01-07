import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import EducationForm from './pages/EducationForm';

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EducationForm />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
