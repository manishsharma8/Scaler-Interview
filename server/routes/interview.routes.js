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
	const clashingInterviews = await Interview.find({
		$and: [
			{ endTime: { $gte: req.body.startTime } },
			{ startTime: { $lte: req.body.endTime } },
		],
	});
	clashingInterviews.forEach((interview) => {
		const ex = interview.participants.some((participant) =>
			participants.some((p) => p.email == participant.email)
		);
		if (ex) res.json('Participant already preoccupied');
	});
	const interview = await Interview.create({
		...req.body,
		participants,
	});
	res.status(201).json({ interview });
});

router.put('/scheduleInterview/:id', async (req, res) => {
	const _id = req.params.id;
	const { participants } = req.body;
	participants.forEach((p) => {
		delete p.label;
		delete p.value;
	});
	const interview = await Interview.findByIdAndUpdate(_id, {
		...req.body,
		participants,
	});
	res.status(201).json({ interview });
});

router.delete('/interview/:id', async (req, res) => {
	await Interview.deleteOne({ _id: req.params.id });
	res.send('Interview Deleted');
});

module.exports = router;
