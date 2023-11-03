const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/rss-feed', async (req, res) => {
  try {
    const response = await axios.get('https://unaaldia.hispasec.com/feed');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error al obtener el feed RSS');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
