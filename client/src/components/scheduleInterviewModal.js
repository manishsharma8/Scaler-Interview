import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import { API_BASE_URL } from '../utils/constants';
import Select from 'react-select';

const ScheduleInterviewModal = (props) => {
	const format = 'HH:mm';
	const [title, setTitle] = useState('');
	const [startTime, setStartTime] = useState(moment(props.startTime));
	const [endTime, setEndTime] = useState(moment(props.endTime));
	const [participants, setParticipants] = useState([]);
	const [options, setOptions] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get(API_BASE_URL + '/users')
			.then((res) => setOptions(res.data.users));

		if (props.edit) {
			setTitle(props.title);
			setStartTime(moment(props.startTime));
			setEndTime(moment(props.endTime));
			props.participants.forEach((option) => {
				option.label = option.firstName;
				option.value = option._id;
			});
			setParticipants(props.participants);
		} else {
			setStartTime(moment());
			setEndTime(moment().add(1, 'h'));
		}
	}, [props]);

	useEffect(() => {
		options.forEach((option) => {
			option.label = option.firstName;
			option.value = option._id;
		});
	}, [options]);

	const handleSubmit = async () => {
		props.setIsOpen(false);
		if (props.edit) {
			const res = await axios.put(
				API_BASE_URL + `/scheduleInterview/${props._id}`,
				{
					title: title,
					startTime: startTime,
					endTime: endTime,
					participants: participants,
				}
			);
			if (typeof res.data === 'string' && res.data.includes('preoccupied')) {
				setError(res.data);
				setTimeout(function () {
					setError(null);
				}, 5000);
			} else {
				window.location.reload();
			}
		} else {
			const res = await axios.post(API_BASE_URL + '/scheduleInterview', {
				title: title,
				startTime: startTime,
				endTime: endTime,
				participants: participants,
			});
			if (typeof res.data === 'string' && res.data.includes('preoccupied')) {
				setError(res.data);
				setTimeout(function () {
					setError(null);
				}, 5000);
			} else {
				window.location.reload();
			}
		}
	};

	const handleSelectChange = (selected) => {
		setParticipants(selected);
	};

	return (
		<>
			{error ? (
				<div className="fixed flex text-lg translate-x-1/2 right-1/2 top-5 px-4 py-3 bg-red-100 text-red-600 rounded-md">
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
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
					{error}
				</div>
			) : null}
			<Transition appear show={props.isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto"
					onClose={() => {}}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0" />
						</Transition.Child>

						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-full max-w-2xl p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									Schedule Interview
								</Dialog.Title>
								<div className="mt-2">
									<p className="text-sm text-gray-500">
										Schedule a new interview with the participants.
									</p>
								</div>
								<div className="mt-8 flex text-gray-500 gap-12">
									<div className="w-2/5">
										<h4 className="mb-1 font-medium">Title</h4>
										<input
											className="w-full border-2 bg-white px-3 py-2 rounded-md focus:border-blue-500 outline-none"
											placeholder="Interview Title"
											onChange={(e) => setTitle(e.target.value)}
											value={title}
										/>
									</div>
									<div className="w-2/5">
										<h4 className="mb-1 font-medium">Participants</h4>
										<Select
											closeMenuOnSelect={false}
											isMulti
											value={participants}
											onChange={handleSelectChange}
											options={options}
										/>
									</div>
								</div>
								<div className="mt-8 flex text-gray-500 gap-12">
									<TimePicker.RangePicker
										className="timer border rounded-lg w-2/5 border-blue-900 px-3 py-2"
										format={format}
										onChange={(time) => {
											setStartTime(time[0]);
											setEndTime(time[1]);
										}}
										defaultValue={[startTime, endTime]}
									/>
								</div>
								<div className="mt-8 flex gap-5">
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={() => {
											handleSubmit();
										}}
									>
										Schedule
									</button>
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
										onClick={() => {
											props.setIsOpen(false);
										}}
									>
										Cancel
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default ScheduleInterviewModal;
