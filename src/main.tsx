import { createRoot } from 'react-dom/client'
import Rick from './Rick';
import './index.css'
import App from './App.tsx'
import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/rick" element={<Rick />} />
        </Routes>
    </BrowserRouter>
)
