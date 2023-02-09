const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')


describe('ScooterApp class: ', () => {
    describe('Constructor(): ', () => {

        it('creates instance of ScooterApp', () => {
            test_scooterApp = new ScooterApp();    
            expect(test_scooterApp).toBeInstanceOf(ScooterApp);
        })
        
        it('initializes stations object, containing "Buchanan_street_station" as empty array', () => {
            expect(test_scooterApp.stations).toMatchObject({Buchanan_street_station : []});
        })

        it('initializes registeredUsers object', () => {
            const tempType = typeof(test_scooterApp.registeredUsers)
            expect(tempType).toBe('object');
        })

    })

    describe('Methods: ', () => {
        
        describe('registerUser(username, password, age)', () => {
            
            it('creates a User and adds instance to registered users object with username as key', () => {
                test_scooterApp.registerUser('test_username', 'test_password', 56);
                expect(test_scooterApp.registeredUsers['test_username']).toBeInstanceOf(User);
            })
        })

        describe('loginUser(username, password)', () => {
            
            it('throws error if the user cannot be located', () => {
                expect(() => {
                    test_scooterApp.loginUser("wrong_username", "wrong_password");
                }).toThrow(new Error("Username or password is incorrect"));
            })

            it('throws error the password is incorrect', () => {
                expect(() => {
                    test_scooterApp.loginUser("test_username", "wrong_password");
                }).toThrow(new Error("Username or password is incorrect"));
            })

            it('logs confirmation to console upon successful login', () => {
                const consoleSpy = jest.spyOn(console, 'log');
                test_scooterApp.loginUser('test_username', 'test_password');
                expect(consoleSpy).toHaveBeenCalledWith('user has been logged in')
            })

            it('sets loggedIn property of appropriate user to true', () => {
                expect(test_scooterApp.registeredUsers['test_username'].loggedIn).toBe(true);
            })

        })

        describe('logoutUser(username): ', () => {
            it('sets loggedIn property of appropriate user to false', () => {
                test_scooterApp.logoutUser('test_username');
                expect(test_scooterApp.registeredUsers['test_username'].loggedIn).toBe(false);
            })
        })

    })
})

// ScooterApp tests here

// register user

// log in

// log out

// rent scooter

// dock scooter
