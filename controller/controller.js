const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
    const {
        email,
        password
    } = req.body


    const data = await User.create({
        email,
        password,
    })

    if(!data){
        res.status(400).json({
            success: false,
            message: "user not created"
        });
    }
    res.json({
        success: true,
        message: "user created",
        data: data
    });
}


const login = (req, res) => {
    const {
        username,
        password
    } = req.body

    User.findOne({ username: req.body.username }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "error wrong username"
            });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({ loginSuccess: false, message: "Wrong password" });
            }
            if (isMatch) {
                const payload = { id: user.id}
                jwt.sign(payload, process.env.JWTSECRET, { expiresIn: '1d'}, (error, token) => {
                    return res.status(200).json({ 
                        success: true,
                        message: "login successful",
                        data: {
                            user,
                            token
                        } 
                    });
                });
            }  
        });
    });
}

module.exports =  { createUser, login } 