import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { useSearchHistory } from '../context/SearchHistoryContext';

function SearchHistoryScreen() {
  const navigate = useNavigate();
  const { searchHistory } = useSearchHistory();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mb-6 text-gray-300 hover:text-white"
      >
        <ArrowLeft size={20} />
        <span>Back to Search</span>
      </button>

      <h1 className="text-3xl font-bold text-white mb-6">Search History</h1>

      <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        {searchHistory.length === 0 ? (
          <div className="p-6 text-center text-gray-400">No search history yet</div>
        ) : (
          <ul className="divide-y divide-gray-700">
            {searchHistory.map((item, index) => (
              <li key={index} className="p-4 hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-4">
                  <Clock size={20} className="text-gray-400" />
                  <div>
                    <p className="font-medium text-white">{item.query}</p>
                    <p className="text-sm text-gray-400">
                      {item.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchHistoryScreen;