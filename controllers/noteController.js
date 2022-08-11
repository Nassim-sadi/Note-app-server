const Note = require('../models/Note');
const postNote = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    req.flash('info', 'Created');
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
};
const updateNote = async (req, res) => {
  try {
    await Note.findOneAndUpdate({ _id: req.params._id }, req.body, {
      new: true,
    });
    req.flash('info', 'Updated');
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
};

const getOneNote = async (req, res) => {
  try {
    let note = await Note.findById(req.params._id).populate('user').lean();
    if (req.user.id != note.user._id) return res.redirect('/dashboard');
    res.render('notes/note', {
      name: req.user.firstName,
      profilePicture: req.user.image,
      note,
    });
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
};
const deleteOneNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params._id);
    req.flash('info', 'Deleted');
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('error/500', { error: error });
  }
};
const addNote = (req, res) => {
  res.render('notes/add', {
    name: req.user.firstName,
    profilePicture: req.user.image,
  });
};
const getEdit = async (req, res) => {
  try {
    let note = await Note.findById(req.params._id).populate('user').lean();
    if (req.user.id != note.user._id) return res.redirect('/dashboard');
    res.render('notes/edit', {
      name: req.user.firstName,
      profilePicture: req.user.image,
      note,
    });
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
};
module.exports = {
  postNote,
  getOneNote,
  deleteOneNote,
  addNote,
  getEdit,
  updateNote,
};
