const User = require('../src/User')

describe('User class: ', () => {
    const test_user = new User('test_username', 'test_password', 56);
    
    describe('Constructor: ', () => {
        it('builds  instance of User', () => {
            expect(test_user).toBeInstanceOf(User);
        });
        it('sets _username correctly', () => {
            expect(test_user._username).toBe('test_username');
        });
        it('sets _password correctly', () => {
            expect(test_user._password).toBe('test_password');
        });
        it('sets _age correctly', () => {
            expect(test_user._age).toBe(56);
        });
        it('sets _loggedIn as false', () => {
            expect(test_user._loggedIn).toBe(false);
        });
    })

    describe('Methods: ', () => {

        describe('login(password): ', () => {
            it('on success sets _loggedIn to true', () => {
                test_user.loggedIn = false
                test_user.login('test_password');
                expect(test_user.loggedIn).toBe(true);
            });      
              
            it('throws error if password is wrong', () => {
                test_user._loggedIn = false;
                expect(() => {
                    test_user.login('wrong_password');
                }).toThrow(new Error("Incorrect password"));
            });
        })

        describe('logout(): ', () => {
            test_user._loggedIn = true;
            test_user.logout()
            it('on success sets _loggedIn to false', () => {
                expect(test_user._loggedIn).toBe(false);
            });
        })
    })
})