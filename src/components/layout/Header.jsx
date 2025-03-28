import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'Information', href: '/info' },
    { name: 'Saved Doses', href: '/saved' },
    { name: 'Settings', href: '/settings' },
  ];
  
  return (
    <header className="bg-blue-600 dark:bg-blue-800 text-white sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">KwDose</Link>
          
          <div className="flex items-center">
            {/* Theme toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 mr-4 rounded-full hover:bg-blue-700 dark:hover:bg-blue-700 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-700 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <Link 
                key={item.name}
                to={item.href}
                className={`${
                  location.pathname === item.href 
                    ? 'border-b-2 border-white font-medium' 
                    : 'hover:border-b-2 hover:border-white'
                } pb-1 transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col space-y-4 animate-fadeIn">
            {navigation.map((item) => (
              <Link 
                key={item.name}
                to={item.href}
                className={`${
                  location.pathname === item.href 
                    ? 'font-bold' 
                    : ''
                } block py-2`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}