import { makeStyles } from '@material-ui/styles';
import theme from '../../../theme';

export const useStyles = makeStyles({
	componentGrid: {
		backgroundColor: '#fff',
		borderRadius: 8,
		alignItems: 'center',
		justifyItems: 'center',
		padding: 15,
		margin: 35,
		[theme.breakpoints.down('xs')]: {
			margin: 10,
		},
	},
	header: {
		marginBottom: 30,
	},
	label: {
		'&:hover': {
			cursor: 'pointer',
		},
	},
	button: {
		marginTop: 20,
		marginBottom: 20,
	},
	appbar: {
		marginBottom: 25,
		borderRadius: 8,
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
	successText: {
		color: '#fff',
	},
	successBox: {
		backgroundColor: '#1cbd77',
		borderRadius: 8,
		marginTop: 20,
		marginBottom: 20,
		marginLeft: 10,
		marginRight: 10,
	},
	checkbox: {
		marginLeft: -15,
	},
	picture: {
		height: 150,
		width: 150,
		marginBottom: 60,
		fontSize: 50,
		border: '2px solid #555',
	},
	uploadButton: {
		marginTop: 10,
		marginBottom: 45,
	},
	verificationText: {
		marginTop: -15,
		marginBottom: 10,
	},
	verificationButton: {
		marginBottom: 20,
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
});
