require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const interviewRoutes = require('./routes/interview.routes');
const User = require('./models/User');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);

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

app.use('/api', interviewRoutes);

app.get('/api/users', async (req, res) => {
	const users = await User.find({});
	res.json({ users });
});

app.listen(5000, () => console.log('Server listening at port 5000'));
