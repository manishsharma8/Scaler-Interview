import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

const ScheduleInterviewModal = ({ isOpen, setIsOpen }) => {
	const format = 'HH:mm';
	const [title, setTitle] = useState('');
	const [startTime, setStartTime] = useState(moment());
	const [endTime, setEndTime] = useState(moment().add(1, 'h'));

	const handleSubmit = () => {
		setIsOpen(false);
		// console.log('start time: ', startTime);
		// console.log('end time: ', endTime);
		// console.log('title', title);
	};

	return (
		<form>
			<Transition appear show={isOpen} as={Fragment}>
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
							<div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
											className="w-full border-2 bg-gray-100 px-3 py-2 rounded-md focus:border-blue-500 outline-none"
											placeholder="Interview Title"
											onChange={(e) => setTitle(e.target.value)}
											value={title}
										/>
									</div>
									<div className="w-2/5">
										<h4 className="mb-1 font-medium">Participants</h4>
										<input
											className="w-full border-2 bg-gray-100 px-3 py-2 rounded-md focus:border-blue-500 outline-none"
											placeholder="Participants"
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
										value={[startTime, endTime]}
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
										onClick={() => setIsOpen(false)}
									>
										Cancel
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</form>
	);
};

export default ScheduleInterviewModal;
