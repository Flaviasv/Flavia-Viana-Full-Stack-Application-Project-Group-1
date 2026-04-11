// automate.js - Test file for team project
// Runs tests on all team members' APIs and outputs results in required format

const axios = require('axios');

// My email address (for output format)
const MY_EMAIL = 'vian0006@algonquinlive.com';

// List of team member API endpoints
const teamEndpoints = [
    {
        name: 'Flavia (My Store)',
        url: 'https://flavia-viana-full-stack-application.onrender.com/products',
        email: MY_EMAIL
    },
    {
        name: 'Hassan',
        url: 'https://hassan-store-api.onrender.com/products',
        email: 'abou0228@algonquinlive.com'
    },
];

// Function to test a single endpoint
async function testEndpoint(endpoint) {
    try {
        const response = await axios.get(endpoint.url, { timeout: 30000 });

        // Check if response is an array (products)
        if (Array.isArray(response.data)) {
            console.log(`${endpoint.email} - getAll to show all product - 200 - PASSED`);
            return true;
        } else {
            console.log(`${endpoint.email} - getAll to show all product - 200 - FAILED (Response is not an array)`);
            return false;
        }
    } catch (error) {
        // Handle different types of errors
        if (error.response) {
            // Server responded with error status
            console.log(`${endpoint.email} - getAll to show all product - ${error.response.status} - FAILED`);
        } else if (error.request) {
            // No response received
            console.log(`${endpoint.email} - getAll to show all product - 500 - FAILED (No response from server)`);
        } else {
            // Other errors
            console.log(`${endpoint.email} - getAll to show all product - 500 - FAILED (${error.message})`);
        }
        return false;
    }
}

// Main function to run all tests
async function runAllTests() {
    console.log('='.repeat(60));
    console.log('TEAM PROJECT - API TESTS');
    console.log('='.repeat(60));
    console.log('');

    let passedCount = 0;
    let totalCount = teamEndpoints.length;

    // Test each endpoint
    for (const endpoint of teamEndpoints) {
        console.log(`Testing: ${endpoint.name}...`);
        const result = await testEndpoint(endpoint);
        if (result) passedCount++;
        console.log('');
    }

    // Summary
    console.log('='.repeat(60));
    console.log(`SUMMARY: ${passedCount} of ${totalCount} tests passed`);
    console.log('='.repeat(60));
}

// Run the tests
runAllTests();