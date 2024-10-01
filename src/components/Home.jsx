import WindowIcon from '@mui/icons-material/Window';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import styles from './Home.module.css';

function Home() {
	return (
		<div className={styles.mainContainer}>
			<div className="navigation">
				<div className="categories">
					<div className="category">
						<WindowIcon />
						<span className="category-name">Home</span>
					</div>
					<div className="category">
						<CreditCardOutlinedIcon />
						<span className="category-name">Payment</span>
					</div>
					<div className="category">
						<SchoolOutlinedIcon />
						<span className="category-name">Education</span>
					</div>
					<div className="category">
						<CreditCardOutlinedIcon />
						<span className="category-name">Payment</span>
					</div>
					<div className="category">
						<CreditCardOutlinedIcon />
						<span className="category-name">Payment</span>
					</div>
				</div>
				<div className="settings-area"></div>
			</div>
		</div>
	);
}

export default Home;
