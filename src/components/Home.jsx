import styles from './Home.module.css';

function Home() {
	return (
		<div className={styles.mainContainer}>
			<div className="navigation">
				<div className="categories">
					<div className="category">
						<span className="category-name">Home</span>
					</div>
				</div>
				<div className="settings-area"></div>
			</div>
		</div>
	);
}

export default Home;
