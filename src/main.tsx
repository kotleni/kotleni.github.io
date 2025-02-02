import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import Rick from './routes/Rick';
import './assets/styles/index.scss'
import {HomePage} from "./routes/App/HomePage";
import {App} from "./routes/App";
import {AboutPage} from "./routes/App/AboutPage";
import {ProjectsPage} from "./routes/App/ProjectsPage";
import {ArticlesPage} from "./routes/App/ArticlesPage";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App>
            <Routes>
                <Route path="me-react">
                    <Route index element={<HomePage/>} />
                    <Route path="projects" element={<ProjectsPage/>} />
                    <Route path="me" element={<AboutPage/>} />
                    <Route path="articles" element={<ArticlesPage/>} />
                    <Route path="rick"  element={<Rick />} />
                </Route>
            </Routes>
        </App>
    </BrowserRouter>
)
