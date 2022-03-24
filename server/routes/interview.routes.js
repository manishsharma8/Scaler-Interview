const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');
const User = require('../models/User');

router.get('/interviews', async (req, res) => {
	const interviews = await Interview.find({});
	res.status(201).json({ interviews });
});

router.post('/scheduleInterview', async (req, res) => {
	const interview = await Interview.create(req.body);
	res.status(201).json({ interview });
});

router.get('/users', async (req, res) => {
	const users = await User.find({});
	res.json({ users });
});

module.exports = router;
