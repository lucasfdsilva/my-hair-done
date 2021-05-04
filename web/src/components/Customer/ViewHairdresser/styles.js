import { makeStyles } from '@material-ui/styles';
import theme from '../../../theme';

export const useStyles = makeStyles({
	componentGrid: {
		backgroundColor: '#fff',
		borderRadius: 8,
		alignItems: 'center',
		justifyItems: 'center',
		padding: 25,
		margin: 35,
	},
	hairdresserInfo: {
		marginBottom: 40,
	},
	header: {
		fontSize: 30,
	},
	button: {
		marginTop: 20,
		marginBottom: 15,
	},
	errorText: {
		color: '#fff',
	},
	errorBox: {
		backgroundColor: '#ff867c',
		borderRadius: 8,
		marginTop: 20,
		marginBottom: 20,
		marginLeft: 10,
		marginRight: 10,
	},
	ratingsTotal: {
		color: '#3793FF',
	},
	ratingsContainer: {
		marginTop: -95,
		marginLeft: 200,
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
			marginTop: -5,
			marginBottom: 5,
			marginLeft: 0,
		},
	},
	bookButtonContainer: {
		marginTop: -120,
		marginLeft: 530,
		marginBottom: 200,
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
			marginTop: 0,
			marginLeft: 0,
			marginBottom: 60,
		},
		[theme.breakpoints.only('sm')]: {
			marginLeft: 200,
			marginTop: 0,
			marginBottom: 50,
		},
	},
	profileImgPicture: {
		border: '2px solid #555',
		height: 175,
		width: 175,
		fontSize: 30,
	},
	buttonsContainer: {
		marginTop: 15,
	},
	divider: {
		marginBottom: 20,
		marginLeft: 0,
		height: 2,
		width: '100%',
		border: '1px solid #FF6257',
	},
	dividerResults: {
		marginBottom: 20,
		marginLeft: 0,
		height: 2,
		width: '100%',
		border: '1px solid #5c5a5a',
	},
	formContainer: {
		marginBottom: 50,
	},
	searchResults: {
		marginBottom: 40,
	},
	title: {
		marginTop: -50,
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	reviewTitle: {
		marginTop: 75,
	},
});
