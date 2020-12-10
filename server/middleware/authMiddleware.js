const express = require('express');
const Game = require('../models/GameModel');

exports.authenticateToken =async(req,res,next) =>{
    try{
        console.log("Entered get token info = ", req.body);
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]

        if(token === null) return res.status(401),json({success:false,error:"No Token Provided"})

        const game = await Game.findOne({"oauthToken":token});

        if(game ===null)return res.status(500).json({
            success: false,
            error: 'Un-authorized user'
        });
        next()
    }catch(err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}
