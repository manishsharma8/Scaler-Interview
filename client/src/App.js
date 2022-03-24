import CreateButton from './components/createButton';
import InterviewList from './components/interviewsList';

const App = () => {
	return (
		<div className="mx-48 mt-16">
			<div className="flex justify-between">
				<div className="text-3xl text-gray-800 font-bold">Interview Portal</div>
				<CreateButton />
			</div>
			<div className="mt-10">
				<InterviewList />
			</div>
		</div>
	);
};

export default App;
