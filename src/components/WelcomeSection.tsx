import React from 'react';
import { Shield, Clock, Users } from 'lucide-react';

interface WelcomeSectionProps {
  onStartSurvey: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onStartSurvey }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-teal-50 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Comprehensive Health Assessment
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Complete this confidential medical survey to help healthcare professionals better understand your health status and provide personalized recommendations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center">
            <div className="p-3 bg-blue-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Confidential</h3>
            <p className="text-sm text-gray-600">Your information is protected with industry-standard encryption</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-3 bg-teal-100 rounded-full mb-4">
              <Clock className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick & Easy</h3>
            <p className="text-sm text-gray-600">Takes only 5-10 minutes to complete</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-3 bg-orange-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Review</h3>
            <p className="text-sm text-gray-600">Reviewed by qualified healthcare professionals</p>
          </div>
        </div>

        <button
          onClick={onStartSurvey}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Start Health Assessment
        </button>
        
        <p className="text-sm text-gray-500 mt-6">
          By proceeding, you agree to our privacy policy and terms of service.
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;