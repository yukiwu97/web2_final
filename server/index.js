const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 3003;
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.ATLAS_URI;
mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => console.log('DB connected')
);
const connection = mongoose.connection;
connection.once(
    'open',
    () => { 
        console.log('DB connection established');
    }
);

const addRouter_record = require('./routes/records');

app.get('/', (req, res) => res.send('Hello World!!!'))
app.use('/record', addRouter_record);

app.listen(port, 
    () => console.log(`Running on ${port}`)
);