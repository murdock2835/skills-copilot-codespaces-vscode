// Create web server
// Run the server
// Create a route for GET /comments
// Create a route for GET /comments/:id
// Create a route for POST /comments
// Create a route for PUT /comments/:id
// Create a route for DELETE /comments/:id

// Import express
const express = require('express');
// Import body-parser
const bodyParser = require('body-parser');
// Import comments
const comments = require('./data/comments');
// Import posts
const posts = require('./data/posts');

// Create express server
const app = express();

// Use body-parser
app.use(bodyParser.json());

// Create route for GET /comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Create route for GET /comments/:id
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(c => c.id == id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: `Comment ${id} not found` });
  }
});

// Create route for POST /comments
app.post('/comments', (req, res) => {
  const { body } = req.body;
  if (body) {
    const newComment = {
      id: comments.length + 1,
      body,
    };
    comments.push(newComment);
    res.json(newComment);
  } else {
    res.status(400).json({ message: 'Please provide a body' });
  }
});

// Create route for PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(c => c.id == id);
  if (comment) {
    const { body } = req.body;
    if (body) {
      comment.body = body;
      res.json(comment);
    } else {
      res.status(400).json({ message: 'Please provide a body' });
    }
  } else {
    res.status(404).json({ message: `Comment ${id} not found` });
  }
});

// Create route for DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const index = comments.findIndex(c => c.id == id);
  if (index
