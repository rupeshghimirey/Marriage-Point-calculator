const Game = require('../models/GameModel');

// @desc    Add Game Info
// @routes  PUT /api/v1/updateGameInfo
// @access  Public
exports.updateGameInfo = async(req,res,next)=>{
    try {

        console.log('Entered updateGameInfo = ',req.body);
        const update = await Game.updateOne({"gameID":req.body.gameID},{$push:{"gamePoints":[req.body.gamePoints]}});
        const game = await Game.findOne({"gameID":req.body.gameID});
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