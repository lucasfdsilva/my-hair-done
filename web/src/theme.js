import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette:{
    primary: {
      light: '#ff867c',
      main: '#ef5350',
      dark: '#b61827',
      contrastText: '#fff',
    },
    secondary: {
      light: '#4b4b4b',
      main: '#232323',
      dark: '#000000',
      contrastText: '#fff',
    },
  },
});

export default theme;