const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const express = require('express');
const  teamService  = require('./../services/teamService.js');
const prisma = new PrismaClient();



exports.checkBody = (req, res, next) => {
    if(!req.body.name){
        return res.status(400).json({
            status: "fail",
            message: "Missing team name"
        })
    }
    next();
}









exports.getAllTeams = (req, res) => {
    teamService.fAllTeams().then(data => {
    res.status(200).json({
        status: "success",
        data: {
            teams: data
        }
    });
});
}

exports.getTeam = (req, res) => {
   // const users =  fAllUsers();
    const id = req.params.id * 1;
  
    const team = teamService.findById(id).then(data =>{
        if(data == null){
            res.status(404).json({
                status: 'fail',
                message : "Not found",
                data: {
                    
                }
            });
        }
  
        res.status(200).json({
            status: 'success',
            data: {
                teamm : data
            }
        });
    });
    
  };
exports.createTeam = (req, res) =>{
    //console.log(req.body);
   // const users =  fAllUsers();
    //const newId = users[users.length - 1].id + 1;
    const newTeam = req.body;
    
    console.log(newTeam);
    teamService.createTeam(newTeam);
   
       res.status(201).json({
            status: "success",
            data: {
                user: newTeam
            }
       });
     
    };



exports.updateTeam = (req, res) => {
    const idd = req.params.id * 1;
    const updateTeam = req.body;
  
    const team = teamService.updateTeamm(updateTeam,idd).then(data =>{
        if(data == null) {
            res.status(404).json({
                status: 'fail',
                message: 'Wrong id',
                data: {
                    
                }
            });
        }
  
        res.status(200).json({
            status: 'success',
            data: {
                teamm : data
            }
        });
    });
}

exports.deleteTeam = (req, res) => {
    const idd = req.params.id * 1;
    const team = teamService.deleteTeamm(idd).then(data =>{
        if(data == null) {
            res.status(404).json({
                status: "fail",
                message: "Wrong id",
                data: null
                
            });
        }
  
        res.status(204).json({
            status: "success",
            data: null
            
        })
    });


    
}

