const Scooter = require('../src/Scooter')
const User = require('../src/User')


describe('Scooter class: ', () => {

    const test_scooter = new Scooter('test_station');
    const test_scooter2 = new Scooter('test_station');
    const test_user = new User('test_username', 'test_password', 56);

    describe('Constructor(station): ', () => {
        it('creates instance of Scooter', () => {
            const test_scooter = new Scooter('test_station');
            expect(test_scooter).toBeInstanceOf(Scooter);
        });

        it('allocates station correctly', () => {
            expect(test_scooter.station).toBe('test_station');
        });

        it('allocates serial number correctly', () => {
            expect(test_scooter.serial).toBe(1)
        });

        it('increments serial number correctly', () => {
            expect(test_scooter2.serial).toBe(2)
        });

        it('creates "user" variable, defaulted to null', () => {
            expect(test_scooter.user).toBe(null);
        })

        it('initiates charge value at 100', () => {
            expect(test_scooter.charge).toBe(100);
        });

        it('initiates isBroken value to false', () => {
            expect(test_scooter.isBroken).toBe(false)
        })
    })

    describe('Methods: ', () => {

        describe('rent(user): ', () => {

            it('throws error if charge is under 20%', () => {
                test_scooter.charge = 15;
                expect(() => {
                    test_scooter.rent(test_user);
                }).toThrow(new Error("Scooter needs charging!"));
            });

            it('throws error if scooter is broken', () => {
                test_scooter.isBroken = true;
                expect(() => {
                    test_scooter.rent(test_user);
                }).toThrow(new Error("Scooter is broken!"));
            });

            it('on success makes Scooter.station null', () => {
                test_scooter2.rent(test_user);
                expect(test_scooter2.station).toBe(null);
            })

            it('on success makes Scooter.user instance of User', () => {
                expect(test_scooter2.user).toBeInstanceOf(User);
            })

        })

        describe('dock(station): ', () => {

            it('on success makes Scooter.user null', () => {
                test_scooter2.dock('test_station');
                expect(test_scooter2.user).toBe(null);
            })

            it('on success makes Scooter.station set to station', () => {
                expect(test_scooter2.station).toBe('test_station');
            })
        })

        describe('async recharge(): ', () => {
            it('sets instance variable "charge" to 100: ', async () => {
                const consoleSpy = jest.spyOn(console, 'log');
                await test_scooter.recharge();
                expect(test_scooter.charge).toBe(100)
            })
        })

        describe('async requestRepair(): ', () => {
            it('sets instance variable "isBroken" to false: ', async () => {
                const consoleSpy = jest.spyOn(console, 'log');
                await test_scooter.requestRepair();
                expect(test_scooter.isBroken).toBe(false)
            }, 10000)
        })


    })
})

