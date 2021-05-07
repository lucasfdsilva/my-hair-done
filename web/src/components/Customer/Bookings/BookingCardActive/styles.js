import { makeStyles } from '@material-ui/styles';
import theme from '../../../../theme';

export const useStyles = makeStyles({
	profileImgPicture: {
		border: '2px solid #555',
		height: 100,
		width: 100,
		fontSize: 30,
	},
	buttonContainer: {
		marginRight: 30,
		marginTop: -150,
		[theme.breakpoints.down('xs')]: {
			marginRight: 80,
			marginTop: 0,
			marginBottom: 30,
		},
	},
});
