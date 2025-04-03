import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, History } from 'lucide-react';
import { searchMovies } from '../api';
import { Movie } from '../types';
import { useSearchHistory } from '../context/SearchHistoryContext';

function SearchScreen() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToHistory } = useSearchHistory();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const results = await searchMovies(query);
      setMovies(results);
      addToHistory(query);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-white">Movie Search</h1>
        <button
          onClick={() => navigate('/history')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <History size={20} />
          <span>History</span>
        </button>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-2 top-1.5 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <div className="mt-8 text-center text-white">Loading...</div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
              className="bg-gray-800 rounded-lg shadow-xl overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-all duration-300 border border-gray-700"
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                alt={movie.Title}
                className="w-full h-[400px] object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{movie.Title}</h3>
                <p className="text-gray-400">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchScreen;