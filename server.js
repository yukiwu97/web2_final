const path = require("path")
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "client", "build")))
app.use(routes);

const uri = process.env.MONGODB_URI || 'mongodb+srv://root:root@cluster0-dzkvv.mongodb.net/appDB?retryWrites=true&w=majority';
mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => console.log('DB connected, with uri = ' + uri)
);
const connection = mongoose.connection;
connection.once(
    'open',
    () => { 
        console.log('DB connection established');
    }
);

app.get('/', (req, res) => res.send('Hello World!!!'))

app.listen(port, 
    () => console.log(`Running on ${port}`)  
);