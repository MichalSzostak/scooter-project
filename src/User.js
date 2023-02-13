class User {
  
  constructor(username, password, age){
    this._username = username;
    this._password = password;
    this._age = age;
    this._loggedIn = false;
  }

  get username(){
    return this._username
  }

  get password(){
    return this._password
  }

  get age(){
    return this._age
  }

  get loggedIn(){
    return this._loggedIn
  }

  set loggedIn(bool){
    this._loggedIn = bool
  }

  login(password){
    if(this.password === password){
      this.loggedIn = true
    }
    else{
      throw new Error("Incorrect password")
    }
  }

  logout(){
    this.loggedIn = false
  }
}

module.exports = User
