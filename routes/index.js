const express = require('express');
const router = express.Router();
const index = require('../controllers/index');

router.get('/', (req, res) => {
  res.render('index', {welcome: "Secret Club House"}); 
})

router.post('/', index.post);

router.get('/signup', index.signup_form);
router.post('/signup', index.signup);

router.get('/login', index.login_form);
router.post('/login', index.login);

router.get('/logout', index.logout);

module.exports = router;