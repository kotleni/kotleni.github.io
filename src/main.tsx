import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import Rick from './routes/Rick';
import './assets/styles/index.scss'
import {HomePage} from "./routes/App/HomePage";
import {App} from "./routes/App";
import {AboutPage} from "./routes/App/AboutPage";
import {ProjectsPage} from "./routes/App/ProjectsPage";
import {ArticlesPage} from "./routes/App/ArticlesPage";

// Prefix is needed for github pages deploying
const URL_PREFIX = "/me-react";

function url(path: string) {
    return `${URL_PREFIX}/${path}`;
}

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path={url("")} element={<App><HomePage/></App>} />
            <Route path={url("projects")} element={<App><ProjectsPage/></App>} />
            <Route path={url("me")} element={<App><AboutPage/></App>} />
            <Route path={url("articles")} element={<App><ArticlesPage/></App>} />
            <Route path={url("rick")} element={<Rick />} />
        </Routes>
    </BrowserRouter>
)
