import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaChartLine, FaExchangeAlt } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-purple-500">
            CryptoAI
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-purple-400 transition duration-300">Home</Link>
            <Link to="/dashboard" className="hover:text-purple-400 transition duration-300">Dashboard</Link>
            <Link to="/swap" className="hover:text-purple-400 transition duration-300">Swap</Link>
            <Link to="/profile" className="hover:text-purple-400 transition duration-300">Profile</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300">
              Connect Wallet
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-2">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-700">Home</Link>
          <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link>
          <Link to="/swap" className="block px-4 py-2 hover:bg-gray-700">Swap</Link>
          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">Profile</Link>
          <button className="block w-full text-left px-4 py-2 bg-purple-600 hover:bg-purple-700 transition duration-300">
            Connect Wallet
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
