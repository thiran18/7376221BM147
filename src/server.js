const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = 9876;
const API_BASE_URL = 'http://20.244.56.144/test';

const fetchNumbers = async (type) => {
    let endpoint;
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

    const response = await fetch(endpoint, { timeout: 500 });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.numbers;
};

app.use(express.static(path.join(__dirname, 'build')));

app.get('/numbers/:type', async (req, res) => {
    const { type } = req.params;
    try {
        const numbers = await fetchNumbers(type);
        res.json({ numbers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});