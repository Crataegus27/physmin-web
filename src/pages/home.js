import { Backdrop, CircularProgress, Container, Divider, IconButton, Link, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem, Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { AddCircle, Delete, FileCopy } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import LevelForm from './../components/LevelForm';
import LevelSequenceForm from './../components/LevelSequenceForm';
import { addLevel, deleteLevel, getLevel, getLevels, getLevelsSequences, renameLevel, setLevel, setLevelsSequences } from './../redux/actions/mainActions';

const styles = (theme) => ({
    marginauto: {
        margin: 'auto'
    },
    BreadCrumbs: {
        display: "flex",
        '& li': {
            width: "auto",
            marginRight: 10,
            textDecoration: "none"
        },
    },
    containerRoot: {
        paddingTop: 10,
        paddingBottom: 10
    },
    paper: {
        padding: theme.spacing(2),
        position: 'relative'
    },
    paper2: {
        padding: theme.spacing(1, 2),
        marginTop: theme.spacing(4),
        position: 'relative'
    },
    paperTop: {
        padding: `0 ${theme.spacing(2)}px`
    },
    typo: {
        lineHeight: 2,
        textAlign: 'right'
    },
    levelsDivider: {
        marginTop: theme.spacing(2),
    },
    listButton: {
        marginTop: theme.spacing(2)
    },
    listButtonSeparate: {
        marginTop: theme.spacing(2 + 4),
        position: 'absolute'
    },
    levelsScrollbar: {
        maxHeight: 400
    },
    keyvalAddDiv: {
        lineHeight: 2.5,
        textAlign: 'center'
    },
    changeTypeButton: {
        minWidth: 36
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

class home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            selectedTopic: "Concepts",
            open: false,
            sequenceFormOpened: false
        };
    }

    componentDidMount() {
        this.props.getLevels('Concepts');
    }

    menuClick = (event) => {
        event.preventDefault();

        this.setState({
            anchorEl: event.currentTarget
        });
    }
    menuClose = (event) => {
        this.setState({
            anchorEl: null
        });
    }

    loadLevels = (topic) => {
        this.menuClose();
        this.setState({
            selectedTopic: topic,
            selectedLevel: null,
            selectedIndex: null,
            selectedTaskInd: null
        });
        this.props.getLevels(topic);
    }
    levelClick = (level, ind) => {
        this.setState({
            selectedLevel: this.state.selectedLevel != level ? level : null,
            sequenceFormOpened: false,
            selectedTaskInd: null
        }, () => {
            if (Boolean(this.state.selectedLevel))
                this.props.getLevel(this.state.selectedTopic, level);
        });
    }
    addLevelClick = () => {
        this.props.addLevel(this.state.selectedTopic);
    }
    duplicateLevelClick = () => {
        this.props.addLevel(this.state.selectedTopic, this.props.main.level);
    }
    setLevelClick = (data) => {
        this.props.setLevel(this.state.selectedTopic, this.state.selectedLevel, data);
    }
    deleteLevelClick = (level) => {
        this.props.deleteLevel(this.state.selectedTopic, level);
        this.loadLevels(this.state.selectedTopic);
    }
    renameLevel = (newName) => {
        this.props.renameLevel(this.state.selectedTopic, this.state.selectedLevel, newName).then(() => {
            this.setState({
                selectedLevel: newName
            })
        })
    }
    openLevelSequenceManager = () => {
        if (!this.state.sequenceFormOpened)
            this.props.getLevelsSequences(this.state.selectedTopic).then(() => {
                this.setState({
                    sequenceFormOpened: true,
                    selectedLevel: null
                })
            })
        else
            this.setState({
                sequenceFormOpened: false
            })
    }
    setLevelsSequences = (exercisesSeq, examSeq) => {
        this.props.setLevelsSequences(this.state.selectedTopic, exercisesSeq, examSeq)
    }

    render() {
        const { classes } = this.props;
        const { levels, level, levelName } = this.props.main;
        const { level_loading, levels_loading } = this.props.UI;
        const { exercisesList, examsList, exercisesSequence, examsSequence } = this.props.main;
        const { sequenceFormOpened, selectedLevel } = this.state;

        let levelsMarkup = !levels_loading ? (
            levels.map((level, ind) => (
                <ListItem button key={level} selected={selectedLevel === level} onClick={() => { this.levelClick(level, ind) }} >
                    <ListItemText fontSize='small'>
                        {level}
                    </ListItemText>
                    <ListItemSecondaryAction> <IconButton fontSize='small' edge='end' onClick={() => this.deleteLevelClick(level)} > <Delete /> </IconButton> </ListItemSecondaryAction>
                </ListItem>
            ))
        ) : <Typography align='center'>Loading...</Typography>
        if (levels.length === 0 && !levels_loading)
            levelsMarkup = <Typography align='center'>Empty</Typography>;

        const open = levels_loading || level_loading

        return (
            <Container className={classes.containerRoot}>
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                {/* nav */}
                <Grid container spacing={6}>
                    <Grid item sm={12}>
                        <Paper className={classes.paperTop}>
                            <List className={classes.BreadCrumbs}>
                                <ListItem className={classes.BreadCrubmsItems} disableGutters={true}> Mechanics </ListItem>
                                <ListItem className={classes.BreadCrubmsItems} disableGutters={true}> / </ListItem>
                                <ListItem className={classes.BreadCrubmsItems} disableGutters={true}> Kinematics </ListItem>
                                <ListItem className={classes.BreadCrubmsItems} disableGutters={true}> / </ListItem>
                                <ListItem className={classes.BreadCrubmsItems} disableGutters={true}> ProgressiveMovement </ListItem>
                                <ListItem className={classes.BreadCrubmsItems} disableGutters={true}> / </ListItem>
                                <ListItem className={classes.BreadCrubmsItems} disableGutters={true}>
                                    <Link href='#' color='inherit' onClick={this.menuClick}>
                                        {this.state.selectedTopic}
                                    </Link>
                                </ListItem>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.menuClose}>
                                    <MenuItem onClick={() => { this.loadLevels("Concepts") }}>Concepts</MenuItem>
                                    <MenuItem onClick={() => { this.loadLevels("Graphs") }}>Graphs</MenuItem>
                                </Menu>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    {/* levels list */}
                    <Grid item sm={3}>
                        <Paper className={classes.paper}>
                            <List>
                                <Scrollbars autoHeight autoHeightMax={350}>
                                    {levelsMarkup}
                                </Scrollbars>
                                <Divider light variant='middle' className={classes.levelsDivider} />
                                <Paper variant='outlined' className={classes.listButton}>
                                    <ListItem button onClick={this.addLevelClick}>
                                        <ListItemIcon >
                                            <AddCircle fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText> Add level</ListItemText>
                                    </ListItem>
                                </Paper>
                                <Paper variant='outlined' className={classes.listButton}>
                                    <ListItem button onClick={this.duplicateLevelClick} disabled={!Boolean(this.state.selectedLevel)}>
                                        <ListItemIcon >
                                            <FileCopy fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText> Duplicate level</ListItemText>
                                    </ListItem>
                                </Paper>
                            </List>
                        </Paper>

                        <Paper className={classes.paper2} >
                            <List>
                                <Paper variant='outlined'>
                                    <ListItem button onClick={this.openLevelSequenceManager}>
                                        <ListItemText> Level sequence managment </ListItemText>
                                    </ListItem>
                                </Paper>
                            </List>
                        </Paper>
                    </Grid>
                    {/* level form */}
                    <Grid item sm>
                        {level_loading ? (<Typography>Loading...</Typography>) :
                            Boolean(selectedLevel) && Boolean(levelName) && Boolean(level.tasks) ? (
                                <LevelForm level={level} levelName={levelName} key={levelName}
                                    updateLevelFunc={this.setLevelClick} renameLevelFunc={this.renameLevel}
                                />
                            ) : Boolean(sequenceFormOpened) ? (
                                <LevelSequenceForm
                                    exercisesList={exercisesList}
                                    examsList={examsList}
                                    exercisesSequence={exercisesSequence}
                                    examsSequence={examsSequence}
                                    setExercisesSeqFunc={this.setLevelsSequences}
                                />
                            ) : null}
                    </Grid>
                </Grid>


            </Container >
        )
    }
}



const mapStateToProps = (state) => ({
    main: state.main,
    UI: state.UI
});

const mapActionsToProps = { getLevels, getLevel, addLevel, setLevel, deleteLevel, renameLevel, getLevelsSequences, setLevelsSequences };

home.propTypes = {
    getLevels: PropTypes.func.isRequired,
    getLevel: PropTypes.func.isRequired,
    deleteLevel: PropTypes.func.isRequired,
    setLevel: PropTypes.func.isRequired,
    addLevel: PropTypes.func.isRequired,
    getLevelsSequences: PropTypes.func.isRequired,
    setLevelsSequences: PropTypes.func.isRequired,
    renameLevel: PropTypes.func.isRequired,
    main: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(home));