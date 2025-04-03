import React, { createContext, useContext, useState } from 'react';
import { SearchHistory } from '../types';

interface SearchHistoryContextType {
  searchHistory: SearchHistory[];
  addToHistory: (query: string) => void;
}

const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

export function SearchHistoryProvider({ children }: { children: React.ReactNode }) {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  const addToHistory = (query: string) => {
    setSearchHistory(prev => [
      { query, timestamp: new Date() },
      ...prev
    ]);
  };

  return (
    <SearchHistoryContext.Provider value={{ searchHistory, addToHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
}

export function useSearchHistory() {
  const context = useContext(SearchHistoryContext);
  if (!context) {
    throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  }
  return context;
}