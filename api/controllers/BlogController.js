const SqliteService = require('../services/SqliteService');

SqliteService.connect();
const isInit = SqliteService.initializeDatabase();
if (isInit) {
  console.log('Database initialized');
}

const index = async (req, res) => {
  const posts = await SqliteService.getPosts();
  const comments = await SqliteService.getComments();
  const likes = await SqliteService.getLikes();
  posts.forEach((post) => {
    post.comments = comments.filter((comment) => {
      return comment.postId === post.id;
    });
    post.likes = likes.filter((like) => {
      return like.postId === post.id;
    });
  });
  res.render('blog/index.ejs', { posts, comments, likes });
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  await SqliteService.createPost(title, content);
  res.status(201).redirect('/api/blog');
};

const editPost = async (req, res) => {
  const { id, title, content } = req.body;
  await SqliteService.editPost(id, title, content);
  res.status(202).redirect('/api/blog');
};

const deletePost = async (req, res) => {
  const { id } = req.body;
  await SqliteService.deletePost(id);
  res.status(203).redirect('/api/blog');
};

const createComment = async (req, res) => {
  const { postId, comment } = req.body;
  await SqliteService.createComment(postId, comment);
  res.status(201).redirect('/api/blog');
};

const editComment = async (req, res) => {
  const { id, comment } = req.body;
  await SqliteService.editComment(id, comment);
  res.status(202).redirect('/api/blog');
};

const likePost = async (req, res) => {
  const { postId } = req.body;
  await SqliteService.likePost(postId);
  res.status(201).redirect('/api/blog');
};

const dislikePost = async (req, res) => {
  const { postId } = req.body;
  await SqliteService.dislikePost(postId);
  res.status(202).redirect('/api/blog');
};

module.exports = {
  index,
  createPost,
  editPost,
  deletePost,
  createComment,
  editComment,
  likePost,
  dislikePost
};