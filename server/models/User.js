const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	interviews: [
		{
			startTime: { type: Date, required: true },
			endTime: { type: Date, required: true },
		},
	],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
