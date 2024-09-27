import Expenses from './expenses/expenses';
import styles from './Home.module.css';

const Home = () => {
	return (
		<div className={styles.mainContainer}>
			<div className={styles.sidebar}></div>
			<div className={styles.mainContents}>
				<Expenses />
			</div>
		</div>
	);
};

export default Home;
