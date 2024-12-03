const fs = require('fs');
const path = require('path');

// Function to save data to a file
function saveDataToFile(filename, data) {
  const filePath = path.join(__dirname, '../data', filename);

  // Convert data to JSON string
  const jsonData = JSON.stringify(data, null, 2);

  // Write JSON string to file
  fs.writeFileSync(filePath, jsonData, 'utf8');
}

// Function to read data from a file
function readDataFromFile(filename) {
  const filePath = path.join(__dirname, '../data', filename);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  // Read file content
  const jsonData = fs.readFileSync(filePath, 'utf8');

  // Parse JSON string to object
  return JSON.parse(jsonData);
}

module.exports = {
  saveDataToFile,
  readDataFromFile,
};
