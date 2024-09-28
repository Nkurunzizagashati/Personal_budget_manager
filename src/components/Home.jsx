import { IoMdPerson } from 'react-icons/io';
import { RxDashboard } from 'react-icons/rx';
import { FaArrowUpRightDots } from 'react-icons/fa6';
import { GiExpense } from 'react-icons/gi';
import { TbLogout } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import styles from './Home.module.css';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
	const selectedGoal = useSelector(
		(state) => state.goals.selectedGoalPercentage
	);
	const expenses = useSelector((state) => state.expenses.expenses);
	const income = useSelector((state) => state.income.income);

	// Calculate total income and expenses
	const totalIncome = income.reduce(
		(total, item) => total + item.amount,
		0
	);
	const totalExpenses = expenses.reduce(
		(total, item) => total + item.amount,
		0
	);

	// Calculate the percentage of income used
	const incomeUsedPercentage = (
		(totalExpenses / totalIncome) *
		100
	).toFixed(2);

	// Calculate progress towards the goal
	const goalProgress = (incomeUsedPercentage / selectedGoal) * 100;
	let goalProgressBackground = 'green'; // Default color

	// Handle progress background color
	if (goalProgress <= 30) {
		goalProgressBackground = 'green';
	} else if (goalProgress > 30 && goalProgress <= 50) {
		goalProgressBackground = 'blue';
	} else if (goalProgress > 50 && goalProgress <= 70) {
		goalProgressBackground = 'yellow';
	} else if (goalProgress > 70 && goalProgress <= 100) {
		goalProgressBackground = 'red';
	}

	return (
		<div className={styles.mainContainer}>
			<div className={styles.sidebar}>
				<div className={styles.profileContainer}>
					<IoMdPerson size={80} />
					<div className={styles.creditCard}>
						<h2>John</h2>
						<p>Balance: $300</p>
					</div>
				</div>

				<div
					className={styles.goalProgressDisplay}
					style={{ backgroundColor: goalProgressBackground }}
				>
					<p>Used {incomeUsedPercentage}% of the income</p>
				</div>

				<ul className={styles.menuItems}>
					<li>
						<NavLink
							to="/dashboard"
							className={({ isActive }) =>
								`${styles.menuItem} ${
									isActive ? styles.activeLink : ''
								}`
							}
						>
							<RxDashboard size={28} />
							<span>Dashboard</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/incomes"
							className={({ isActive }) =>
								`${styles.menuItem} ${
									isActive ? styles.activeLink : ''
								}`
							}
						>
							<FaArrowUpRightDots size={28} />
							<span>Income</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/expenses"
							className={({ isActive }) =>
								`${styles.menuItem} ${
									isActive ? styles.activeLink : ''
								}`
							}
						>
							<GiExpense size={28} />
							<span>Expenses</span>
						</NavLink>
					</li>
				</ul>

				<div className={styles.logoutBtn}>
					<TbLogout size={40} />
					<span>Logout</span>
				</div>
			</div>

			<div className={styles.mainContents}>
				<Outlet />
			</div>
		</div>
	);
};

export default Home;
