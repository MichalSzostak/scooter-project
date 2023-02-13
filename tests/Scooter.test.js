const Scooter = require('../src/Scooter')
const User = require('../src/User')

const originalLog = console.log;
beforeEach(() => {
    console.log = jest.fn();
});
afterEach(() => {
    console.log.mockClear();
    console.log = originalLog;
});

describe('Scooter class: ', () => {

    const test_scooter = new Scooter('test_station');
    const test_user = new User('test_username', 'test_password', 1);




    describe('Constructor(station): ', () => {

        it('builds instance of Scooter', () => {
            expect(test_scooter).toBeInstanceOf(Scooter);
        });

        it('sets _station correctly', () => {
            expect(test_scooter._station).toBe('test_station');
        });

        it('sets _serial correctly', () => {
            expect(test_scooter._serial).toBe(1)
        });

        it('increments Scooter.nextSerial correctly', () => {
            const test_scooter2 = new Scooter('test_station');
            expect(test_scooter2._serial).toBe(2)
        });

        it('sets _user as null', () => {
            expect(test_scooter._user).toBe(null);
        })

        it('sets _charge at 100', () => {
            expect(test_scooter._charge).toBe(100);
        });

        it('sets _isBroken to false', () => {
            expect(test_scooter._isBroken).toBe(false)
        })
    })

    describe('Methods: ', () => {

        describe('rent(): ', () => {

            it('throws error if _charge is under 20', () => {
                test_scooter._charge = 15;
                expect(() => {
                    test_scooter.rent(test_user);
                }).toThrow(new Error("Scooter needs charging!"));
            });

            it('throws error if _isBroken is true', () => {
                test_scooter._isBroken = true;
                expect(() => {
                    test_scooter.rent(test_user);
                }).toThrow(new Error("Scooter is broken!"));
            });

            it('on success makes _station null', () => {
                test_scooter._charge = 100;
                test_scooter._isBroken = false;
                test_scooter.rent();
                expect(test_scooter._station).toBe(null);
            })

        })

        describe('dock(station): ', () => {

            it('on success sets _user to null', () => {
                test_scooter._user = "random_user";
                test_scooter.dock('test_station');
                expect(test_scooter._user).toBe(null);
            })

            it('on success sets _station correctly', () => {
                expect(test_scooter._station).toBe('test_station');
            })
        })

        describe('async recharge(): ', () => {
            it('sets _charge to 100: ', async () => {
                test_scooter.charge = 60;
                await test_scooter.recharge();
                expect(test_scooter.charge).toBe(100);
            }, 10000)

            it(' and logs progress: ', async () => {
                test_scooter._charge = 65;
                await test_scooter.recharge();
                const logs = console.log.mock.calls;
                expect(logs[0][0]).toBe("Charging initiated... ");
                expect(logs[1][0]).toBe("Charging... [65%]");
                expect(logs[2][0]).toBe("Charging... [75%]");
                expect(logs[3][0]).toBe("Charging... [85%]");
                expect(logs[4][0]).toBe("Charging... [95%]");
                expect(logs[5][0]).toBe("Charging... [100%]");
                expect(logs[6][0]).toBe("Charging complete!");
            })
        })

        describe('async requestRepair(): ', () => {

            it('sets _isBroken to false: ', async () => {
                test_scooter.isBroken = true;
                await test_scooter.requestRepair();
            }, 10000)

            it('logs progress correctly: ', async () => {
                test_scooter.isBroken = true;
                await test_scooter.requestRepair();
                const logs = console.log.mock.calls;
                expect(logs[0][0]).toBe("Requesting repair...");
                expect(logs[1][0]).toBe("Repairs commencing in 5s...");
                expect(logs[2][0]).toBe("Repairs commencing in 4s...");
                expect(logs[3][0]).toBe("Repairs commencing in 3s...");
                expect(logs[4][0]).toBe("Repairs commencing in 2s...");
                expect(logs[5][0]).toBe("Repairs commencing in 1s...");
                expect(logs[6][0]).toBe("Repairing...");
                expect(logs[7][0]).toBe("Repairs complete!");
                expect(test_scooter._isBroken).toBe(false)
            }, 10000)
        })
    })
})

