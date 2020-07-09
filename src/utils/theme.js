import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { purple, deepPurple, grey, green } from '@material-ui/core/colors';

const themeObj = {
  palette: {
    primary: deepPurple,
    secondary: purple,
    type: 'light',
  },
  
  overrides: {
    MuiSlider: {
      thumb: {
        color: deepPurple['A100']
      },
      track: {
        color: deepPurple['A100']
      },
      rail: {
        color: deepPurple['A100']
      }
    },
    MuiInputLabel: {
      formControl:{
        '&.Mui-focused': {
          color: deepPurple['A100']
        }
      }
    }
  }
}

const theme = createMuiTheme(themeObj);

export default theme;