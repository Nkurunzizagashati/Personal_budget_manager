import WindowIcon from '@mui/icons-material/Window';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import styles from './Home.module.css';

function Home() {
	return (
		<div className={styles.mainContainer}>
			<div className={styles.sideBar}>
				<ul className={styles.sideBarCategories}>
					<li className={styles.category}>
						<WindowIcon />
						<span className={styles.categoryName}>
							Home
						</span>
					</li>
					<li className={styles.category}>
						<CreditCardOutlinedIcon />
						<span className={styles.categoryName}>
							Payment
						</span>
					</li>
					<li className={styles.category}>
						<CreditCardOutlinedIcon />
						<span className={styles.categoryName}>
							Payment
						</span>
					</li>
					<li className={styles.category}>
						<CreditCardOutlinedIcon />
						<span className={styles.categoryName}>
							Payment
						</span>
					</li>
				</ul>
			</div>
			<div className={styles.navigation}>
				<ul className={styles.categories}>
					<li className={styles.category}>
						<WindowIcon />
						<span className={styles.categoryName}>
							Home
						</span>
					</li>
					<li className={styles.category}>
						<CreditCardOutlinedIcon />
						<span className={styles.categoryName}>
							Payment
						</span>
					</li>
					<li className={styles.category}>
						<SchoolOutlinedIcon />
						<span className={styles.categoryName}>
							Education
						</span>
					</li>
					<li className={styles.category}>
						<CreditCardOutlinedIcon />
						<span className={styles.categoryName}>
							Payment
						</span>
					</li>
					<li className={styles.category}>
						<CreditCardOutlinedIcon />
						<span className={styles.categoryName}>
							Payment
						</span>
					</li>
				</ul>
				<ul className={styles.settingsContainer}>
					<li className={styles.setting}>
						<Person3OutlinedIcon />
					</li>
					<li className={styles.setting}>
						<NotificationsActiveOutlinedIcon />
					</li>
					<li className={styles.setting}>
						<WbSunnyOutlinedIcon />
					</li>
					<li className={styles.setting}>
						<LogoutOutlinedIcon />
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Home;
