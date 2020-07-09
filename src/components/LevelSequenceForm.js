import { Grid, List, ListItem, Paper, Typography, Divider, LinearProgress, Grow } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import transitions from '@material-ui/core/styles/transitions';

const styles = (theme) => ({
    marginauto: {
        margin: 'auto'
    },
    paper: {
        padding: theme.spacing(2),
        position: 'relative',
        overflow: 'hidden'
    },
    listHeader: {
        textAlign: 'center',
        padding: theme.spacing(1),
        paddingTop: theme.spacing(2)
    },
    listItem: {
        padding: 12
    },
    listItemTypo: {
        fontSize: 14,
        textAlign: 'center',
        width: '100%'
    },
    dndGroup: {
        padding: theme.spacing(1)
    },
    progressBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
    }
})

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

export class LevelSequenceForm extends Component {
    constructor(props) {
        super(props)

        // remove used items from unused lists
        let unusedExercises = Array()
        props.exercisesList.forEach(item => {
            if (props.exercisesSequence.indexOf(item) === -1)
                unusedExercises.push(item)
        })
        let unusedExams = Array()
        props.examsList.forEach(item => {
            if (props.examsSequence.indexOf(item) === -1)
                unusedExams.push(item)
        })

        // remove unexisting items from sequences (when level deletes from collection, sequences doesnt updates)
        let exercisesSeq = Array()
        props.exercisesSequence.forEach(item => {
            if (props.exercisesList.indexOf(item) !== -1)
            exercisesSeq.push(item)
        })
        let examsSeq = Array()
        props.examsSequence.forEach(item => {
            if (props.examsList.indexOf(item) !== -1)
                examsSeq.push(item)
        })

        this.state = {
            exercisesList: unusedExercises,
            examsList: unusedExams,
            exercisesSequence: exercisesSeq,
            examsSequence: examsSeq
        }

        this.setExercisesSeqFunc = props.setExercisesSeqFunc
    }

    onDragEnd = result => {
        const { source, destination } = result

        if (!destination) return

        if (source.droppableId === destination.droppableId) {
            const items = reorder(this.state[source.droppableId], source.index, destination.index)
            let newState = {}
            newState[source.droppableId] = items
            this.setState({
                ...newState
            }, () => { this.setExercisesSeqFunc(this.state.exercisesSequence, this.state.examsSequence) })
        } else {
            const items = move(this.state[source.droppableId], this.state[destination.droppableId], source, destination)
            this.setState({
                ...items
            }, () => { this.setExercisesSeqFunc(this.state.exercisesSequence, this.state.examsSequence) })
        }
    }

    render() {
        const { exercisesList, examsList, exercisesSequence, examsSequence } = this.state
        const { classes } = this.props
        const { seq_indicating } = this.props.UI

        return (
            <Paper className={classes.paper}>
                <Grow in={seq_indicating} >
                <LinearProgress className={ classes.progressBar } />
                </Grow>
                <Grid container spacing={2}>
                    <Grid item sm={6}>
                        <Paper variant='outlined' className={classes.dndGroup}>
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <Grid container spacing={2}>
                                    <Grid item sm={6}>
                                        <Droppable droppableId="exercisesList">
                                            {(provided, snapshot) => (
                                                <Paper elevation={3}>
                                                    <Typography className={classes.listHeader} > Unused exercises </Typography>
                                                    <Divider variant='middle' />
                                                    <List ref={provided.innerRef} >
                                                        {exercisesList.map((item, index) => (
                                                            <Draggable
                                                                key={item}
                                                                draggableId={item}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <ListItem button
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={classes.listItem}
                                                                    >
                                                                        <Typography className={classes.listItemTypo}> {item} </Typography>
                                                                    </ListItem>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </List>
                                                </Paper>
                                            )}
                                        </Droppable>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <Droppable droppableId="exercisesSequence">
                                            {(provided, snapshot) => (
                                                <Paper elevation={3}>
                                                    <Typography className={classes.listHeader} > Exercises sequence </Typography>
                                                    <Divider variant='middle' />
                                                    <List ref={provided.innerRef} >
                                                        {exercisesSequence.map((item, index) => (
                                                            <Draggable
                                                                key={item}
                                                                draggableId={item}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <ListItem button
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={classes.listItem}
                                                                    >
                                                                        <Typography className={classes.listItemTypo}> {item} </Typography>
                                                                    </ListItem>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </List>
                                                </Paper>
                                            )}
                                        </Droppable>
                                    </Grid>
                                </Grid>
                            </DragDropContext>
                        </Paper>
                    </Grid>

                    <Grid item sm={6}>
                        <Paper variant='outlined' className={classes.dndGroup}>
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <Grid container spacing={2}>
                                    <Grid item sm={6}>
                                        <Droppable droppableId="examsList">
                                            {(provided, snapshot) => (
                                                <Paper elevation={3}>
                                                    <Typography className={classes.listHeader} > Unused exams </Typography>
                                                    <Divider variant='middle' />
                                                    <List ref={provided.innerRef} >
                                                        {examsList.map((item, index) => (
                                                            <Draggable
                                                                key={item}
                                                                draggableId={item}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <ListItem button
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={classes.listItem}
                                                                    >
                                                                        <Typography className={classes.listItemTypo}> {item} </Typography>
                                                                    </ListItem>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </List>
                                                </Paper>
                                            )}
                                        </Droppable>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <Droppable droppableId="examsSequence">
                                            {(provided, snapshot) => (
                                                <Paper elevation={3}>
                                                    <Typography className={classes.listHeader} > Exams sequence </Typography>
                                                    <Divider variant='middle' />
                                                    <List ref={provided.innerRef} >
                                                        {examsSequence.map((item, index) => (
                                                            <Draggable
                                                                key={item}
                                                                draggableId={item}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <ListItem button
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={classes.listItem}
                                                                    >
                                                                        <Typography className={classes.listItemTypo}> {item} </Typography>
                                                                    </ListItem>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </List>
                                                </Paper>
                                            )}
                                        </Droppable>
                                    </Grid>
                                </Grid>
                            </DragDropContext>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps)(withStyles(styles)(LevelSequenceForm));
