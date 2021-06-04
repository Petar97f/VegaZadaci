

function UserModel ( name, surname, email, password, phoneNumber){
   
    
        //this.user_id = user_id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.role = 0;
    }

function UserModelAdmin ( name, surname, email, password, phoneNumber, role){
   
    
        //this.user_id = user_id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.role = 1;
    }    


module.exports = UserModel;
  