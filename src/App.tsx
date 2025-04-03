import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchScreen from './screens/SearchScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import SearchHistoryScreen from './screens/SearchHistoryScreen';
import { SearchHistoryProvider } from './context/SearchHistoryContext';

function App() {
  return (
    <SearchHistoryProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
          <Routes>
            <Route path="/" element={<SearchScreen />} />
            <Route path="/movie/:id" element={<MovieDetailsScreen />} />
            <Route path="/history" element={<SearchHistoryScreen />} />
          </Routes>
        </div>
      </Router>
    </SearchHistoryProvider>
  );
}

export default App;