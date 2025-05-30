import React from 'react';
import './theme/index.css';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import InnerApp from './InnerApp';
import { myTheme } from './theme/theme';
import { AuthProvider } from './context/AuthContext';

function App() {
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider> 
          <ThemeProvider theme={myTheme}>
            <InnerApp />
          </ThemeProvider>
        </AuthProvider> 
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
