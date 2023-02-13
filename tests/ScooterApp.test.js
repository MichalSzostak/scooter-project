const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')


const originalLog = console.log;
beforeEach(() => {
    console.log = jest.fn();
});
afterEach(() => {
    console.log.mockClear();
    console.log = originalLog;
});

let test_scooterApp = new ScooterApp();

describe('ScooterApp class: ', () => {
    describe('Constructor(): ', () => {

        it('builds instance of ScooterApp', () => {
            expect(test_scooterApp).toBeInstanceOf(ScooterApp);
        })
        
        it('creates JS object, stations, including "test_station" as empty array', () => {
            expect(test_scooterApp.stations).toMatchObject({test_station : []});
        })

        it('creates empty JS object, registeredUsers', () => {
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

            it('throws error if the user is under 18', () => {
                expect(() => {
                    test_scooterApp.registerUser('test_username2', 'test_password', 17);
                }).toThrowError("users must be at least 18 years old");
            })

            it('throws error if username has already been registered', () => {
                expect(() => {
                    test_scooterApp.registerUser('test_username', 'test_password', 56);
            }).toThrowError("username already registered");
        })

        })

        describe('loginUser(username, password)', () => {
            
            it('throws error if the username cannot be located', () => {
                expect(() => {
                    test_scooterApp.loginUser("wrong_username", "wrong_password");
                }).toThrowError("Username or password is incorrect");
            })

            it('throws error if the password is incorrect', () => {
                expect(() => {
                    test_scooterApp.loginUser("test_username", "wrong_password");
                }).toThrowError("Username or password is incorrect");
            })

            it('on success logs confirmation to console', () => {
                test_scooterApp.loginUser('test_username', 'test_password');
                const logs = console.log.mock.calls;
                expect(logs[0][0]).toBe("user has been logged in");
            })

            it('on success sets _loggedIn to true', () => {
                expect(test_scooterApp.registeredUsers['test_username'].loggedIn).toBe(true);
            })
        })

        describe('logoutUser(username): ', () => {
            it('on success sets _loggedIn to false', () => {
                test_scooterApp.logoutUser('test_username');
                expect(test_scooterApp.registeredUsers['test_username'].loggedIn).toBe(false);
            })
        })

        describe('createScooter(station): ', () => {
            it('throws error when station does not exist', () => {
                expect(() => {
                    test_scooterApp.createScooter('fake_station');
                }).toThrowError("no such station");
            })

            it('adds new scooter to the correct station in stations object', () => {
                let temp_scooter = test_scooterApp.createScooter('test_station');
                expect(test_scooterApp.stations['test_station'][0]).toBe(temp_scooter);
            })
            it('logs confirmation of new scooter being added', () => {
                test_scooterApp.createScooter('test_station');
                const logs = console.log.mock.calls;
                expect(logs[0][0]).toBe("created new scooter");

            })
            it('returns Scooter object', () => {
                testScooter = test_scooterApp.createScooter('Buchanan_street_station');
                expect(testScooter).toBeInstanceOf(Scooter)
            })
        })

        describe('dockScooter(scooter, station): ', () => {
            let temp_scooter = test_scooterApp.stations['test_station'][0];
            let temp_user = test_scooterApp.registerUser['test_user']
            test_scooterApp.dockScooter(temp_scooter, temp_user );

            it('adds the scooter to the station’s scooter list', () => {
                expect(test_scooterApp.stations['test_station'][0].serial).toBe(temp_scooter);
            })

            it('logs `scooter is docked` to the console', () => {
                expect(consoleSpy).toHaveBeenCalledWith('scooter is docked');
            })
            // it('throws `no such station` error if the station does not exist', () => {
            //     test_scooterApp.rentScooter(scooter, temp_user_rentS );
            //     expect(() => {
            //         test_scooterApp.dockScooter(scooter, "fake_station");
            //     }).toThrowError("no such station")
            // })
            it('throws `scooter already at station` error if the scooter is already there.', () => {
                test_scooterApp.dockScooter(scooter, "Buchanan_street_station");
                expect(() => {
                    test_scooterApp.dockScooter(scooter, "Buchanan_street_station");
                }).toThrow(new Error("scooter already at station"))
            })
        }) 

        // describe('rentScooter(scooter, user)', () => {
        //     test_scooterApp = new ScooterApp(); 
        //     temp_scooter_copy = test_scooterApp.createScooter('Buchanan_street_station');
        //     temp_user_rentS = new User('renting_user', 'password', 56);
        //     const consoleSpy = jest.spyOn(console, 'log');
        //     test_scooterApp.rentScooter(temp_scooter_copy, temp_user_rentS );
            
        //     it('removes scooter from station', () => {
        //         expect(test_scooterApp.stations['Buchanan_street_station']).not.toContain(temp_scooter_copy);
        //     })
        //     it('logs confirmation of Scooter being rented', () => {
        //         expect(consoleSpy).toHaveBeenCalledWith("scooter is rented")
        //     })
        //     it('logs warning if scooter was already rented', () => {
        //         test_scooterApp.rentScooter(temp_scooter_copy, temp_user_rentS );
        //         expect(consoleSpy).toHaveBeenCalledWith("scooter is already rented")
        //     })
        
        // })

        // // describe('print(): ', () => {
        // //     scooterApp = new ScooterApp();
        //     temp_scooter_copy = scooterApp.createScooter('Saltmarket_street_station');
        //     // scooterApp.registerUser('username_1', 'password', 15);
        //     // scooterApp.registerUser('username_2', 'password', 15);
        //     const logSpy = jest.spyOn(scooterApp, 'logger');
        //     scooterApp.print();
            
        //     it('prints list of users and list of station with number of scooters docked', () =>{
        //         expect(scooterApp.logger).toHaveBeenCalledTimes(7);
        //         expect(scooterApp.logger).toHaveBeenLastCalledWith('Saltmarket_street_station: 1')
        //     })
        // })
    })
})