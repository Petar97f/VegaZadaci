const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const express = require('express');
const e = require('express');

const prisma = new PrismaClient();

async function fAllUsers(){
    
    return await prisma.user.findMany();
}

//Create user function (rename later)
async function f1(userr) {

    const name1 = userr.name;
    const surname1 = userr.surname;
    const email1 = userr.email;
    const phoneNumber1 = userr.phoneNumber;
    
    const userCheck = await prisma.user.findUnique({
        where: {
          email: email1,
        },
      }).then(data =>{
        if(data == null){
            console.log("usao ovede");
            //console.log(data);
            const user1 = prisma.user.create({
                data: {
                    name: name1,
                    surname: surname1,
                    email: email1,
                    phoneNumber: phoneNumber1
                },
            }).then(data => {
                console.log(data)
                return data;

            });
        }else {
            return null;
        }

    });
    
}

async function findById(idd){
    const user = await prisma.user.findUnique({
        where: {
          id: idd,
        },
        include : {
            teams: true,
        }
      })
      
      return user;
}    


async function findByIdTeam(idd){
    const team = await prisma.team.findUnique({
        where: {
          id: idd,
        },
      })
      //console.log(user);
      return team;
} 

async function updateUserr(userr,id2){
    const updateUser = await prisma.user.update({
        
        where: {
          id: id2,
        },
        data: {
          name: userr.name,
          surname: userr.surname,
          email: userr.email,
          phoneNumber: userr.phoneNumber
        },
      });
      return updateUser;
}

async function checkIfExistsInTeam(id2,id3){
    const user = await prisma.user.findUnique({
        where: {
          id: id2,
        },
        include : {
            teams: true,
        }
      });

      
      if( user.teams.some(team => team.id === id3)){
          return null;
      }
      return user;
}


async function addToTeamm(id2,id3){
    
    
    return checkIfExistsInTeam(id2,id3).then(data => {
        if(data == null){
            return null;
        }else{
    



        const updateUser =  prisma.user.update({
        
        where: {
          id: id2,
        },
        data:   {
            teams: {
                connect: { id : id3},
                     }
                },
            });
            return updateUser;
        }
    });
}

async function deleteUserr(idd){
    const deleteUser = await prisma.user.delete({
        where: {
          id: idd,
        },
      })
}

exports.checkID = (req, res, next, val) => {
    const users =  fAllUsers();
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
    fAllUsers().then(data => {
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
  
    const user = findById(id).then(data =>{
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
async function createUser(req, res) {
    const newUser = req.body;
    
    
    
    const userCheck = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      }).then(data =>{
        if(data == null){
            console.log("usao ovede");
            //console.log(data);
            const user1 = prisma.user.create({
                data: {
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber
                },
            }).then(data => {
                res.status(201).json({
                    status: "success",
                    data: {
                        user: newUser
                    }
               });

            });
        }else {
            res.status(409).json({
                status: 'conflict',
                message: 'already exists with that email',
                data: {
                   
                }
            });
        }

    });
    

     
};

exports.addToTeam = (req, res) =>{
  
    const id1 = req.params.id * 1;
    const id2 = req.params.idTeam * 1;

    const user = addToTeamm(id1,id2).then(data =>{
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
   // console.log(updateUser);
    const user = updateUserr(updateUser,idd).then(data =>{
       // console.log("da li ?");
       // console.log(data);
  
        res.status(200).json({
            status: 'success',
            data: {
                userr : data
            }
        });
    });
}

exports.deleteUser = (req, res) => {
    const idd = req.params.id * 1;
    const user = deleteUserr(idd).then(data =>{
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
    return user;


    
}

module.exports.addToTeamm = addToTeamm;
module.exports.checkIfExistsInTeam = checkIfExistsInTeam;
module.exports.createUser = createUser;
module.exports.addToTeamm = addToTeamm;
