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
		marginTop: 30,
		marginBottom: 20,
	},
	forgotPasswordLink: {
		marginTop: 10,
	},
	registerLink: {
		marginTop: -10,
		marginBottom: 60,
	},
	button: {
		marginTop: 35,
		marginBottom: 15,
	},
	errorText: {
		color: '#fff',
	},
	errorBox: {
		backgroundColor: '#ff867c',
		borderRadius: 8,
		marginTop: 20,
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10,
	},
});
