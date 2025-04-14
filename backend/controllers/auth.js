const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.signup = (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => {
      const user = new User({
        email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'Utilisateur non trouvé !' });
        }
  
        bcrypt.compare(password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ message: 'Mot de passe incorrect !' });
            }
  
            const token = jwt.sign(
              { userId: user._id },
              process.env.TOKEN_SECRET,
              { expiresIn: '24h' }
            );
  
            res.status(200).json({
              userId: user._id,
              token
            });
          })
          .catch(error => {
            console.log('❌ Erreur bcrypt.compare :', error);
            res.status(500).json({ error: error.message });
          });
      })
      .catch(error => {
        console.log('❌ Erreur findOne :', error);
        res.status(500).json({ error: error.message });
      });
  };
  

