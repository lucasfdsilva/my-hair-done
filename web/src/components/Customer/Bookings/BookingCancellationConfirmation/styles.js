import { makeStyles } from '@material-ui/styles';
import theme from '../../../../theme';

export const useStyles = makeStyles({
	items: {
		justifyContent: 'center',
		justifyItems: 'center',
		alignItems: 'center',
		alignContent: 'center',
	},
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
});
