const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/book');
const auth = require('../middleware/auth');

// Routes de lecture (aucune image ici pour l’instant)
router.get('/', auth, bookCtrl.getAllBooks);
router.get('/:id', auth, bookCtrl.getOneBook);
router.get('/bestrating', auth, bookCtrl.getBestRatedBooks);

// Les routes POST, PUT, DELETE viendront ensuite

module.exports = router;
