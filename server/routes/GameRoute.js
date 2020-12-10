const express = require('express');
const router  = express.Router();
const {addGameInfo, getGameInfo} = require('../controllers/GameController');

router
    .route('/')
    .post(addGameInfo)

router
    .route('/:gameID')
    .get(getGameInfo)

module.exports = router;