import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import Rick from './routes/Rick';
import App from './routes/App'

import './index.scss'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/rick" element={<Rick />} />
        </Routes>
    </BrowserRouter>
)
