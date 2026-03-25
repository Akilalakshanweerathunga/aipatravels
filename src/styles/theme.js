import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { poppins, roboto } from './fonts';
import { fivoSans } from './fonts';

const theme = createTheme({
  typography: {
    fontFamily: roboto.fontFamily,
    h1: { fontFamily: poppins.fontFamily, fontWeight: 700 },
    h2: { fontFamily: poppins.fontFamily, fontWeight: 600 },
    h3: { fontFamily: poppins.fontFamily, fontWeight: 500 },
    h4: { fontFamily: poppins.fontFamily, fontWeight: 700 },
    h5: { fontFamily: fivoSans.fontFamily, fontWeight: 600 },
    h6: { fontFamily: fivoSans.fontFamily, fontWeight: 500 },
    button: { fontFamily: roboto.fontFamily, textTransform: 'uppercase' },
    body1: { fontFamily: fivoSans.fontFamily },
    body2: { fontFamily: fivoSans.fontFamily },
    subtitle1: { fontFamily: fivoSans.fontFamily },
    subtitle2: { fontFamily: fivoSans.fontFamily },
  },
  palette: {
    primary: { main: '#657b43' },
    secondary: { main: '#c7a96a' },
    error: { main: red.A400 },
    background: { default: '#F5F5F5' },
  },
});

export default theme;
