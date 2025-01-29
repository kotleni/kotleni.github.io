import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import Rick from './routes/Rick';
import './assets/styles/index.scss'
import {HomePage} from "./routes/App/HomePage";
import {App} from "./routes/App";
import {AboutPage} from "./routes/App/AboutPage";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App><HomePage/></App>} />
            <Route path="/me" element={<App><AboutPage/></App>} />
            <Route path="/rick" element={<Rick />} />
        </Routes>
    </BrowserRouter>
)
