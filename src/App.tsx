import React, { useState } from 'react';
import Header from './components/Header';
import WelcomeSection from './components/WelcomeSection';
import SurveyForm from './components/SurveyForm';

function App() {
  const [showSurvey, setShowSurvey] = useState(false);

  const handleStartSurvey = () => {
    setShowSurvey(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {!showSurvey ? (
        <WelcomeSection onStartSurvey={handleStartSurvey} />
      ) : (
        <SurveyForm />
      )}
      
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © 2025 HealthSurvey Pro. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;