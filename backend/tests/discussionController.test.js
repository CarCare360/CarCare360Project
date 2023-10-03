const discussionController = require('../controllers/discussionController');


test('createDiscussion - should return a error message if inputs are null',async () => {
    const  discussion = {title  : '',creator: '',postId: ''}
    const result = await discussionController.createDiscussion(discussion);
    expect(result).toBe('Please provide a title, creator and postId');
});