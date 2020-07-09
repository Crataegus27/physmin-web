import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles/';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './redux/store'
import theme from './utils/theme';

import home from './pages/home';
import { CssBaseline, Grid } from '@material-ui/core';

import { baseURI } from "./config";

axios.defaults.baseURL = baseURI;

const styles = (theme) => ({
  mainContainer: {
    marginTop: 80,
  }
});

const App = (props) => {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <Button>hi</Button>
          </Toolbar>
        </AppBar>
        <Grid container justify='center' className={classes.mainContainer}>
          <Router>
            <Switch>
              <Route path="/" component={home} />
            </Switch>
          </Router>
          </Grid>
      </Provider>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(App);
