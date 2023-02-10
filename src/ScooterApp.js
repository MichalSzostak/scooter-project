const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  
  constructor(){

    this.stations = {
        Buchanan_street_station : [],
        Sauchiehall_street_station : [],
        Saltmarket_street_station : [],
      };

    this.registeredUsers = {};

  }

  registerUser(username, password, age){
    const tempUser = new User(username, password, age);
    this.registeredUsers[String(username)] = tempUser;
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
        return tempScooter;test_scooterApp
      }
    }
    if(!stationCheck){
      throw new Error("no such station")
    }
  }



  dockScooter(scooter, station){
    let stationCheck = false;
    for (const[key, value] of Object.entries(this.stations)){
      
      let dockedCheck = false;

      for(let i =0; i<value.length; i++){
        if(value[i].serial == scooter.serial){
          dockedCheck = true;
          throw new Error("scooter already at station");
        }
      }

      if(dockedCheck) {break;}

      if(station == key){
        scooter.station = key;
        scooter.user = null;
        value.push(scooter);
        stationCheck = true;
        console.log('scooter is docked');
      }

    }

    if(!stationCheck){ throw new Error("no such station") }
  }

  // need to refactor (removed user as parameter for Scooter)
  rentScooter(scooter, user){
    for (const[key, value] of Object.entries(this.stations)){
      
      let dockedCheck = false;

      for(let i =0; i<value.length; i++){
        if(value[i].serial == scooter.serial){
          value.splice(i,1)
          dockedCheck = true;
        }
      }

      if(dockedCheck){
        scooter.station = null;
        scooter.user = user;
        console.log('scooter is rented')
      }

      if(!dockedCheck){
        console.log('scooter is already rented')
      }

    }
  }

  print(){
    this.logger("Registered users: \n")
    for (const [key, value] of Object.entries(this.registeredUsers)) {
      this.logger(`${value}`);
    }

    this.logger("Stations: \n")
    for (const [key, value] of Object.entries(this.stations)) {
      this.logger(`${key}: ${value.length}`);
    }

  }

  logger(text){
    console.log(text)
  }
  
  

}

module.exports = ScooterApp
