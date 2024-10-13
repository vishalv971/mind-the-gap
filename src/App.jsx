import { h } from 'preact';
import { Router, Route } from 'preact-router';
import { MindTheGap } from './pages/MindTheGap';
import { ModeSelector } from './pages/ModeSelector';
import { useEffect } from 'preact/hooks';

export function App() {
    const handleRoute = e => {
        if (!e.current) {
            route('/', true);
        }
    };
    const NotFound = () => {
        useEffect(() => {
            window.location.href = '/';
        }, []);
        return null;
    };

    return (
        <div className="bg-background min-h-screen font-recoleta">
            <Router>
                <Route path="/" component={ModeSelector} />
                <Route path="/play/:mode" component={MindTheGap} />
                <NotFound default />
            </Router>
        </div>
    );
}
