const express = require('express');
const Interview = require('../models/Interview');
const User = require('../models/User');

const router = express.Router();

router.get('/interviews', async (req, res) => {
	const interviews = await Interview.find({});
	res.status(201).json({ interviews });
});

router.post('/scheduleInterview', async (req, res) => {
	const { participants } = req.body;
	participants.forEach((p) => {
		delete p.label;
		delete p.value;
	});
	const interview = await Interview.create({
		...req.body,
		participants,
	});
	res.status(201).json({ interview });
});

router.get('/users', async (req, res) => {
	const users = await User.find({});
	res.json({ users });
});

module.exports = router;
