const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const {
  postNote,
  deleteOneNote,
  getOneNote,
  addNote,
  getEdit,
  updateNote,
} = require('../controllers/noteController');
// @desc Note page
//@route GET /notes
router.get('/add', ensureAuth, addNote);
// @desc Process Add form
//@route POST /notes
router.post('/', ensureAuth, postNote);
router.get('/:_id', ensureAuth, getOneNote);
router.delete('/:_id', ensureAuth, deleteOneNote);
router.get('/edit/:_id', ensureAuth, getEdit);
router.put('/:_id', ensureAuth, updateNote);

module.exports = router;
