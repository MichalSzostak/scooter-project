const User = require('../src/User')

describe('User class: ', () => {
    const test_user = new User('test_username', 'test_password', 56);
    
    describe('Constructor: ', () => {
        it('creates instance of User', () => {
            expect(test_user).toBeInstanceOf(User);
        });
        it('allocates username correctly', () => {
            expect(test_user.username).toBe('test_username');
        });
        it('allocates password correctly', () => {
            expect(test_user.password).toBe('test_password');
        });
        it('allocates age correctly', () => {
            expect(test_user.age).toBe(56);
        });
        it('starts with loggedIn as false', () => {
            expect(test_user.loggedIn).toBe(false);
        });
    })

    describe('Methods: ', () => {

        describe('login(password): ', () => {
            it('logs user in if password is correct', () => {
                test_user.loggedIn = false;
                test_user.login('test_password');
                expect(test_user.loggedIn).toBe(true);
            });      
              
            it('throws error if password is wrong', () => {
                test_user.loggedIn = false;
                expect(() => {
                    test_user.login('wrong_password');
                }).toThrow(new Error("Incorrect password"));
            });
        })

        describe('logout(): ', () => {
            test_user.loggedIn = true;
            test_user.logout()
            it('logs user out', () => {
                expect(test_user.loggedIn).toBe(false);
            });
        })
    })
})