const discussionController = require('../controllers/discussionController');

test('createDiscussion - should return an error message if inputs are null', async () => {
    const req = { body: { title: '', creator: '', postId: '' } };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await discussionController.createDiscussion(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
        title: '',
        creator: '',
        postId: '',
    });
});
