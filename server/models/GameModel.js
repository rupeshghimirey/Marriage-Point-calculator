const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    gameID:{
        type: String,
    },
    adminName:{
        type: String,
    },
    numOfPlayers:{
        type:Number,
    },
    playersName:{
        type: Array,
    },
    gamePoints:{
        type: Array,
    },
    oauthToken:{
        type: String,
    },
    createAt:{
        type: Date,
        default: Date.now
    }
}) 

module.exports = mongoose.model('Game',GameSchema)