const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const express = require('express');
const e = require('express');
const  userService  = require('./../services/userService.js');

const prisma = new PrismaClient();





exports.checkID = (req, res, next, val) => {
    const users =  userService.fAllUsers();
    if(req.params.id * 1 > users.length){
        return res.status(404).json({
            "status": "fail",
            "message": "Invalid ID"
        })
    }
    next();
};

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


exports.getAllUsers = (req, res) => {
    userService.fAllUsers().then(data => {
    res.status(200).json({
        status: "success",
        data: {
            users: data
        }
    });
    })
}

exports.getUser = (req, res) => {
   
    const id = req.params.id * 1;
  
    const user = userService.findById(id).then(data =>{
        if(data == null){
            res.status(404).json({
                status: 'fail',
                message: 'Not found',
                data: {
                    
                }
            });
        }else{
        res.status(200).json({
            status: 'success',
            data: {
                userr : data
            }
        });
    }});
    
  };


exports.addToTeam = (req, res) =>{
  
    const id1 = req.params.id * 1;
    const id2 = req.params.idTeam * 1;

    const user = userService.addToTeamm(id1,id2).then(data =>{
        if(data == null) {
            res.status(409).json({
                status: 'conflict',
                message: 'already in team',
                data: {
                   
                }
            });
            return;
        } 

        res.status(200).json({
            status: 'success',
            data: {
                userr : data
            }
        });
    });
    

      
     
};



exports.updateUser = (req, res) => {
    const idd = req.params.id * 1;
    const updateUser = req.body;
   
    const user = userService.updateUserr(updateUser,idd).then(data =>{
    
  
        res.status(200).json({
            status: 'success',
            data: {
                userr : data
            }
        });
    });
}

exports.createUser = (req, res) => {
    const idd = req.params.id * 1;
    const updateUser = req.body;
   
    const user = userService.createUserr(updateUser).then(data =>{
        if(data == null) {
            res.status(409).json({
                status: 'conflict',
                message: 'already exists with that email',
                data: {
                   
                }
            });
        }else {
  
        res.status(200).json({
            status: 'success',
            data: {
                userr : data
            }
        });}
    });
}

exports.deleteUser = (req, res) => {
    const idd = req.params.id * 1;
    const user = userService.deleteUserr(idd).then(data =>{
        if(data == null) {
            res.status(404).json({
                status: "fail",
                message: "Wrong id",
                data: null
                
            });
        }else{
            res.status(204).json({
                status: "success",
                message: "Deleted user with that id",
                data: null
                
            
            });
        }
    });
    


    
}







