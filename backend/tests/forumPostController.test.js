const forumPostController = require('../controllers/forumPostController');


test('login - should return a error message if inputs are null',async () => {
    const  forum = {content  : '',author: '',discussionId: ''}
    const result = await forumPostController.createPost(forum);
    expect(result).toBe("Please provide an content, author and discussionId");
});