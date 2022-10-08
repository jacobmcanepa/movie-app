const router = require('express').Router();

const userRoutes = require('./user-routes');
const generate = require('./generate');

router.use('/users', userRoutes);
router.use('/generate', generate);

module.exports = router;