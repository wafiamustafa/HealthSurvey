import React from 'react';
import { Stethoscope } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Stethoscope className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">HealthSurvey Pro</h1>
            <p className="text-sm text-gray-600">Professional Medical Assessment</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;