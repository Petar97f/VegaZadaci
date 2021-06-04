const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const express = require('express');
const e = require('express');

const prisma = new PrismaClient();

async function fAllUsers(){
    
    return await prisma.user.findMany();
}

async function createUserr(userr) {
    
    const name1 = userr.name;
    const surname1 = userr.surname;
    const email1 = userr.email;
    const password1 = userr.password;
    const phoneNumber1 = userr.phoneNumber;
    
    return userCheck = await prisma.user.findUnique({
        where: {
          email: email1,
        },
      }).then(data =>{
        if(data == null){
           
            const user1 = prisma.user.create({
                data: {
                    name: name1,
                    surname: surname1,
                    email: email1,
                    password: password1,
                    phoneNumber: phoneNumber1
                },
            });
            return user1;
        }else {
            return null;
        }
    });
    
}

async function createUser(req, res) {
    
    const newUser = req.body;
    
    const userCheck = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      }).then(data =>{
        if(data == null){
             const user1 = prisma.user.create({
                data: {
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    password: req.body.password,
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

async function findById(idd){
    const user = await prisma.user.findUnique({
        where: {
          id: idd,
        },
        include : {
            teams: true,
        }
      });
      
      return user;
}    

async function findByEmail(emaill){
    console.log("hereeeeeeeeee  "+ emaill);

     userCheck = await prisma.user.findUnique({
        where: {
          email: emaill,
        },
      });
      console.log("hereeeeeeeeee  "+ userCheck);
      return userCheck;
} 


async function findByIdTeam(idd){
    const team = await prisma.team.findUnique({
        where: {
          id: idd,
        },
      })
  
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
          password: userr.password,
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
    try{
    return deleteUser = await prisma.user.delete({
        where: {
          id: idd,
        },
      })}catch{
          return null;
      }
}

module.exports.fAllUsers = fAllUsers;
module.exports.createUserr = createUserr;
module.exports.createUser = createUser;
module.exports.findById = findById;
module.exports.findByEmail = findByEmail;
module.exports.findByIdTeam = findByIdTeam;
module.exports.updateUserr = updateUserr;
module.exports.checkIfExistsInTeam = checkIfExistsInTeam;
module.exports.addToTeamm = addToTeamm;
module.exports.deleteUserr = deleteUserr;