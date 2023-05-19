require("dotenv").config();

var cors = require('cors');
var bcrypt = require('bcryptjs');
const port = 3000;
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(cors());

require('./routes/auth/auth')(app, bcrypt);
require('./routes/user/user')(app, bcrypt);
require('./routes/todos/todos')(app, bcrypt);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
