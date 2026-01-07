import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    education: [
      {
        degree: '',
        yearOfPassing: '',
        grade: '',
      },
    ],
  });

  const val = { formData, setFormData };

  return <FormContext.Provider value={val}>{children}</FormContext.Provider>;
};

export const useFormContext = () => useContext(FormContext);
