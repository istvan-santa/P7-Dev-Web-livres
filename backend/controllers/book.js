const Book = require('../models/Book');

exports.getAllBooks = (req, res) => {
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};


exports.getOneBook = (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
      res.status(200).json(book);
    })
    .catch(error => res.status(400).json({ error }));
};

exports.getBestRatedBooks = (req, res) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};
