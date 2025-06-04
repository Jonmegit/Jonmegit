const router = require('express').Router();
const { create, join } = require('../controllers/teamController');

router.post('/', create);
router.post('/join', join);

module.exports = router;
