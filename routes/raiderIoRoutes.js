const express = require('express');
const { getProgress } = require('../controllers/raiderIoController.js/getProgressController');

const raiderIoRoute = express.Router();

raiderIoRoute.get('/guildprogress', getProgress);


module.exports = {
          raiderIoRoute,
};