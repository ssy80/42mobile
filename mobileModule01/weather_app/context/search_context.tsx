import { createContext, useContext, useState, ReactNode } from 'react';


type SearchProviderProps = {
  children: ReactNode;
};

type SearchContextType = {
  query: string;
  setQuery: (value: string) => void;
  tempQuery: string;
  setTempQuery: (value: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: SearchProviderProps) {
  const [query, setQuery] = useState<string>('');
  const [tempQuery, setTempQuery] = useState<string>('');

  return (
    <SearchContext.Provider value={{ query, setQuery, tempQuery, setTempQuery }}>
      {children}
    </SearchContext.Provider>
  );
}


export function useSearch(): SearchContextType {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      'useSearch must be used within a SearchProvider'
    );
  }
  return context;
};
