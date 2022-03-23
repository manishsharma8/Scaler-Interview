import { useState } from 'react';
import ScheduleInterviewModal from './scheduleInterviewModal';

const CreateButton = () => {
	let [isOpen, setIsOpen] = useState(true);
	return (
		<div>
			<button
				onClick={() => setIsOpen(true)}
				className="float-right flex rounded-md text-gray-600 bg-white p-3 text-base"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 my-auto mr-2 bg-green-200 rounded-full text-green-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					/>
				</svg>
				Schedule New Interview
			</button>
			<ScheduleInterviewModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	);
};

export default CreateButton;
