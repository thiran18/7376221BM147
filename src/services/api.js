// filepath: e:\average-calculator\src\services\api.js
import API_BASE_URL from '../config';

const fetchNumbers = async (type) => {
    const validTypes = ['p', 'f', 'e', 'r'];
    if (!validTypes.includes(type)) {
        throw new Error('Invalid number type');
    }
    
    let endpoint;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

    switch (type) {
        case 'p':
            endpoint = `${API_BASE_URL}/primes`;
            break;
        case 'f':
            endpoint = `${API_BASE_URL}/fibo`;
            break;
        case 'e':
            endpoint = `${API_BASE_URL}/even`;
            break;
        case 'r':
            endpoint = `${API_BASE_URL}/rand`;
            break;
        default:
            throw new Error('Invalid number type');
    }

    const response = await fetch(endpoint, { signal: controller.signal });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();

    clearTimeout(timeoutId);
    return data.numbers;
};

export { fetchNumbers };