const Game = require('../models/GameModel');

// @desc    Add Game Info
// @routes  POST /api/v1/storeGameInfo
// @access  Public
exports.addGameInfo = async(req,res,next)=>{
    try {

        console.log('Entered addGameInfo = ',req.body);
        const game = await Game.create(req.body);
        return res.status(200).json({
            success: true,
            data: game
        });

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });

    }
}

// @desc    Get Game Info
// @routes  GET /api/v1/storeGameInfo
// @access  Public
exports.getGameInfo = async(req,res,next)=>{
    try{
        console.log("Entered get game info = ", req.params.gameID)
        const game = await Game.findOne({"gameID":req.params.gameID});
        return res.status(200).json({
            success: true,
            data: game
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}