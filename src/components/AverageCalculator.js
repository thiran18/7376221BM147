import React, { useState, useEffect } from 'react';
import { fetchNumbers } from '../services/api';

const windowSize = 10;

const AverageCalculator = () => {
    const [numbers, setNumbers] = useState([]);
    const [average, setAverage] = useState(null);

    const calculateAverage = (nums) => {
        if (nums.length === 0) return null;
        const sum = nums.reduce((acc, num) => acc + num, 0);
        return sum / nums.length;
    };

    const updateNumbers = async (type) => {
        try {
            const newNumbers = await fetchNumbers(type);
            const uniqueNumbers = Array.from(new Set([...numbers, ...newNumbers]));
            const limitedNumbers = uniqueNumbers.slice(-windowSize);
            setNumbers(limitedNumbers);
            setAverage(calculateAverage(limitedNumbers));
        } catch (error) {
            console.error('Error fetching numbers:', error);
        }
    };

    useEffect(() => {
        updateNumbers('e'); // Example: Fetch even numbers on component mount
    }, []);

    return (
        <div>
            <h1>Average Calculator</h1>
            <p>Numbers: {numbers.join(', ')}</p>
            <p>Average: {average !== null ? average.toFixed(2) : 'N/A'}</p>
            <button onClick={() => updateNumbers('p')}>Fetch Prime Numbers</button>
            <button onClick={() => updateNumbers('f')}>Fetch Fibonacci Numbers</button>
            <button onClick={() => updateNumbers('e')}>Fetch Even Numbers</button>
            <button onClick={() => updateNumbers('r')}>Fetch Random Numbers</button>
        </div>
    );
};

export default AverageCalculator;