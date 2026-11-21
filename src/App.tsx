import {Route, Routes} from 'react-router-dom';
import {BlogPostPage} from '@/routes/BlogPostPage';
import {LinksPage} from '@/routes/LinksPage';
import {NotFoundPage} from '@/routes/NotFoundPage';
import {RootPage} from '@/routes/RootPage';
import {RootLayoutContent} from './components/root-layout-content';

export default function App() {
    return (
        <RootLayoutContent>
            <Routes>
                <Route index element={<RootPage />} />
                <Route path="/links" element={<LinksPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </RootLayoutContent>
    );
}
