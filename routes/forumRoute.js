const express = require('express');
const { checkLoginToken } = require('../middleware/checkLoginToken');
const { getForum } = require('../controllers/forumController/getForumController');

const { createForumThread } = require('../controllers/forumController/createForumCategoryController');
const { editForumCategory } = require('../controllers/forumController/editForumCategoryController');
const { deleteForumCategory } = require('../controllers/forumController/deleteForumCategoryController');
const { deleteForumTitle } = require('../controllers/forumController/deleteForumTitleController');

const { createForumTopic } = require('../controllers/forumController/createForumTopicController');
const { getForumTopics } = require('../controllers/forumController/getTopicsController');
const { deleteForumTopic } = require('../controllers/forumController/deleteForumTopicController');
const { editForumTopic } = require('../controllers/forumController/editForumTopicController');

const { getForumPosts } = require('../controllers/forumController/getForumPostsController');
const { deleteForumPost } = require('../controllers/forumController/deleteForumPostController');
const { createForumPost } = require('../controllers/forumController/createForumPostController');
const { editForumPost } = require('../controllers/forumController/editForumPostController');
const { likePost } = require('../controllers/forumController/likeForumPostController');
const { addForumComment } = require('../controllers/forumController/addForumPostCommentController');
const { deleteForumComment } = require('../controllers/forumController/deleteForumPostCommentController');

const forumRoute = express.Router();

forumRoute.get('/all', getForum);

// Forum Category Controllers
forumRoute.post('/create', checkLoginToken, createForumThread);
forumRoute.patch('/category/:id', checkLoginToken, editForumCategory)
forumRoute.delete('/category/:id', checkLoginToken, deleteForumCategory);
forumRoute.delete('/title/:id', checkLoginToken, deleteForumTitle);

// Forum Topic Controllers
forumRoute.get('/topics/:id', checkLoginToken ,getForumTopics)
forumRoute.post('/topic', checkLoginToken, createForumTopic);
forumRoute.patch('/topic/:id/:topicId', checkLoginToken, editForumTopic)
forumRoute.delete('/topic/:id/:topicId', checkLoginToken, deleteForumTopic);

// Forum Posts Controllers
forumRoute.get('/posts/:topicId', checkLoginToken, getForumPosts)
forumRoute.post('/post/:topicId', checkLoginToken, createForumPost);
forumRoute.patch('/post/:topicId/:postId', checkLoginToken, editForumPost)
forumRoute.delete('/post/:topicId/:postId', checkLoginToken, deleteForumPost);
forumRoute.post('/post/like/:topicId/:postId', checkLoginToken, likePost)
forumRoute.post('/post/comment/:topicId/:postId', checkLoginToken, addForumComment)
forumRoute.delete('/post/comment/:topicId/:postId/:commentId', checkLoginToken, deleteForumComment)

module.exports = {
  forumRoute,
};
