import React, { useState, useEffect } from 'react';
import { FaSave, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function CalculatorPage() {
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState(() => {
    const storedUnits = localStorage.getItem('kw-units');
    return storedUnits === 'imperial' ? 'lbs' : 'kg';
  });
  const [route, setRoute] = useState('iv');
  const [purpose, setPurpose] = useState('anesthesia');
  const [result, setResult] = useState(null);
  const [savedDoses, setSavedDoses] = useState([]);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const navigate = useNavigate();
  
  // Load saved doses from localStorage
  useEffect(() => {
    try {
      const storedDoses = localStorage.getItem('kw-saved-doses');
      if (storedDoses) {
        setSavedDoses(JSON.parse(storedDoses));
      }
    } catch (error) {
      console.error('Error loading saved doses:', error);
    }
  }, []);
  
  // Calculate dosage
  const calculateDosage = () => {
    if (!weight || isNaN(weight) || weight <= 0) {
      alert('Please enter a valid weight');
      return;
    }
    
    setIsCalculating(true);
    
    // Simulate API delay for more app-like feel
    setTimeout(() => {
      try {
        // Convert weight to kg if in lbs
        const weightInKg = weightUnit === 'lbs' ? weight * 0.453592 : parseFloat(weight);
        
        let dosage;
        let doseRangeMin;
        let doseRangeMax;
        let unit = 'mg';
        
        if (route === 'iv') {
          if (purpose === 'anesthesia') {
            doseRangeMin = 1.0;
            doseRangeMax = 2.0;
            dosage = weightInKg * 1.5; // Middle of the range
          } else if (purpose === 'analgesia') {
            doseRangeMin = 0.2;
            doseRangeMax = 0.5;
            dosage = weightInKg * 0.3; // Middle of the range
          } else { // depression
            doseRangeMin = 0.5;
            doseRangeMax = 1.0;
            dosage = weightInKg * 0.5; // Low end for depression treatment
          }
        } else if (route === 'im') {
          if (purpose === 'anesthesia') {
            doseRangeMin = 4.0;
            doseRangeMax = 10.0;
            dosage = weightInKg * 5.0; // Middle of the range
          } else if (purpose === 'analgesia') {
            doseRangeMin = 2.0;
            doseRangeMax = 4.0;
            dosage = weightInKg * 3.0; // Middle of the range
          } else { // depression
            doseRangeMin = 0.5;
            doseRangeMax = 1.0;
            dosage = weightInKg * 0.5; // Used primarily for IV, but keeping the option
          }
        } else if (route === 'oral') {
          // Oral bioavailability is much lower
          if (purpose === 'analgesia') {
            doseRangeMin = 0.5;
            doseRangeMax = 1.0;
            unit = 'mg/kg';
            dosage = 0.5; // Oral dosing often expressed in mg/kg
          } else if (purpose === 'depression') {
            // Oral troches/lozenges for depression
            doseRangeMin = 50;
            doseRangeMax = 200;
            dosage = 100; // Fixed dose range
            unit = 'mg total';
          } else {
            // Oral not typically used for anesthesia
            doseRangeMin = 'N/A';
            doseRangeMax = 'N/A';
            dosage = 'Not recommended';
            unit = '';
          }
        } else if (route === 'nasal') {
          if (purpose === 'depression') {
            // Based on esketamine (Spravato) guidelines
            if (weightInKg < 65) {
              dosage = 56;
            } else {
              dosage = 84;
            }
            doseRangeMin = 56;
            doseRangeMax = 84;
            unit = 'mg total';
          } else {
            // Nasal not typically used for anesthesia or general analgesia
            doseRangeMin = 'N/A';
            doseRangeMax = 'N/A';
            dosage = 'Not recommended';
            unit = '';
          }
        }
        
        // Generate result object
        setResult({
          weight: weightInKg,
          route,
          purpose,
          dosage,
          doseRangeMin,
          doseRangeMax,
          unit,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error calculating dosage:', error);
        alert('An error occurred during calculation. Please try again.');
      } finally {
        setIsCalculating(false);
      }
    }, 600);
  };
  
  // Save the current dosage calculation
  const saveDosage = () => {
    if (!result) return;
    
    try {
      const updatedDoses = [...savedDoses, result];
      setSavedDoses(updatedDoses);
      localStorage.setItem('kw-saved-doses', JSON.stringify(updatedDoses));
      
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving dosage:', error);
      alert('Failed to save dosage. Please try again.');
    }
  };
  
  const viewSavedDoses = () => {
    navigate('/saved');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-8 text-center">Ketamine Dosage Calculator</h1>
      
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        {/* Calculator Form */}
        <div className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Weight
            </label>
            <div className="flex">
              <input
                type="number"
                className="form-input rounded-r-none"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight"
              />
              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 border-l-0 rounded-r-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 box-border"
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Route of Administration
            </label>
            <select
              className="form-select"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            >
              <option value="iv">Intravenous (IV)</option>
              <option value="im">Intramuscular (IM)</option>
              <option value="oral">Oral</option>
              <option value="nasal">Nasal Spray</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Purpose
            </label>
            <select
              className="form-select"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              <option value="anesthesia">Anesthesia</option>
              <option value="analgesia">Analgesia (Pain Relief)</option>
              <option value="depression">Depression Treatment</option>
            </select>
          </div>
          
          <button
            className="w-full btn-primary py-3 flex items-center justify-center cursor-pointer"
            onClick={calculateDosage}
            disabled={isCalculating}
          >
            {isCalculating ? (
              <>
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3"></div>
                Calculating...
              </>
            ) : (
              'Calculate Dosage'
            )}
          </button>
        </div>
        
        {/* Results Section */}
        {result && (
          <div className="border-t dark:border-gray-700 pt-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400">Calculated Dosage</h2>
              <div className="flex gap-2">
                <button 
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg"
                  onClick={saveDosage}
                >
                  <FaSave className="mr-1" /> Save
                </button>
                {savedDoses.length > 0 && (
                  <button 
                    className="flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 cursor-pointer bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-lg"
                    onClick={viewSavedDoses}
                  >
                    View Saved
                  </button>
                )}
              </div>
            </div>
            
            {showSaveSuccess && (
              <div className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 p-3 rounded-md mb-4 flex items-center">
                <FaInfoCircle className="mr-2" /> Dosage saved successfully!
              </div>
            )}
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Weight</p>
                  <p className="font-medium">{result.weight.toFixed(1)} kg</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Administration Route</p>
                  <p className="font-medium">
                    {route === 'iv' ? 'Intravenous (IV)' : 
                     route === 'im' ? 'Intramuscular (IM)' : 
                     route === 'oral' ? 'Oral' : 'Nasal Spray'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Purpose</p>
                  <p className="font-medium">
                    {purpose === 'anesthesia' ? 'Anesthesia' : 
                     purpose === 'analgesia' ? 'Analgesia (Pain Relief)' : 
                     'Depression Treatment'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Date & Time</p>
                  <p className="font-medium">
                    {new Date(result.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">Recommended Dosage</p>
                {typeof result.dosage === 'string' ? (
                  <p className="text-2xl font-bold text-red-500 dark:text-red-400 flex justify-center items-center mt-2">
                    <FaExclamationTriangle className="mr-2" />
                    {result.dosage}
                  </p>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-400 mt-2">
                      {typeof result.dosage === 'number' ? result.dosage.toFixed(1) : result.dosage} {result.unit}
                    </p>
                    {result.doseRangeMin !== 'N/A' && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Range: {result.doseRangeMin} - {result.doseRangeMax} {result.unit}
                      </p>
                    )}
                  </>
                )}
              </div>
              
              <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/40 p-4 rounded-md">
                <p className="text-sm text-yellow-800 dark:text-yellow-300 flex items-start">
                  <FaInfoCircle className="mr-2 mt-0.5 flex-shrink-0" />
                  This is a guideline only. Actual dosing should be determined by a qualified healthcare professional based on the individual patient's condition.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}