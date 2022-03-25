import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import moment from 'moment';
import { Menu, Transition } from '@headlessui/react';
import ScheduleInterviewModal from './scheduleInterviewModal';

const InterviewList = ({ isOpen, setIsOpen }) => {
	const [edit, setEdit] = useState(false);
	const [interviews, setInterviews] = useState([]);
	const [id, setId] = useState(null);
	const [title, setTitle] = useState('');
	const [participants, setParticipants] = useState([]);
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');

	useEffect(() => {
		axios
			.get(API_BASE_URL + '/interviews')
			.then((res) => setInterviews(res.data.interviews));
	}, []);

	useEffect(() => {
		if (!isOpen) setEdit(false);
	}, [isOpen]);

	const handleDelete = async (id) => {
		await axios.delete(API_BASE_URL + `/interview/${id}`);
		const _interviews = interviews.filter((el) => el._id !== id);
		setInterviews(_interviews);
	};

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
						<div className="flex">
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
							<Menu
								as="div"
								className="relative inline-block text-left my-auto"
							>
								<Menu.Button>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 my-auto ml-3 cursor-pointer"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
										/>
									</svg>
								</Menu.Button>
								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute z-10 flex flex-col right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										<Menu.Item
											className="p-3 cursor-pointer hover:bg-slate-100 rounded"
											onClick={() => {
												setEdit(true);
												setIsOpen(true);
												setId(interview._id);
												setTitle(interview.title);
												setStartTime(interview.startTime);
												setEndTime(interview.endTime);
												setParticipants(interview.participants);
											}}
										>
											{() => <div>Edit</div>}
										</Menu.Item>
										<Menu.Item
											onClick={() => handleDelete(interview._id)}
											className="p-3 cursor-pointer hover:bg-slate-100 rounded"
										>
											{() => <div>Delete</div>}
										</Menu.Item>
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
					</div>
				</div>
			))}
			{edit && (
				<ScheduleInterviewModal
					edit={edit}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					_id={id}
					title={title}
					startTime={startTime}
					endTime={endTime}
					participants={participants}
				/>
			)}
		</div>
	);
};

export default InterviewList;
