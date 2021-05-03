import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
	componentGrid: {
		backgroundColor: '#fff',
		borderRadius: 8,
		alignItems: 'center',
		justifyItems: 'center',
		marginBottom: 50,
	},
	list: {
		borderRadius: 10,
		border: '2px solid #EF5350',
	},
	title: {
		marginBottom: 30,
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 30,
	},
});
