const express = require('express');
const cartRouter = require('./cartRouter.js');
const userRouter = require('./userRouter.js');

const router = express.Router();

router.use('/cart', cartRouter);
router.use('/user', userRouter);

module.exports = router;
