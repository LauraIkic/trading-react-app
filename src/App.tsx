import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import InnerApp from "./InnerApp";

function App () {
    const queryClient = new QueryClient();

    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <InnerApp />
            </QueryClientProvider>
        </React.StrictMode>
    );

}

export default App;
