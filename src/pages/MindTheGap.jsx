import { h } from 'preact';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';
import { Button } from 'semantic-ui-react';



const stationsData = [
    { name: 'Acton Town', zone: '3' },
    { name: 'Baker Street', zone: '1' },
    { name: 'Chiswick Park', zone: '3' },
];

export function MindTheGap() {
    const [currentStation, setCurrentStation] = useState(getRandomStation());
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    // Function to return a random station from the list
    function getRandomStation() {
        return stationsData[Math.floor(Math.random() * stationsData.length)];
    }

    function handleGuess(zone) {
        const guessedCorrectly = zone === currentStation.zone;

        if (guessedCorrectly) {
            // Update score immutably
            setScore(prevScore => prevScore + 1);
        } else {
            // Update high score if the current score is higher
            setHighScore(prevHighScore => Math.max(prevHighScore, score));
            // Reset score on incorrect guess
            setScore(0);
        }

        // Set a new random station after each guess
        setCurrentStation(getRandomStation());
    }

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-4">Guess the Tube Station Zone</h1>
            <div className="text-xl mb-6">
                Which zone is <strong>{currentStation.name}</strong> in?
            </div>

            <div className="flex space-x-4 mb-6">
                {[1, 2, 3, 4, 5, 6].map((zone) => (
                    <Button
                        key={zone}
                        onClick={() => handleGuess(zone.toString())}
                    >
                        Zone {zone}
                    </Button>
                ))}
            </div>

            <div className="text-lg">
                <p>Score: {score}</p>
                <p>High Score: {highScore}</p>
            </div>
        </div>
    );
}