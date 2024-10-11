import { h } from 'preact';
import { route } from 'preact-router';
import { useState, useEffect } from 'preact/hooks';
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

    // Function to return a random station from the list
    function getRandomStation() {
        return stationsData[Math.floor(Math.random() * stationsData.length)];
    }

    function handleGuess(zone) {
        // Split the zone string at the '/' character
        const guessedZones = zone.split('/');

        // Check if the guessed zone matches any of the current station's possible zones
        const guessedCorrectly = guessedZones.some(
            guessedZone => guessedZone === currentStation.zone,
        );

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
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
            <div class="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full mx-4 border-4 border-blue-600">
                <h1 class="text-3xl font-bold mb-6 text-center text-blue-600">
                    🚇 London Tube Zone Quiz
                </h1>
                <div class="text-xl mb-8 text-center bg-yellow-100 p-4 rounded-lg shadow-inner">
                    Which zone is{' '}
                    <strong class="text-blue-700 font-semibold">
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

                <div class="flex justify-between items-center text-lg px-4 py-3 bg-blue-100 rounded-lg">
                    <p class="font-semibold text-blue-800">
                        Score: <span class="text-blue-600">{score}</span>
                    </p>
                    <p class="font-semibold text-blue-800">
                        High Score:{' '}
                        <span class="text-blue-600">{highScore}</span> 🏆
                    </p>
                </div>
            </div>
        </div>
    );
}
