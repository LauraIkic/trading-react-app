import React from 'react';
import './theme/index.css'; // Theme zuerst importieren
import './App.css';         // App-spezifische Styles danach
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import InnerApp from './InnerApp';
import { myTheme } from './theme/theme';

function App() {
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={myTheme}>
          <InnerApp />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
