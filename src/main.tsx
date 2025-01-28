import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import Rick from './routes/Rick';
import App from './routes/App'

import './assets/styles/index.scss'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/rick" element={<Rick />} />

            {/* MARK: Custom routes special for gh-pages */}
            <Route path="/me-react" element={<App />} />
            <Route path="/me-react/rick" element={<Rick />} />
        </Routes>
    </BrowserRouter>
)
