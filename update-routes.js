const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Define your API endpoint here
const API_URL = 'https://firestore.googleapis.com/v1/projects/ng-asmco/databases/(default)/documents/products';
const ROUTE_PREFIX = '/card-detail/'; // Constant part of the route

async function fetchRoutes() {
  try {
    const response = await axios.get(API_URL);
    return response.data.documents.map(doc => {
      const id = doc.name.split('/').pop();
      // Prepend the route prefix to the ID
      return `${ROUTE_PREFIX}${id}`;
    });
  } catch (error) {
    console.error('Error fetching routes:', error);
    return [];
  }
}

async function updateRoutesFile() {
  const routes = await fetchRoutes();
  const filePath = path.join(__dirname, '/routes.txt');

  fs.writeFileSync(filePath, routes.join('\n'), 'utf8');
  console.log('routes.txt has been updated successfully!');
}

updateRoutesFile();
