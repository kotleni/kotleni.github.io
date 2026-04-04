import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './style.css';

const appElement = document.getElementById('app');

if (!appElement) {
    throw new Error('Missing #app root element');
}

createRoot(appElement).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);
