const express = require('express');
const app = express();
const PORT = 5001;

app.get('/api', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.listen(PORT, (err) => {
    if (err) {
      console.error('Error starting the server:', err);
    } else {
      console.log(`Server is running on http://localhost:${PORT}`);
    }
  });
  app.post('/api/save', (req, res) => {
    const { board, winner } = req.body;
    // Save logic (e.g., save to a database)
    res.json({ message: 'Game saved successfully' });
  });
  