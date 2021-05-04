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
	appbar: {
		borderRadius: 8,
		marginBottom: 30,
	},
	content: {
		padding: 15,
	},
});
