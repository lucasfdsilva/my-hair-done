import { makeStyles } from '@material-ui/styles';
import theme from '../../../../theme';

export const useStyles = makeStyles({
	listItem: { padding: 5 },
	weekDays: {
		marginLeft: 30,
	},
	title: {
		marginTop: -40,
	},
	date: {
		marginTop: 45,
		marginLeft: 30,
	},
	buttons: {
		marginTop: 40,
		marginLeft: 50,
	},
	profileImgPicture: {
		border: '2px solid #555',
		height: 100,
		width: 100,
		fontSize: 30,
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
});
