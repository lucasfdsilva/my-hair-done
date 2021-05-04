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
	checkbox: {
		marginLeft: -15,
	},
});
