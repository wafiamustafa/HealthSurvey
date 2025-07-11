import React from 'react';

interface QuestionCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ children, title, subtitle }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {subtitle && (
        <p className="text-sm text-gray-600 mb-4">{subtitle}</p>
      )}
      {children}
    </div>
  );
};

export default QuestionCard;