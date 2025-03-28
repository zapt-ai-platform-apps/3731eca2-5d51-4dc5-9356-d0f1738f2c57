import React, { useState, useEffect } from 'react';
import { FaTrash, FaArrowDown, FaArrowUp, FaDownload, FaUpload, FaCalculator } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function SavedDosesPage() {
  const [savedDoses, setSavedDoses] = useState([]);
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  // Load saved doses from localStorage
  useEffect(() => {
    try {
      setIsLoading(true);
      const storedDoses = localStorage.getItem('kw-saved-doses');
      if (storedDoses) {
        setSavedDoses(JSON.parse(storedDoses));
      }
    } catch (error) {
      console.error('Error loading saved doses:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Handle deleting a saved dose
  const deleteDose = (index) => {
    const confirmed = window.confirm('Are you sure you want to delete this saved dose?');
    if (confirmed) {
      try {
        const updatedDoses = [...savedDoses];
        updatedDoses.splice(index, 1);
        setSavedDoses(updatedDoses);
        localStorage.setItem('kw-saved-doses', JSON.stringify(updatedDoses));
      } catch (error) {
        console.error('Error deleting dose:', error);
      }
    }
  };
  
  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle sort direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Export saved doses
  const exportDoses = () => {
    try {
      if (savedDoses.length === 0) {
        alert('No saved doses to export');
        return;
      }
      
      const dataStr = JSON.stringify(savedDoses, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kwdose-export-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting doses:', error);
      alert('Failed to export data');
    }
  };
  
  // Filter doses by purpose
  const filteredDoses = filter === 'all' 
    ? savedDoses 
    : savedDoses.filter(dose => dose.purpose === filter);
  
  // Sort the doses
  const sortedDoses = [...filteredDoses].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Special handling for timestamp field
    if (sortField === 'timestamp') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }
    
    // Compare based on sort direction
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
  
  // Render sort indicator
  const renderSortIndicator = (field) => {
    if (sortField === field) {
      return sortDirection === 'asc' ? <FaArrowUp className="ml-1" /> : <FaArrowDown className="ml-1" />;
    }
    return null;
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 dark:border-blue-500 border-t-transparent rounded-full animate-spin my-12"></div>
        <p>Loading saved doses...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-6 text-center">Saved Dosage Calculations</h1>
      
      {savedDoses.length === 0 ? (
        <div className="card text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">You don't have any saved dosage calculations yet.</p>
          <Link
            to="/calculator"
            className="btn-primary inline-flex items-center cursor-pointer"
          >
            <FaCalculator className="mr-2" /> Go to Calculator
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <label className="text-gray-700 dark:text-gray-300 text-sm font-medium">Filter:</label>
              <select 
                className="form-select text-sm py-1.5"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Purposes</option>
                <option value="anesthesia">Anesthesia</option>
                <option value="analgesia">Analgesia</option>
                <option value="depression">Depression</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={exportDoses}
                className="bg-green-600 dark:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 dark:hover:bg-green-600 transition duration-200 flex items-center cursor-pointer"
              >
                <FaDownload className="mr-1.5" /> Export
              </button>
              <Link
                to="/calculator"
                className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-200 flex items-center cursor-pointer"
              >
                <FaCalculator className="mr-1.5" /> New Calculation
              </Link>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    <button 
                      className="flex items-center focus:outline-none cursor-pointer"
                      onClick={() => handleSort('timestamp')}
                    >
                      Date & Time
                      {renderSortIndicator('timestamp')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    <button 
                      className="flex items-center focus:outline-none cursor-pointer"
                      onClick={() => handleSort('purpose')}
                    >
                      Purpose
                      {renderSortIndicator('purpose')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    <button 
                      className="flex items-center focus:outline-none cursor-pointer"
                      onClick={() => handleSort('route')}
                    >
                      Route
                      {renderSortIndicator('route')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    <button 
                      className="flex items-center focus:outline-none cursor-pointer"
                      onClick={() => handleSort('weight')}
                    >
                      Weight (kg)
                      {renderSortIndicator('weight')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    <button 
                      className="flex items-center focus:outline-none cursor-pointer"
                      onClick={() => handleSort('dosage')}
                    >
                      Dosage
                      {renderSortIndicator('dosage')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedDoses.map((dose, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {new Date(dose.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {dose.purpose === 'anesthesia' ? 'Anesthesia' : 
                       dose.purpose === 'analgesia' ? 'Analgesia' : 'Depression'}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {dose.route === 'iv' ? 'Intravenous' : 
                       dose.route === 'im' ? 'Intramuscular' : 
                       dose.route === 'oral' ? 'Oral' : 'Nasal'}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {dose.weight ? dose.weight.toFixed(1) : 'N/A'}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {typeof dose.dosage === 'string' ? 
                        dose.dosage : 
                        `${typeof dose.dosage === 'number' ? dose.dosage.toFixed(1) : dose.dosage} ${dose.unit}`}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button 
                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 cursor-pointer"
                        onClick={() => deleteDose(savedDoses.indexOf(dose))}
                        aria-label="Delete dose"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredDoses.length === 0 && (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                No doses match the selected filter
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}