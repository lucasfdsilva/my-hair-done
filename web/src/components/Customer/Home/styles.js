import { makeStyles } from '@material-ui/styles';
import theme from '../../../theme';

export const useStyles = makeStyles({
	header: {
		color: '#fff',
	},
	epicContainer: {
		backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1488282687151-c5e6582e7cf1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		alignItems: 'center',
		justifyItems: 'center',
		minHeight: 500,
	},
	faceRecognitionOuterContainer: {
		backgroundColor: '#fff',
		padding: 40,
		maxHeight: 420,
		[theme.breakpoints.down('sm')]: {
			maxHeight: 800,
			padding: 70,
		},
	},
	faceRecognitionInnerContainer: {
		backgroundColor: '#fff',
		borderRadius: 8,
		boxShadow: '4px 6px 20px -6px rgba(0,0,0,0.75)',
		padding: 20,
		maxHeight: 350,
		[theme.breakpoints.down('sm')]: {
			maxHeight: 725,
		},
	},
	faceRecognitionTextContainer: {
		marginLeft: 175,
		[theme.breakpoints.down('md')]: {
			marginLeft: 0,
		},
	},
	faceRecognitionImage: {
		height: 300,
	},
	featuredHairdressersContainer: {
		backgroundColor: '#fff',
		padding: 70,
		marginTop: -20,
	},
	button: {
		marginTop: 60,
		marginLeft: 175,
		[theme.breakpoints.down('md')]: {
			marginLeft: 0,
			marginTop: 40,
			marginBottom: 30,
		},
	},
	divider: {
		marginBottom: 20,
		marginLeft: 0,
		height: 2,
		width: '100%',
		border: '1px solid #FF6257',
	},
	forUsersOuterContainer: {
		padding: 40,
	},
	forUsersContainer: {
		borderRadius: 8,
		marginTop: 15,
		padding: 40,
		marginBottom: 50,
		backgroundColor: 'rgba(255,255,255, 0.7)',
	},
	textContainer: {
		borderRadius: 8,
	},
	title: {
		color: '#1E283C',
		fontWeight: 'bold',
	},
	forUsersImage: {
		borderRadius: 8,
		[theme.breakpoints.down('xs')]: {
			height: 230,
		},
	},
});
