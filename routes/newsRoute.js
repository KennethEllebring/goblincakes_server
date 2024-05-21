const express = require('express');
const { checkLoginToken } = require("../middleware/checkLoginToken");

const { getAllNews } = require('../controllers/newsControllers/getAllNews');
const { createNewsPost } = require('../controllers/newsControllers/createNewsController');
const { editNewsPost } = require('../controllers/newsControllers/editNewsController');
const { deleteNewsPost } = require('../controllers/newsControllers/deleteNewsController');

const newsRoute = express.Router();

newsRoute.get('/all', getAllNews);
newsRoute.post('/', checkLoginToken, createNewsPost);
newsRoute.patch('/:id', checkLoginToken, editNewsPost);
newsRoute.delete('/:id', checkLoginToken, deleteNewsPost);

module.exports = {
  newsRoute,
};
