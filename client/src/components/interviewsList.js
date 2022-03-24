import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import moment from 'moment';

const InterviewList = () => {
	const [interviews, setInterviews] = useState([]);

	useEffect(() => {
		axios
			.get(API_BASE_URL + '/interviews')
			.then((res) => setInterviews(res.data.interviews));
	}, []);

	return (
		<div className="bg-gray-100 flex flex-col gap-2 rounded-md p-4">
			{interviews.map((interview) => (
				<div
					key={interview._id}
					className="bg-white p-3 gap-y-2 rounded-md grid grid-cols-3"
				>
					<div className="text-lg">{interview.title}</div>
					<div className="flex flex-wrap gap-2">
						{interview.participants.map((participant) => (
							<div className="bg-purple-200 text-purple-700 rounded py-2 px-3 text-xs">
								{participant.firstName} {participant.lastName}
							</div>
						))}
					</div>
					<div className="w-auto ml-auto">
						<div className="flex ml-auto text-base bg-red-100 text-red-800 my-auto py-1 px-2 rounded">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 my-auto mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							{moment(interview.startTime).format('HH:mm')}
							{' - '}
							{moment(interview.endTime).format('HH:mm')}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default InterviewList;
