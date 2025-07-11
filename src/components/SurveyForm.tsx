import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';

interface FormData {
  personalInfo: {
    name: string;
    age: string;
    gender: string;
    email: string;
  };
  healthHistory: {
    chronicConditions: string[];
    currentMedications: string;
    allergies: string;
    familyHistory: string[];
  };
  lifestyle: {
    exerciseFrequency: string;
    smokingStatus: string;
    alcoholConsumption: string;
    sleepHours: string;
  };
  symptoms: {
    recentSymptoms: string[];
    painLevel: string;
    additionalComments: string;
  };
}

const SurveyForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      name: '',
      age: '',
      gender: '',
      email: ''
    },
    healthHistory: {
      chronicConditions: [],
      currentMedications: '',
      allergies: '',
      familyHistory: []
    },
    lifestyle: {
      exerciseFrequency: '',
      smokingStatus: '',
      alcoholConsumption: '',
      sleepHours: ''
    },
    symptoms: {
      recentSymptoms: [],
      painLevel: '',
      additionalComments: ''
    }
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 4;

  const handleInputChange = (section: keyof FormData, field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section: keyof FormData, field: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[section][field] as string[];
      const newArray = checked 
        ? [...currentArray, value]
        : currentArray.filter(item => item !== value);
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      };
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Survey submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your medical survey has been successfully submitted. Our healthcare professionals will review your responses and contact you if needed.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
              setFormData({
                personalInfo: { name: '', age: '', gender: '', email: '' },
                healthHistory: { chronicConditions: [], currentMedications: '', allergies: '', familyHistory: [] },
                lifestyle: { exerciseFrequency: '', smokingStatus: '', alcoholConsumption: '', sleepHours: '' },
                symptoms: { recentSymptoms: [], painLevel: '', additionalComments: '' }
              });
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Take Another Survey
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {currentStep === 1 && (
        <div>
          <QuestionCard title="Personal Information" subtitle="Please provide your basic information">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.personalInfo.name}
                  onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="120"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.personalInfo.age}
                  onChange={(e) => handleInputChange('personalInfo', 'age', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.personalInfo.gender}
                  onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                />
              </div>
            </div>
          </QuestionCard>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <QuestionCard title="Medical History" subtitle="Please provide information about your medical background">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Do you have any chronic conditions? (Select all that apply)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Arthritis', 'None'].map((condition) => (
                    <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={formData.healthHistory.chronicConditions.includes(condition)}
                        onChange={(e) => handleArrayChange('healthHistory', 'chronicConditions', condition, e.target.checked)}
                      />
                      <span className="text-sm text-gray-700">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="List all medications you're currently taking..."
                  value={formData.healthHistory.currentMedications}
                  onChange={(e) => handleInputChange('healthHistory', 'currentMedications', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Known Allergies</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., penicillin, peanuts, latex..."
                  value={formData.healthHistory.allergies}
                  onChange={(e) => handleInputChange('healthHistory', 'allergies', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Family History (Select all that apply)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Heart Disease', 'Cancer', 'Diabetes', 'Stroke', 'Mental Health Issues', 'None'].map((condition) => (
                    <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={formData.healthHistory.familyHistory.includes(condition)}
                        onChange={(e) => handleArrayChange('healthHistory', 'familyHistory', condition, e.target.checked)}
                      />
                      <span className="text-sm text-gray-700">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </QuestionCard>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <QuestionCard title="Lifestyle Information" subtitle="Help us understand your daily habits">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">How often do you exercise?</label>
                <div className="space-y-2">
                  {['Daily', '3-4 times per week', '1-2 times per week', 'Rarely', 'Never'].map((frequency) => (
                    <label key={frequency} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="exerciseFrequency"
                        value={frequency}
                        className="text-blue-600 focus:ring-blue-500"
                        checked={formData.lifestyle.exerciseFrequency === frequency}
                        onChange={(e) => handleInputChange('lifestyle', 'exerciseFrequency', e.target.value)}
                      />
                      <span className="text-sm text-gray-700">{frequency}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Smoking Status</label>
                <div className="space-y-2">
                  {['Never smoked', 'Former smoker', 'Current smoker (occasional)', 'Current smoker (daily)'].map((status) => (
                    <label key={status} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="smokingStatus"
                        value={status}
                        className="text-blue-600 focus:ring-blue-500"
                        checked={formData.lifestyle.smokingStatus === status}
                        onChange={(e) => handleInputChange('lifestyle', 'smokingStatus', e.target.value)}
                      />
                      <span className="text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alcohol Consumption</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.lifestyle.alcoholConsumption}
                  onChange={(e) => handleInputChange('lifestyle', 'alcoholConsumption', e.target.value)}
                >
                  <option value="">Select frequency</option>
                  <option value="never">Never</option>
                  <option value="rarely">Rarely (special occasions)</option>
                  <option value="weekly">1-2 times per week</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Average Sleep Hours per Night</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.lifestyle.sleepHours}
                  onChange={(e) => handleInputChange('lifestyle', 'sleepHours', e.target.value)}
                >
                  <option value="">Select hours</option>
                  <option value="less-than-5">Less than 5 hours</option>
                  <option value="5-6">5-6 hours</option>
                  <option value="7-8">7-8 hours</option>
                  <option value="9-10">9-10 hours</option>
                  <option value="more-than-10">More than 10 hours</option>
                </select>
              </div>
            </div>
          </QuestionCard>
        </div>
      )}

      {currentStep === 4 && (
        <div>
          <QuestionCard title="Current Symptoms" subtitle="Please describe any symptoms you're experiencing">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Recent Symptoms (Select all that apply)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Headaches', 'Fatigue', 'Dizziness', 'Nausea', 'Chest Pain', 'Shortness of Breath', 'Joint Pain', 'None'].map((symptom) => (
                    <label key={symptom} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={formData.symptoms.recentSymptoms.includes(symptom)}
                        onChange={(e) => handleArrayChange('symptoms', 'recentSymptoms', symptom, e.target.checked)}
                      />
                      <span className="text-sm text-gray-700">{symptom}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Pain Level (if applicable)</label>
                <div className="space-y-2">
                  {['No pain', 'Mild (1-3)', 'Moderate (4-6)', 'Severe (7-10)'].map((level) => (
                    <label key={level} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="painLevel"
                        value={level}
                        className="text-blue-600 focus:ring-blue-500"
                        checked={formData.symptoms.painLevel === level}
                        onChange={(e) => handleInputChange('symptoms', 'painLevel', e.target.value)}
                      />
                      <span className="text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Please provide any additional information you think might be relevant..."
                  value={formData.symptoms.additionalComments}
                  onChange={(e) => handleInputChange('symptoms', 'additionalComments', e.target.value)}
                />
              </div>
            </div>
          </QuestionCard>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>
        
        {currentStep < totalSteps ? (
          <button
            onClick={nextStep}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Submit Survey
            <CheckCircle className="h-4 w-4 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SurveyForm;