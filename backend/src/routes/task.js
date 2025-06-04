const router = require('express').Router();
const { create, complete, list, completed, update, remove, summary } = require('../controllers/taskController');

router.get('/completed', completed);
router.get('/summary', summary);
router.post('/', create);
router.patch('/:id/complete', complete);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/', list);

module.exports = router;
