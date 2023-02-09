class Scooter{
  
  static nextSerial = 1;

  constructor(station){
    this.station = station;  
    this.user = null;  
    this.serial =  Scooter.nextSerial;
    Scooter.nextSerial++;
    this.charge = 100;  
    this.isBroken = false;
  }

  rent(user){
    if(this.isBroken){
      throw new Error('Scooter is broken!')
    }
    if(this.charge<20){
      throw new Error('Scooter needs charging!')
    }
    this.user = user;
    this.station = null;
  }

  dock(station){
    this.station = station;
    this.user = null;
  }

  async recharge(){
    console.log(`Starting charge... [${this.charge}%]`);
    while(this.charge<100){
      await new Promise(resolve => setTimeout(resolve, 200)); 
      this.charge = this.charge + 10;
      if(this.charge>100) {this.charge = 100;}
      console.log(`Charging... [${this.charge}%]`)
    }
    console.log('Charging complete!');   
  }

  async requestRepair(){
    console.log('Requesting repair...')
    for(let i=5; i>=0; i--){
      console.log(`Repairs commencing in ${i}s...`)
      await new Promise(resolve => setTimeout(resolve, 1000)); 
    }
    console.log('Magic happening...')
    this.isBroken = false;
    console.log('Repairs complete!')
    await new Promise(resolve => setTimeout(resolve, 100)); 
  }
}

module.exports = Scooter
