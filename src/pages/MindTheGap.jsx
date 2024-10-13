import { useState, useEffect, useCallback } from 'preact/hooks';
import { dlr } from '../utils/dlr';
import { overground } from '../utils/overground';
import { trams } from '../utils/trams';
import { underground } from '../utils/underground';
import { Link } from 'preact-router/match';

const stationsData = [...dlr, ...overground, ...trams, ...underground];

export function MindTheGap({ mode = 'zone1-3' }) {
    const [currentStation, setCurrentStation] = useState(getRandomStation());
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        setCurrentStation(getRandomStation(mode));
    }, [mode]);

    function getRandomStation(selectedMode) {
        const filteredStations =
            selectedMode === 'zone1-3'
                ? stationsData.filter(station =>
                      ['1', '2', '3'].includes(station.zone),
                  )
                : stationsData;
        return filteredStations[
            Math.floor(Math.random() * filteredStations.length)
        ];
    }

    const handleGuess = useCallback(
        zone => {
            const guessedZones = zone.split('/');
            const guessedCorrectly = guessedZones.some(
                guessedZone => guessedZone === currentStation.zone,
            );

            if (guessedCorrectly) {
                setScore(prevScore => prevScore + 1);
                setToast({
                    show: true,
                    message: 'Hooray! 🎉',
                    type: 'success',
                });
            } else {
                setHighScore(prevHighScore => Math.max(prevHighScore, score));
                setScore(0);
                setToast({ show: true, message: 'Oh no! 😢', type: 'error' });
            }

            setTimeout(
                () => setToast({ show: false, message: '', type: '' }),
                3000,
            );
            setCurrentStation(getRandomStation(mode));
        },
        [currentStation, score, mode],
    );

    const zoneButtons =
        mode === 'zone1-3' ? [1, 2, 3] : [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto border-4 border-blue-600">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-600">
                    🚇 London Tube Zone Quiz
                </h1>
                <div className="text-lg md:text-xl mb-6 md:mb-8 text-center bg-yellow-100 p-4 rounded-lg shadow-inner">
                    Which zone is{' '}
                    <strong className="text-blue-700 font-semibold">
                        {currentStation.name}
                    </strong>{' '}
                    in?
                </div>
                <div class="grid grid-cols-3 gap-4 mb-8">
                    {zoneButtons.map(zone => (
                        <button
                            key={zone}
                            onClick={() => handleGuess(zone.toString())}
                            className={`
                                bg-blue-${zone * 100} hover:bg-blue-${Math.min(
                                (zone + 1) * 100,
                                900,
                            )} 
                                text-black
                                font-bold py-3 md:py-4 px-4 md:px-6 rounded-full shadow-md 
                                transition duration-300 ease-in-out transform hover:scale-105 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-${Math.min(
                                    (zone + 2) * 100,
                                    900,
                                )}
                                text-sm md:text-base
                            `}
                        >
                            {zone}
                        </button>
                    ))}
                </div>
                <div className="flex justify-between items-center text-base md:text-lg px-4 py-3 bg-blue-100 rounded-lg">
                    <p className="font-semibold text-blue-800">
                        Score: <span className="text-blue-600">{score}</span>
                    </p>
                    <p className="font-semibold text-blue-800">
                        High Score:{' '}
                        <span className="text-blue-600">{highScore}</span> 🏆
                    </p>
                </div>
                <div className="flex justify-center mt-4">
                    <Link
                        href="/"
                        className="bg-white border-2 border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full shadow-sm hover:bg-blue-100 hover:border-blue-600 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                    >
                        Go Back
                    </Link>
                </div>
            </div>
            {toast.show && (
                <div
                    className={`
                    fixed top-4 left-1/2 transform -translate-x-1/2
                    px-4 py-2 rounded-md shadow-lg
                    ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}
                    text-white text-sm md:text-base
                    z-50 animate-fade-in-down
                `}
                >
                    {toast.message}
                </div>
            )}
        </div>
    );
}
