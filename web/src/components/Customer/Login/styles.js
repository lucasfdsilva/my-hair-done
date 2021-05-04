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
		marginTop: 30,
		marginBottom: 20,
	},
	registerLink: {
		marginBottom: 30,
		marginLeft: -20,
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
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10,
	},
});
