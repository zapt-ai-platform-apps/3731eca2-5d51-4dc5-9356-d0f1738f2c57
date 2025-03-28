import React, { useState, useEffect } from 'react';
import { FaSave, FaTrash, FaDownload, FaUpload, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsPage() {
  const [units, setUnits] = useState('metric');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    const storedUnits = localStorage.getItem('kw-units');
    if (storedUnits) {
      setUnits(storedUnits);
    }
  }, []);
  
  // Save settings to localStorage
  const saveSettings = () => {
    try {
      localStorage.setItem('kw-units', units);
      
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };
  
  // Export saved doses as JSON
  const exportData = () => {
    try {
      const storedDoses = localStorage.getItem('kw-saved-doses');
      if (storedDoses) {
        const dataStr = JSON.stringify(JSON.parse(storedDoses), null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kwdose-export-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        alert('No saved data to export');
      }
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };
  
  // Import data from JSON file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          // Validate JSON format
          JSON.parse(e.target.result);
          localStorage.setItem('kw-saved-doses', e.target.result);
          alert('Data imported successfully');
        } catch (error) {
          console.error('Error validating imported data:', error);
          alert('Invalid data format');
        }
      };
      reader.readAsText(file);
    }
  };
  
  // Clear all saved data
  const clearAllData = () => {
    try {
      localStorage.removeItem('kw-saved-doses');
      setShowClearConfirm(false);
      alert('All saved dosage data has been cleared');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-8 text-center">Settings</h1>
      
      <div className="max-w-2xl mx-auto card">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">Preferences</h2>
          
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Default Weight Units
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  className="mr-2"
                  name="units"
                  value="metric"
                  checked={units === 'metric'}
                  onChange={() => setUnits('metric')}
                />
                Metric (kg)
              </label>
              <label className="flex items-center text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  className="mr-2"
                  name="units"
                  value="imperial"
                  checked={units === 'imperial'}
                  onChange={() => setUnits('imperial')}
                />
                Imperial (lbs)
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Theme
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  className="mr-2"
                  name="theme"
                  value="light"
                  checked={theme === 'light'}
                  onChange={() => setTheme('light')}
                />
                <FaSun className="mr-1" /> Light
              </label>
              <label className="flex items-center text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  className="mr-2"
                  name="theme"
                  value="dark"
                  checked={theme === 'dark'}
                  onChange={() => setTheme('dark')}
                />
                <FaMoon className="mr-1" /> Dark
              </label>
            </div>
          </div>
          
          <button
            className="btn-primary flex items-center cursor-pointer"
            onClick={saveSettings}
          >
            <FaSave className="mr-2" /> Save Preferences
          </button>
          
          {showSaveSuccess && (
            <div className="mt-4 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 p-3 rounded-md">
              Settings saved successfully!
            </div>
          )}
        </div>
        
        <div className="pt-6 border-t dark:border-gray-700">
          <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">Data Management</h2>
          
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Export your saved dosage calculations as a JSON file for backup or transfer to another device.
            </p>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition duration-200 flex items-center cursor-pointer"
              onClick={exportData}
            >
              <FaDownload className="mr-2" /> Export Data
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Import previously exported dosage data.
            </p>
            <label className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200 cursor-pointer w-fit">
              <FaUpload className="mr-2" /> Import Data
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Clear all saved dosage calculations. This action cannot be undone.
            </p>
            {!showClearConfirm ? (
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition duration-200 flex items-center cursor-pointer"
                onClick={() => setShowClearConfirm(true)}
              >
                <FaTrash className="mr-2" /> Clear All Data
              </button>
            ) : (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <p className="text-red-700 dark:text-red-300 mb-4">
                  Are you sure you want to clear all saved dosage data? This cannot be undone.
                </p>
                <div className="flex space-x-4">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition duration-200 cursor-pointer"
                    onClick={clearAllData}
                  >
                    Yes, Clear Data
                  </button>
                  <button
                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200 cursor-pointer"
                    onClick={() => setShowClearConfirm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}