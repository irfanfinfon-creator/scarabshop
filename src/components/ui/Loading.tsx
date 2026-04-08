import { Loader2 } from 'lucide-react';

export function Loading() {
    return (
        <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
    );
}

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-accent" />
        </div>
    );
}