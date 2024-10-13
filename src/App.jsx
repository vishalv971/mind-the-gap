import { h } from 'preact';
import { Router, Route } from 'preact-router';
import { MindTheGap } from './pages/MindTheGap';
import { ModeSelector } from './pages/ModeSelector';

export function App() {
    return (
        <div className="bg-background min-h-screen font-recoleta">
            <Router>
                <Route path="/" component={ModeSelector} />
                <Route path="/play/:mode" component={MindTheGap} />
            </Router>
        </div>
    )
}