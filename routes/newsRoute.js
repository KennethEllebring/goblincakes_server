const express = require('express');
const { checkLoginToken } = require("../middleware/checkLoginToken");

const {editNewsPost} = require('../controllers/newsControllers/editNewsController');
const {deleteNewsPost} = require('../controllers/newsControllers/deleteNewsController');
const {getAllNews} = require('../controllers/newsControllers/getAllNews');

const newsRoute = express.Router();

newsRoute.patch('/', checkLoginToken, editNewsPost);
newsRoute.delete('/:id', checkLoginToken, deleteNewsPost);
newsRoute.get('/all', getAllNews);

module.exports = {
  newsRoute,
};
