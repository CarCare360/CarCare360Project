const forumPostController = require('../controllers/forumPostController');

test('createDiscussion - should return an error message if inputs are null', async () => {
    const req = { body: { content: '', author: '', discussionId: '' } };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    await forumPostController.createPost(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
        content: '',
        author: '',
        discussionId: '',
    });
});
