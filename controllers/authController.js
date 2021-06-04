const { PrismaClient } = require('@prisma/client');
const { promisify } = require('util');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const express = require('express');
const e = require('express');
var UserModel = require('./../models/userModel');
const bcrypt = require('bcrypt');
const  userService  = require('./../services/userService.js');
const AppError = require('./../utils/appError');

const prisma = new PrismaClient();

exports.protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
       
        token = req.headers.authorization.split(' ')[1];
    }
    console.log(token);

    if(!token){
        return next(res.status(401).json({
            status: "fail",
            message: "Unauthorised"
        }));
    }
    try{
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);
    

    const checkingExist = await userService.findById(decoded.id);
    
    if(checkingExist == null){
        next(res.status(401).json({
            status: "fail",
            message: "Unauthorized"
        }));
    }
        req.user = checkingExist;
    }catch(err){
        next(res.status(401).json({
            status: "fail",
            message: "Unauthorized"
        }));
    }
    
    next();
}


exports.restrictTo = (role) => {

    return (req, res, next) => {
        if(role !=(req.user.role)){
            return next(res.status(401).json({
                status: "fail",
                message: "Unauthorized"
            }));
        }
        next();
    }
}



exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.surname || !req.body.email ){
        return res.status(400).json({
            status: "fail",
            message: "Missing atributes"
        })
    }
    next();
}

exports.checkIfUserExitsByEmail =(req, res, next) => {
    const userCheck =  prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      }).then(data => {
    
      if(data != null){
        return res.status(409).json({
            status: "fail",
            message: "Already exists"
        })
      }
    })
}



async function login (req, res, next)  {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    if(!userEmail || !userPassword){
        res.status(400).json({
            status: 'fail',
            message: 'Bad request',
            data: {
               
            }
        });
    }
    const user = await userService.findByEmail(userEmail);
    if(user == null){
        res.status(400).json({
            status: 'fail',
            message: 'Bad request',
            data: {
                
            }
        });
        return;
    }
    if( !await bcrypt.compareSync(""+userPassword,""+user.password))
    {
            res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password',
                data: {
                   
                }
            });
        
    }else{

    const token =jwt.sign({
        id : user.id
    },process.env.JWT_SECRET, {
        expiresIn: 86400
    });
    res.status(200).json({
        status: "success",
        token
    });
    }
}


async function signup (req, res) {
    let user1 = new UserModel(req.body.name,req.body.surname,req.body.email,await bcrypt.hash(req.body.password, 12),req.body.phoneNumber);
    const user =  userService.createUserr(user1).then(data =>{
        if(data == null) {
            res.status(409).json({
                status: 'conflict',
                message: 'already exists with that email',
                data: {
                   
                }
            });
        }else {
            const token =jwt.sign({
                id : data.id
            },process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
  
        res.status(200).json({
            status: 'success',
            token,
            data: {
                userr : data
            }
        });
        }

    });
     

   
    
}





module.exports.signup = signup;
module.exports.login = login;