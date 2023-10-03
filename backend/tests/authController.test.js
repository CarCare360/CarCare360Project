const authController = require('../controllers/authController');


test('login - should return a error message if inputs are null',async () => {
    const  loginPage = {email  : '',password: ''}
    const result = await authController.login(loginPage);
    expect(result).toBe("Please provide an email and password");
});