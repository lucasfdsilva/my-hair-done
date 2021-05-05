import { makeStyles } from '@material-ui/styles';
import theme from '../../../../theme';

export const useStyles = makeStyles({
	componentGridNewPost: {
		backgroundColor: '#fff',
		borderRadius: 8,
		alignItems: 'center',
		justifyItems: 'center',
		padding: 25,
		maxHeight: 600,
		maxWidth: 500,
	},
	componentGridEditPost: {
		backgroundColor: '#fff',
		borderRadius: 8,
		alignItems: 'center',
		justifyItems: 'center',
		padding: 25,
		maxHeight: 1000,
		maxWidth: 500,
		overflowY: 'scroll',

		[theme.breakpoints.down('xs')]: {
			maxHeight: 700,
			maxWidth: 350,
		},
	},
	header: {
		marginBottom: 30,
	},
	label: {
		display: 'flex',
		alignItems: 'center',
		fontSize: 17,
		'&:hover': {
			cursor: 'pointer',
			opacity: 0.5,
		},
	},
	icon: {
		marginRight: 10,
	},
	fileInput: {
		display: 'none',
	},
	button: {
		marginTop: 30,
		marginBottom: 15,
	},
	imagesIndex: {
		marginTop: 14,
	},
	modalImageContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalImage: {
		maxHeight: 500,
		maxWidth: 600,
	},
});
