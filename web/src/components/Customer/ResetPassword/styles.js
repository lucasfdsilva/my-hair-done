import { makeStyles } from '@material-ui/styles';
import theme from '../../../theme';

export const useStyles = makeStyles({
	componentGrid: {
		backgroundColor: '#fff',
		borderRadius: 8,
		alignItems: 'center',
		justifyItems: 'center',
		margin: 35,
		[theme.breakpoints.down('xs')]: {
			margin: 10,
		},
	},
	header: {
		marginTop: 45,
		marginBottom: 20,
	},
	button: {
		marginTop: 35,
		marginBottom: 75,
	},
	errorText: {
		color: '#fff',
	},
	errorBox: {
		backgroundColor: '#ff867c',
		borderRadius: 8,
		marginTop: 40,
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10,
	},
	successText: {
		color: '#fff',
	},
	successBox: {
		backgroundColor: '#1cbd77',
		borderRadius: 8,
		marginTop: 40,
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10,
	},
});
