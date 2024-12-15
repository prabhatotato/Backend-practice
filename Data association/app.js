const express = require('express');
const app = express();
const postModel  = require('./models/posts');
const userModel = require('./models/user');

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/create',  async(req, res) => {
    const user = await userModel.create({
        username: 'John Doe',
        email: 'john@example.com',
        age: 25
    });

    
    res.send(user);
});

app.get('/posts/create',  async(req, res) => {
     
    let post = await postModel.create({
        postData: 'Hello World. This is a post.',
        user: "675eebaadd542933a09074c4"
    });

    let user = await userModel.findOne({_id:'675eebaadd542933a09074c4'})
    user.posts.push(post._id)
    user.save()
    res.send({post,user});
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});