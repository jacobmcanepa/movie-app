const router = require('express').Router();
const sequelize = require('../config/connection');
 //future template? delete if unused
// const { Post, User, Comment, Vote } = require('../models');


router.get('/', (req, res) => {
  res.render('homepage', {
    username: req.session.username,
    loggedIn: req.session.loggedIn
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;