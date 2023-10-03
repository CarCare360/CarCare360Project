const authController = require('../controllers/authController');

test('login - should return a error message if inputs are null', async () => {
  const req = {
    body: { email: '', password: '' },
  };
  const res = {};
  const next = jest.fn(); // Using Jest's mock function for the next middleware function

  await authController.login(req, res, next);

  // Check if the next function was called with the expected error message
  expect(next).toHaveBeenCalledWith(expect.any(Error));


});
