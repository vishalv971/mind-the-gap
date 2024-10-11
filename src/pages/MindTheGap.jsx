import { h } from 'preact';
import { route } from 'preact-router';
import { useState, useEffect, useCallback } from 'preact/hooks';
import { Button } from 'semantic-ui-react';
import { dlr } from '../utils/dlr';
import { overground } from '../utils/overground';
import { trams } from '../utils/trams';
import { underground } from '../utils/underground';

const stationsData = [...dlr, ...overground, ...trams, ...underground];

export function MindTheGap() {
    const [currentStation, setCurrentStation] = useState(getRandomStation());
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    function getRandomStation() {
        return stationsData[Math.floor(Math.random() * stationsData.length)];
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
            setCurrentStation(getRandomStation());
        },
        [currentStation, score],
    );

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
                    <button
                        onClick={() => handleGuess('1')}
                        class="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-4 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
                    >
                        1
                    </button>
                    <button
                        onClick={() => handleGuess('2')}
                        class="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-4 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                    >
                        2
                    </button>
                    <button
                        onClick={() => handleGuess('3')}
                        class="bg-blue-300 hover:bg-blue-400 text-blue-800 font-bold py-4 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        3
                    </button>
                    <button
                        onClick={() => handleGuess('4')}
                        class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                    >
                        4
                    </button>
                    <button
                        onClick={() => handleGuess('5')}
                        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                    >
                        5
                    </button>
                    <button
                        onClick={() => handleGuess('6')}
                        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
                    >
                        6
                    </button>
                    <button
                        onClick={() => handleGuess('7')}
                        class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
                    >
                        7
                    </button>
                    <button
                        onClick={() => handleGuess('8')}
                        class="bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-950"
                    >
                        8
                    </button>
                    <button
                        onClick={() => handleGuess('9')}
                        class="bg-blue-900 hover:bg-blue-950 text-white font-bold py-4 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-950"
                    >
                        9
                    </button>
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
