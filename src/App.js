import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import bone from './images/bone.png';
import busy from './images/busypug.png';
import hungry from './images/hungrypug.jpg';
import seagull from './images/seagull.png';

const EASY_SPINNER = [bone, bone, bone, hungry];
const NORMAL_SPINNER = [bone, bone, bone, hungry, seagull, busy];
const HARD_SPINNER = [bone, bone, bone, seagull, busy];

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  spinBar: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  spinner: {
    padding: theme.spacing.unit * 3,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  spinnerResult: {
    height: 300,
    width: 300
  },
  spinButton: {
    margin: theme.spacing.unit * 2
  },
  number: {
    fontSize: 300,
    marginLeft: 20
  }
});

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      spinResult: EASY_SPINNER[0],
      number: 1,
      isSpinning: false
    };

    this.onSpin = this.onSpin.bind(this);
  }
  
  onSpin(spinner){
    this.setState({isSpinning: true});
    const result = spinner[Math.floor(Math.random() * spinner.length)];
    let number;
    if (result !== busy)
      number = Math.floor(Math.random() * 5 + 1)
    setTimeout(() => {
      this.setState({isSpinning: false});
    }, 500);
    this.setState({spinResult: result, number: number});
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <div className={classes.spinBar}>
              <SpinButton className={classes.spinButton} onClick={() => this.onSpin(EASY_SPINNER)}>Easy Spin</SpinButton>
              <SpinButton className={classes.spinButton} onClick={() => this.onSpin(NORMAL_SPINNER)}>Normal Spin</SpinButton>
              <SpinButton className={classes.spinButton} onClick={() => this.onSpin(HARD_SPINNER)}>Hard Spin</SpinButton>
            </div>
            <Paper className={classes.spinner} elevation={0}>
              {this.state.isSpinning &&
                <LinearProgress />}
              {!this.state.isSpinning &&
                <div>
                  <img src={this.state.spinResult} className={classes.spinnerResult} />
                  <span className={classes.number}>{this.state.number}</span>
                </div>}
            </Paper>
        </Grid>
      </Grid>
    </div>
    );
  }
}

const SpinButton = ({onClick, className, children}) =>
  <Button
    variant="contained"
    color="primary"
    size="large"
    className={className}
    onClick={onClick}
    type='button'>{children}</Button>

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
