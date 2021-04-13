const express = require("express");
const router = express.Router();


const postsController = require('../controllers/posts_contoller');

router.get('/posts',postsController.posts);

module.exports = router;

