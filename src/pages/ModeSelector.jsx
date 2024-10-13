import { h } from 'preact';
import { route } from 'preact-router';

export function ModeSelector() {
    const handleModeSelect = (mode) => {
        route(`/play/${mode}`);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto border-4 border-blue-600">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-600">
                    🚇 London Tube Zone Quiz
                </h1>
                <div className="text-lg md:text-xl mb-6 md:mb-8 text-center">
                    Select a mode:
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <button
                        onClick={() => handleModeSelect('zone1-3')}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                    >
                        🏙️ Zone 1-3
                    </button>
                    <button
                        onClick={() => handleModeSelect('allZones')}
                        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
                    >
                        🌆 All Zones
                    </button>
                </div>
            </div>
        </div>
    );
}