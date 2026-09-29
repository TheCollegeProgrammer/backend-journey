const express = require('express');
const path = require('path');
const app = express();
const User = require('./models/user');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/read', async (req, res) => {
    let allusers = await User.find();
    res.render('read', { users: allusers });
});

app.post('/create',async (req, res) => {
    let { name, email, image } = req.body;

    let createdUser = await User.create({
        name,
        email,
        image
    });

    res.redirect('/read');
});

app.get('/delete/:id', async (req, res) => {
    let users = await User.findByIdAndDelete(req.params.id);
    res.redirect('/read');
});

app.get('/update/:id', async (req, res) => {
    let user = await User.findById(req.params.id);

    res.render('update', { user });
});

app.post('/update/:id', async (req, res) => {
    let updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.redirect('/read');
});

app.listen(3000);   