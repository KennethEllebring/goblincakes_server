const express = require('express');
const { getLogs } = require('../controllers/warcraftlogsController/getLogsController');

const warcraftlogsRoute = express.Router();

warcraftlogsRoute.get('/logs', getLogs);


module.exports = {
          warcraftlogsRoute,
};