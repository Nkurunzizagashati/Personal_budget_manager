import { BrowserRouter, useRoutes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Expenses from './components/expenses/expenses';
import Income from './components/income/income';

const RoutesComponent = () => {
	const routes = [
		{
			path: '',
			element: <Home />,
			children: [
				{
					index: true,
					path: 'dashboard',
					element: <Dashboard />,
				},
				{
					path: 'expenses',
					element: <Expenses />,
				},
				{
					path: 'incomes',
					element: <Income />,
				},
			],
		},
	];

	return useRoutes(routes);
};

const App = () => {
	return (
		<BrowserRouter>
			<RoutesComponent />
		</BrowserRouter>
	);
};

export default App;
