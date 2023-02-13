const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  
  constructor(){

    this.stations = {
        test_station : [],
        Buchanan_street_station : [],
        Sauchiehall_street_station : [],
        Saltmarket_street_station : [],
      };

    this.registeredUsers = {};

  }

  registerUser(username, password, age){
    
    if(age<18){
      throw new Error("users must be at least 18 years old")
    }
    
    if(this.registeredUsers.hasOwnProperty(username)){
      throw new Error("username already registered")
    }
    const tempUser = new User(username, password, age);
    this.registeredUsers[username] = tempUser;
  }

  loginUser(username, password){
    if(!(username in this.registeredUsers)){
      throw new Error("Username or password is incorrect")
    }

    try{
      this.registeredUsers[username].login(password);
      console.log("user has been logged in")
    }
    catch{
      throw new Error("Username or password is incorrect")
    }
  }

  logoutUser(username){
    this.registeredUsers[username].logout();
  }

  createScooter(station){
    const tempScooter = new Scooter(station);
    let stationCheck = false;
    for (const[key, value] of Object.entries(this.stations)){
      if(station == key){
        value.push(tempScooter);
        this.nextSerial++;
        stationCheck = true;
        console.log('created new scooter');
        return tempScooter;
      }
    }
    if(!stationCheck){
      throw new Error("no such station")
    }
  }



  dockScooter(scooter, station){
    
    for (const[key, value] of Object.entries(this.stations)){
      if(station == key){
        for(let i = 0; i < value.length; i++){
          if(scooter.serial == value[i].serial){
            throw new Error(`scooter no.${scooter.serial} already docked at ${station}`)
          }
          scooter.user(null);
          value.push(scooter);
          console.log(`scooter no.${scooter.serial} succesfully docked at ${station}`)
        }
      }
    }
    throw new Error("no such station") 
  }
}

  // need to refactor (removed user as parameter for Scooter)
  // rentScooter(scooter, user){
  //   for (const[key, value] of Object.entries(this.stations)){
      
  //     let dockedCheck = false;

  //     for(let i =0; i<value.length; i++){
  //       if(value[i].serial == scooter.serial){
  //         value.splice(i,1)
  //         dockedCheck = true;
  //       }
  //     }

  //     if(dockedCheck){
  //       scooter.station = null;
  //       scooter.user = user;
  //       console.log('scooter is rented')
  //     }

  //     if(!dockedCheck){
  //       console.log('scooter is already rented')
  //     }

  //   }
  // }


  // print(){
    
  //   this.logger("Registered users: \n")
  //   for (const [key, value] of Object.entries(this.registeredUsers)) {
  //     this.logger(`${value}`);
  //   }

  //   this.logger("Stations: \n")
  //   for (const [key, value] of Object.entries(this.stations)) {
  //     this.logger(`${key}: ${value.length}`);
  //   }
  // }


  
  



module.exports = ScooterApp
