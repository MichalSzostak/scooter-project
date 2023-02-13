class Scooter{
  
  static nextSerial = 1;

  constructor(station){
    
    this._station = station;  

    this._serial =  Scooter.nextSerial;
    Scooter.nextSerial++;

    this._user = null;  
    this._charge = 100;  
    this._isBroken = false;
  }

  set station(station_name){
    this._station = station_name;
  }

  get station(){
    return this._station;
  }

  get serial(){
    return this._serial
  }

  set user(user){
    this._user = user
  }

  get user(){
    return this._user;
  }
  
  get charge(){
    return this._charge;
  }

  set charge(int){
    this._charge = int;
  }

  get isBroken(){
    return this._isBroken;
  }

  set isBroken(bool){
    this._isBroken = bool;
  }



  rent(){
    if(this._isBroken){
      throw new Error('Scooter is broken!')
    }
    if(this._charge<20){
      throw new Error('Scooter needs charging!')
    }
    this._station = null;
    return true;
  }

  dock(station){
    this._station = station;
    this._user = null;
  }

  async recharge(){
    console.log(`Charging initiated... `);
    console.log(`Charging... [${this._charge}%]`);
    while(this._charge<100){
      await new Promise(resolve => setTimeout(resolve, 200)); 
      this._charge = this._charge + 10;
      if(this._charge>100) {this._charge = 100;}
      console.log(`Charging... [${this._charge}%]`)
    }
    console.log('Charging complete!');   
  }

  async requestRepair(){
    console.log('Requesting repair...')
    for(let i=5; i>=1; i--){
      console.log(`Repairs commencing in ${i}s...`)
      await new Promise(resolve => setTimeout(resolve, 1000)); 
    }
    console.log('Repairing...')
    this._isBroken = false;
    console.log('Repairs complete!') 
  }
}

module.exports = Scooter
