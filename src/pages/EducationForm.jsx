import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';

const EducationForm = () => {
  const { formData, setFormData } = useFormContext();
  const [payload, setPayload] = useState(null);
  console.log(formData);

  const handleChange = (index, field, value) => {
    const copyEduArr = [...formData.education];
    copyEduArr[index][field] = value;

    setFormData({
      ...formData,
      education: copyEduArr,
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degree: '', yearOfPassing: '', grade: '' },
      ],
    });
  };

  const genPayLoad = () => {
    const payloadObj = {
      name: formData.name,
      gender: formData.gender,
      education: formData.education.map((edu) => ({
        degree: edu.degree,
        yearOfPassing: edu.yearOfPassing,
        grade: edu.grade,
      })),
    };

    setPayload(payloadObj);

    console.log(payload);
  };

  const removeEdu = (index) => {
    const updateEdu = formData.education.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      education: updateEdu,
    });
  };

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.gender.trim() !== '' &&
    formData.education.every(
      (edu) =>
        edu.degree.trim() !== '' &&
        edu.yearOfPassing.trim() !== '' &&
        edu.grade.trim() !== ''
    );

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h2 className="mb-6 text-2xl font-semibold">Education Details</h2>
      <div className="mb-6 rounded-lg border p-4">
        <h2 className="mb-4 text-xl font-semibold">Basic Details</h2>

        <div className="grid">
          <div className="grid grid-cols-2 gap-2">
            {/* name  */}
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="rounded border p-2"
            />
            {/* gender  */}
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="rounded border p-2"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* education  */}
          <h2 className="mb-4 text-xl font-semibold">Education Details</h2>
          {formData.education.map((edu, idx) => (
            <div key={idx} className="rounded-lf mb-4 border p-4 shadow-sm">
              <div className="grid-col-3 flex justify-between">
                {/* degree */}
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleChange(idx, 'degree', e.target.value)}
                  className="rounded border p-2"
                />
                {/* yearOfPassing  */}
                <input
                  type="text"
                  placeholder="yearOfPassing"
                  value={edu.yearOfPassing}
                  onChange={(e) =>
                    handleChange(idx, 'yearOfPassing', e.target.value)
                  }
                  className="rounded border p-2"
                />
                {/* grade  */}
                <select
                  name=""
                  id=""
                  value={edu.grade}
                  className="rounded border p-2"
                  onChange={(e) => handleChange(idx, 'grade', e.target.value)}
                >
                  <option value="" disabled>
                    Select Grade
                  </option>
                  <option value="O">O</option>
                  <option value="E">E</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>
              {formData.education.length > 1 && (
                <button
                  onClick={() => removeEdu(idx)}
                  className="mt-3 rounded bg-red-500/80 px-2 py-1 text-sm font-semibold text-black/80"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={genPayLoad}
            className={`rounded bg-black px-6 py-2 font-semibold text-white`}
            disabled={!isFormValid}
          >
            Generate Payload
          </button>
          <button
            onClick={addEducation}
            className="rounded bg-black px-4 py-1 font-semibold text-white"
            disabled={!isFormValid}
          >
            Add More
          </button>
        </div>
      </div>
      {payload !== null && (
        <div className="rounded border px-4 py-6">
          <h2 className="mb-6 text-xl font-semibold">Payload</h2>
          <p className="">{JSON.stringify(payload)}</p>
        </div>
      )}
    </div>
  );
};

export default EducationForm;
