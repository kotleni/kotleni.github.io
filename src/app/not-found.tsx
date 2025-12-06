import {Button} from '@/components/ui/button';
import {Cloud} from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-1 flex-1 flex flex-col items-center justify-center gap-4 text-center p-6">
            <div>
                <Cloud className="w-18 h-18" />
            </div>
            <h1 className="text-2xl font-bold">404 — Lost in space</h1>
            <p className="text-sm opacity-70">
                This page wandered off somewhere.
            </p>
            <Button variant="outline" asChild>
                <a href="/">Go home</a>
            </Button>
        </div>
    );
}
