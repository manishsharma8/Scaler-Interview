const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
	title: { type: String, required: true },
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
	participants: [
		{
			firstName: { type: String, required: true },
			lastName: { type: String, required: true },
			email: { type: String, required: true },
		},
	],
});

const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;
