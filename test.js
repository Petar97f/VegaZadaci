const{ checkIfExistsInTeam } = require('./controllers/userController');


//u slucaju da sam ih vec povezao User 1 je u timu 2
test("should be null", () =>{
    checkIfExistsInTeam(1,2).then(result =>{
        expect(result).toBeNull();
    });
});

//U ovom slucaju user2 treba da bude ubacen pa po logici ova funkcija ne treba da salje null
test("should be null", () =>{
    checkIfExistsInTeam(2,1).then(result =>{
        expect(result).not.toBeNull();
    });
});
