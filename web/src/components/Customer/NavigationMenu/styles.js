import { makeStyles } from '@material-ui/styles';
import theme from '../../../theme';

export const useStyles = makeStyles({
	image: {
		height: 200,
		width: 230,
		marginBottom: -55,
		marginTop: -70,
		marginRight: 25,
	},
	button: {
		color: theme.palette.primary.main,
		fontSize: 20,
		[theme.breakpoints.down('sm')]: {
			fontSize: 14.5,
		},
	},
	icon: {
		color: theme.palette.secondary.main,
		fontSize: 'large',
	},
	toolbar: {
		padding: 10,
	},
});
