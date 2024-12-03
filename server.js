const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// API endpoint to save data
app.post('/api/save', (req, res) => {
  const { filename, data } = req.body;
  const filePath = path.join(__dirname, 'data', filename);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  res.send({ message: 'Data saved successfully' });
});

// API endpoint to read data
app.get('/api/read/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'data', req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send({ message: 'File not found' });
  }

  const jsonData = fs.readFileSync(filePath, 'utf8');
  res.send(JSON.parse(jsonData));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
