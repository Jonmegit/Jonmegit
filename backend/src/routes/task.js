const router = require('express').Router();
const { create, complete, list } = require('../controllers/taskController');

router.post('/', create);
router.patch('/:id/complete', complete);
router.get('/', list);

module.exports = router;
