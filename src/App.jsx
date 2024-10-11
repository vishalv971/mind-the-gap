import { h } from 'preact';
import  { Router } from 'preact-router';
import { MindTheGap } from './pages/MindTheGap';

export function App() {
    return (
        <div className="bg-background min-h-screen font-recoleta">
            <MindTheGap path="/" />
        </div>
    )
}