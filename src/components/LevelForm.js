import { Button, Divider, FormControlLabel, FormGroup, Grid, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, Switch, TextField, Typography } from '@material-ui/core';
import { AddCircle, Delete, Publish } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import TaskEdit from './../components/TaskEdit';


const styles = (theme) => ({
    marginauto: {
        margin: 'auto'
    },
    setLevelButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 2
    },
    levelNameEdit: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(3)
    },
    paper: {
        padding: theme.spacing(2),
        position: 'relative'
    },
    tasksList: {
        paddingTop: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    levelsDivider: {
        marginTop: theme.spacing(2),
    }
})


export class LevelForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            level: props.level,
            levelName: props.levelName
        }
    }

    render() {
        const { level, levelName } = this.state;
        const { classes, updateLevelFunc, renameLevelFunc } = this.props;

        return (
            <Paper className={classes.paper}>
                <Paper className={classes.levelNameEdit}>
                    <Grid container alignItems='center' spacing={3}>
                        <Grid item sm={9}>
                            <TextField variant="filled" label='Name' style={{ width: '100%' }} 
                            value={levelName} 
                            onChange={ (ev) => { this.setState({ levelName: ev.target.value }) }}
                            />
                        </Grid>
                        <Grid item sm={3} align='center'>
                            <Button variant='outlined' size='large' onClick={() => renameLevelFunc(levelName)}> Rename </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Grid container spacing={2}>
                    <Grid item sm={3}>
                        <IconButton onClick={() => updateLevelFunc(level)} className={classes.setLevelButton} > <Publish /> </IconButton>
                        <FormGroup row >
                            <FormControlLabel
                                control={<Switch checked={level.isExam} onChange={(ev) => { level.isExam = ev.target.checked; this.setState({ level: level }) }} />}
                                label="isExam"
                                labelPlacement='bottom'
                                className={classes.marginauto}
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
                <Grid container spacing={3} >
                    <Grid item sm={3}>
                        <Paper variant='elevation' elevation={3} className={classes.tasksList} >
                            <Typography align='center'>Tasks:</Typography>
                            <List>
                                {level.tasks.map((task, ind) => (
                                    <ListItem button key={ind} selected={this.state.selectedTaskInd === ind} onClick={() => this.setState({ selectedTaskInd: ind })} >
                                        <ListItemText fontSize='small' align='center'> {task.type} </ListItemText>
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                fontSize='small' edge='end'
                                                onClick={() => { level.tasks.splice(ind, 1); this.setState({ level: level, selectedTaskInd: null }) }} >
                                                <Delete />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                                <Divider light variant='middle' className={classes.levelsDivider} />
                                <ListItem button onClick={() => { level.tasks.push({ type: 'None', count: 1 }); this.setState({ level: level }) }}>
                                    <ListItemIcon >
                                        <AddCircle fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText> Add task </ListItemText>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item sm={9} >
                        <Paper elevation={3} className={classes.tasksList}>
                            {this.state.selectedTaskInd != null ? (
                                <TaskEdit
                                    task={level.tasks[this.state.selectedTaskInd]}
                                    updateList={() => this.setState({ level: level })}
                                    key={this.state.selectedTaskInd} />
                            ) : null}
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(LevelForm);
