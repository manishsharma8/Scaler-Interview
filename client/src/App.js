import { useState } from 'react';
import CreateButton from './components/createButton';
import InterviewList from './components/interviewsList';

const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="mx-48 mt-16">
			<div className="flex justify-between">
				<div className="text-3xl text-gray-800 font-bold">Interview Portal</div>
				<CreateButton />
			</div>
			<div className="mt-10">
				<InterviewList isOpen={isOpen} setIsOpen={setIsOpen} />
			</div>
		</div>
	);
};

export default App;
