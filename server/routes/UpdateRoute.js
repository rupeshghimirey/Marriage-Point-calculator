const express = require('express');
const router  = express.Router();
const {updateGameInfo} = require('../controllers/UpdateController');
const {authenticateToken}= require('../middleware/authMiddleware')
router
    .route('/')
    .post([authenticateToken],updateGameInfo)

module.exports = router;