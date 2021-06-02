const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const express = require('express');

const prisma = new PrismaClient();

async function fAllTeams(){
    return  await prisma.team.findMany();
}


async function createTeam(teamm) {

    const name1 = teamm.name;
    const team1 = await prisma.team.create({
        
        data: {
            name: name1,
            
        },
      });
     const teams =  await prisma.team.findMany();
 
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



module.exports.fAllTeams = fAllTeams;
module.exports.createTeam = createTeam;
module.exports.findById = findById;
module.exports.updateTeamm = updateTeamm;
module.exports.deleteTeamm = deleteTeamm;