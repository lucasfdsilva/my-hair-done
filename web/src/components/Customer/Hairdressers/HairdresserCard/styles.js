import { makeStyles } from '@material-ui/styles';
import theme from '../../../../theme';

export const useStyles = makeStyles({
	componentGrid: {
		backgroundColor: '#fff',
		borderRadius: 8,
		alignItems: 'center',
		justifyItems: 'center',
		padding: 25,
		margin: 35,
	},
	header: {
		marginBottom: 30,
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
		marginBottom: 20,
		marginLeft: 10,
		marginRight: 10,
	},
	ratingsTotal: {
		color: '#3793FF',
	},
	ratingsContainer: {
		marginLeft: 0,
		marginBottom: 10,
		[theme.breakpoints.down('md')]: {
			justifyItems: 'center',
			marginTop: -20,
		},
		[theme.breakpoints.only('lg')]: {
			marginTop: -20,
			marginLeft: -20,
		},
		[theme.breakpoints.only('xl')]: {
			marginTop: -35,
		},
	},
	profileImgPicture: {
		border: '2px solid #555',
		height: 75,
		width: 75,
		fontSize: 30,
	},
	buttonsContainer: {
		marginTop: 15,
	},
	divider: {
		marginBottom: 20,
		marginLeft: 0,
		height: 2,
		width: '100%',
		border: '1px solid #FF6257',
	},
	dividerResults: {
		marginBottom: 20,
		marginLeft: 0,
		height: 2,
		width: '100%',
		border: '1px solid #5c5a5a',
	},
	formContainer: {
		marginBottom: 50,
	},
	searchResults: {
		marginBottom: 40,
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	portfolioImg: {
		'&:hover': {
			cursor: 'pointer',
		},
	},
});
