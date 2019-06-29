const express = require('express');
const router = express.Router();
const index = require('../controllers/index');

router.get('/', index.load_index);
router.post('/', index.post);

router.get('/signup', index.signup_form);
router.post('/signup', index.signup);

router.get('/login', index.login_form);
router.post('/login', index.login);

router.get('/login/error', index.error)

router.get('/logout', index.logout);

module.exports = router;