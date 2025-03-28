import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-blue-700 dark:bg-blue-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              KwDose - Ketamine Dosage Calculator
            </p>
            <p className="text-xs mt-1">
              For medical information purposes only. Consult a healthcare professional.
            </p>
          </div>
          
          <div className="flex items-center">
            <a 
              href="https://www.zapt.ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm hover:underline"
            >
              Made on ZAPT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}