require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
let bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.ATLAS_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('DB connected.');
});

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(5000, () => console.log('Server listening at port 5000'));
