const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const Note = require('../models/Note');
// login/landing page
//@route GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});
// Dashboard page
//@route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).lean();

    res.render('dashboard', {
      name: req.user.firstName,
      profilePicture: req.user.image,
      notes,
      active: true,
    });
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
});
router.get('/about', (req, res) => {
  try {
    if (req.user) {
      res.render('about', {
        name: req.user.firstName,
        profilePicture: req.user.image,
      });
    } else {
      res.render('about');
    }
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
});

module.exports = router;
