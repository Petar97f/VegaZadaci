const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const express = require('express');

const prisma = new PrismaClient();

async function fAllTeams(){
    return  await prisma.team.findMany();
}

exports.checkBody = (req, res, next) => {
    if(!req.body.name){
        return res.status(400).json({
            status: "fail",
            message: "Missing team name"
        })
    }
    next();
}

async function f1(teamm) {
    console.log("Si dosao ovde??");
    console.log(teamm);
    const name1 = teamm.name;
    const team1 = await prisma.team.create({
        
        data: {
            name: name1,
            
        },
      });
     const teams =  await prisma.team.findMany();
     console.log(teams);
     }

async function findById(idd){
    const team = await prisma.team.findUnique({
        where: {
          id: idd,
        },
        include: {
            users : true,
        }
      })
      //console.log(user);
      return team;
}   


async function updateTeamm(teamm,id2){
    const updateTeam = await prisma.team.update({
        
        where: {
          id: id2,
        },
        data: {
          name: teamm.name,
          
        },
      });
      return updateTeam;
}

async function deleteTeamm(idd){
    const deleteTeam = await prisma.team.delete({
        where: {
          id: idd,
        },
      });
      return deleteTeam;
}



exports.getAllTeams = (req, res) => {
    fAllTeams().then(data => {
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
  
    const team = findById(id).then(data =>{
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
    f1(newTeam);
   
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
    console.log(updateTeam);
    const team = updateTeamm(updateTeam,idd).then(data =>{
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
    const team = deleteTeamm(idd).then(data =>{
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

