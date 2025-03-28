import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalculator, FaBookMedical, FaSave, FaInfoCircle } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-400 mb-4">KwDose</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
          Your Ketamine Dosage Calculator & Tracker
        </p>
        <Link 
          to="/calculator" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-200 cursor-pointer flex items-center justify-center max-w-xs mx-auto"
        >
          <FaCalculator className="mr-2" /> Calculate Dosage
        </Link>
      </section>
      
      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="card">
          <FaCalculator className="text-blue-600 dark:text-blue-400 text-4xl mb-3" />
          <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-400 mb-3">Accurate Calculation</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Get precise ketamine dosage calculations based on weight, route of administration, and purpose.
          </p>
        </div>
        
        <div className="card">
          <FaSave className="text-blue-600 dark:text-blue-400 text-4xl mb-3" />
          <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-400 mb-3">Save Your Doses</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Save your dosage calculations for future reference and track your treatment history.
          </p>
        </div>
        
        <div className="card">
          <FaBookMedical className="text-blue-600 dark:text-blue-400 text-4xl mb-3" />
          <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-400 mb-3">Medical Information</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Access comprehensive information about ketamine usage, effects, and best practices.
          </p>
        </div>
      </section>
      
      <section className="card mb-12">
        <div className="flex items-start">
          <FaInfoCircle className="text-blue-600 dark:text-blue-400 text-2xl mr-3 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4">Important Information</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              KwDose is provided for informational purposes only. It is designed to be used by medical professionals
              or under the guidance of healthcare providers.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Always consult with a qualified healthcare professional before administering any medication.
              Ketamine should only be used as prescribed by a doctor.
            </p>
          </div>
        </div>
      </section>
      
      <section className="text-center mb-12">
        <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-6">Get Started Now</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <Link 
            to="/calculator" 
            className="btn-primary flex items-center justify-center cursor-pointer"
          >
            <FaCalculator className="mr-2" /> Use Calculator
          </Link>
          <Link 
            to="/info" 
            className="btn-primary flex items-center justify-center cursor-pointer"
          >
            <FaBookMedical className="mr-2" /> Learn About Ketamine
          </Link>
        </div>
      </section>
    </div>
  );
}