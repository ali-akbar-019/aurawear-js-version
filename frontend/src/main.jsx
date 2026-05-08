import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AppProviders } from './contexts/AppProvider.jsx';
import './index.css';
import { Toaster } from './components/ui/sonner.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppProviders>
                <Toaster />
                <BrowserRouter>
                    <ScrollToTop />

                    <App />
                </BrowserRouter>
            </AppProviders>
        </QueryClientProvider>
    </StrictMode>,
);
