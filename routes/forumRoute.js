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
forumRoute.post('/create', createForumThread);
forumRoute.patch('/category/:id', editForumCategory)
forumRoute.delete('/category/:id', deleteForumCategory);
forumRoute.delete('/title/:id', deleteForumTitle);

// Forum Topic Controllers
forumRoute.get('/topics/:id', getForumTopics)
forumRoute.post('/topic', createForumTopic);
forumRoute.patch('/topic/:id/:topicId', editForumTopic)
forumRoute.delete('/topic/:id/:topicId', deleteForumTopic);

// Forum Posts Controllers
forumRoute.get('/posts/:topicId', getForumPosts)
forumRoute.post('/post/:topicId', createForumPost);
forumRoute.patch('/post/:topicId/:postId', editForumPost)
forumRoute.delete('/post/:topicId/:postId', deleteForumPost);
forumRoute.post('/post/like/:topicId/:postId', likePost)
forumRoute.post('/post/comment/:topicId/:postId', addForumComment)
forumRoute.delete('/post/comment/:topicId/:postId/:commentId', deleteForumComment)

module.exports = {
  forumRoute,
};
