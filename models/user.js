const mongoose = require('mongoose');
require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String
});

module.exports = mongoose.model('User', userSchema);

