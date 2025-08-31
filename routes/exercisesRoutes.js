// module.exports = router;

const express = require('express');
const axios = require('axios');
const router = express.Router();
const Exercise = require('../models/Exercise');


router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.gamini.ai/v1/exercises', {
      headers: {
        Authorization: `Bearer ${process.env.GAMINI_API_KEY}`
      }
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error(' Gamini fetch failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

module.exports = router;


