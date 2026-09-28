import {Route, Routes} from 'react-router-dom';
import {BlogPage} from '@/routes/BlogPage';
import {BlogPostPage} from '@/routes/BlogPostPage';
import {RootPage} from '@/routes/RootPage';
import {RootLayoutContent} from './components/root-layout-content';
import {TooltipProvider} from './components/ui/tooltip';

export default function App() {
    return (
        <TooltipProvider>
            <RootLayoutContent>
                <Routes>
                    <Route index element={<RootPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                </Routes>
            </RootLayoutContent>
        </TooltipProvider>
    );
}
