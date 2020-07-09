import { Chip, Divider, FormControl, Grid, MenuItem, Select, Slider, Switch, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { G2GConfig, S2GConfig, RSConfig } from './../utils/config'

const styles = (theme) => ({
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4)
    }
})


const axes = ["x", "v", "a"]
const taskTypes = ["G2G", "S2G", "RS"]
const typeToTaskObj = { "G2G": G2GConfig, "S2G": S2GConfig, "RS": RSConfig }
const MenuProps = {
    PaperProps: {
        style: {
            marginTop: -60
        },
    },
};

class TaskEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: props.task
        };
    }

    getTemplateFor = (type) => {
        if (type === this.state.task.type)
            return this.state.task

        const task = this.state.task
        task.type = type
        const configTask = typeToTaskObj[type]
        task.taskConfig = Object.assign({}, configTask.taskConfig)

        return this.state.task
    }

    render() {
        const { classes } = this.props
        const { task } = this.state

        return (
            <div>
                <Grid container spacing={4} alignItems='center'>
                    <Grid item sm={1} />
                    <Grid item sm={4}>
                        <FormControl variant='outlined'>
                            <Typography variant='caption'>Task type</Typography>
                            <Select
                                value={task.type}
                                onChange={(ev) => { this.setState({ task: this.getTemplateFor(ev.target.value) }, this.props.updateList) }}>
                                {taskTypes.map(name => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={4}>
                        <Typography variant='caption' >Task count</Typography>
                        <Slider
                            defaultValue={task.count}
                            onChangeCommitted={(ev, val) => { task.count = val; }}
                            step={1}
                            min={1}
                            max={10}
                            valueLabelDisplay="auto"
                            marks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => ({ value: val, label: val }))}
                        />
                    </Grid>
                </Grid>
                <Divider light variant='middle' className={classes.divider} />
                {task.type == 'G2G' ? (
                    <div>
                        <Grid container spacing={4} alignItems='center'>
                            <Grid item sm={1}></Grid>
                            <Grid item sm={4}>
                                <Typography variant='caption'>Questions axes</Typography>
                                <br />
                                <Select
                                    multiple
                                    value={task.taskConfig.questionAxes}
                                    onChange={(ev) => { task.taskConfig.questionAxes = ev.target.value; this.setState({ task: task }) }}
                                    MenuProps={MenuProps}
                                    renderValue={selected => (
                                        <div>
                                            {selected.map(value => (
                                                <Chip key={value} label={value} style={{ margin: 4 }} />
                                            ))}
                                        </div>
                                    )}>
                                    {axes.map(name => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item>
                                <Typography variant='caption' >Correct answers count</Typography>
                                <Slider
                                    defaultValue={task.taskConfig.correctAnswersCount}
                                    onChangeCommitted={(ev, val) => { task.taskConfig.correctAnswersCount = val; }}
                                    step={1}
                                    min={1}
                                    max={2}
                                    valueLabelDisplay="auto"
                                    marks={[1, 2].map(val => ({ value: val, label: val }))}
                                />
                            </Grid>
                            <Grid item style={{ flexGrow: 1, textAlign: 'center' }}>
                                <Typography variant='caption'>Zero 'A' axis</Typography>
                                <br />
                                <Switch checked={task.taskConfig.zeroAaxis}
                                    onChange={(ev) => { task.taskConfig.zeroAaxis = ev.target.checked; this.setState({ task: task }) }} />
                            </Grid>
                        </Grid>

                        <Grid container spacing={4} alignItems='center'>
                            <Grid item sm={1} />
                            <Grid item sm={4}>
                                <Typography variant='caption'>Answers axes</Typography>
                                <br />
                                <Select
                                    multiple
                                    value={task.taskConfig.answersAxes}
                                    onChange={(ev) => { task.taskConfig.answersAxes = ev.target.value; this.setState({ task: task }) }}
                                    MenuProps={MenuProps}
                                    renderValue={selected => (
                                        <div>
                                            {selected.map(value => (
                                                <Chip key={value} label={value} style={{ margin: 4 }} />
                                            ))}
                                        </div>
                                    )}>
                                    {axes.map(name => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item>
                                <Typography variant='caption' >Answers count</Typography>
                                <Slider
                                    defaultValue={task.taskConfig.answersCount}
                                    onChangeCommitted={(ev, val) => { task.taskConfig.answersCount = val; }}
                                    step={1}
                                    min={1}
                                    max={6}
                                    valueLabelDisplay="auto"
                                    marks={[1, 2, 3, 4, 5, 6].map(val => ({ value: val, label: val }))}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={4} alignItems='center'>
                            <Grid item sm={1} />

                        </Grid>
                    </div>
                ) : this.props.task.type == 'S2G' ? (
                    <div>
                        <Grid container spacing={4} alignItems='center'>
                            <Grid item sm={1}></Grid>
                            <Grid item sm={4}>
                                <Typography variant='caption'>Axes</Typography>
                                <br />
                                <Select
                                    multiple
                                    value={task.taskConfig.axes}
                                    onChange={(ev) => { task.taskConfig.axes = ev.target.value; this.setState({ task: task }) }}
                                    MenuProps={MenuProps}
                                    renderValue={selected => (
                                        <div>
                                            {selected.map(value => (
                                                <Chip key={value} label={value} style={{ margin: 4 }} />
                                            ))}
                                        </div>
                                    )}>
                                    {axes.map(name => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item>
                                <Typography variant='caption' >Double graph chance</Typography>
                                <Slider
                                    value={task.taskConfig.doubledChance}
                                    onChange={(ev, val) => { this.setState({ doubledChance: val }) }}
                                    onChangeCommitted={(ev, val) => { task.taskConfig.doubledChance = val; }}
                                    step={0.01}
                                    min={0}
                                    max={1}
                                    valueLabelDisplay="auto"
                                    marks={[0, 0.5, 1].map(val => ({ value: val, label: val }))}
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant='caption' >Answers count</Typography>
                                <Slider
                                    defaultValue={task.taskConfig.answersCount}
                                    onChangeCommitted={(ev, val) => { task.taskConfig.answersCount = val; }}
                                    step={1}
                                    min={1}
                                    max={6}
                                    valueLabelDisplay="auto"
                                    marks={[1, 2, 3, 4, 5, 6].map(val => ({ value: val, label: val }))}
                                />
                            </Grid>
                            <Grid item style={{ flexGrow: 1, textAlign: 'center' }}>
                                <Typography variant='caption'>Zero 'A' axis</Typography>
                                <br />
                                <Switch checked={task.taskConfig.zeroAaxis}
                                    onChange={(ev) => { task.taskConfig.zeroAaxis = ev.target.checked; this.setState({ task: task }) }} />
                            </Grid>
                        </Grid>
                    </div>
                ) : this.props.task.type == 'RS' ? (
                    <div>
                        <Grid container spacing={4} alignItems='center'>
                            <Grid item sm={1}></Grid>
                            <Grid item sm={4}>
                                <Typography variant='caption'>Simple</Typography>
                                <Switch
                                    checked={task.taskConfig.isSimple}
                                    onChange={(ev) => {
                                        task.taskConfig.isSimple = ev.target.checked;
                                        if (!ev.target.checked)
                                            if (task.taskConfig.answersCount % 2 != 0)
                                                ++task.taskConfig.answersCount
                                        this.setState({ task: task })
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant='caption' >Answers count</Typography>
                                <Slider
                                    value={
                                        task.taskConfig.isSimple ? task.taskConfig.answersCount : (
                                            task.taskConfig.answersCount % 2 == 0 ? task.taskConfig.answersCount : (++task.taskConfig.answersCount)
                                        )
                                    }
                                    onChange={(ev, val) => { task.taskConfig.answersCount = val; this.setState({ task: task }) }}
                                    onChangeCommitted={(ev, val) => { task.taskConfig.answersCount = val; }}
                                    step={task.taskConfig.isSimple ? 1 : 2}
                                    min={task.taskConfig.isSimple ? 1 : 2}
                                    max={6}

                                    valueLabelDisplay="auto"
                                    marks={
                                        task.taskConfig.isSimple ? (
                                            [1, 2, 3, 4, 5, 6].map(val => ({ value: val, label: val }))
                                        ) : (
                                                [2, 4, 6].map(val => ({ value: val, label: val }))
                                            )
                                    }
                                />
                            </Grid>
                            <Grid item style={{ flexGrow: 1, textAlign: 'center' }}>
                                <Typography variant='caption'>Zero 'A' axis</Typography>
                                <br />
                                <Switch checked={task.taskConfig.zeroAaxis}
                                    onChange={(ev) => { task.taskConfig.zeroAaxis = ev.target.checked; this.setState({ task: task }) }} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={4} alignItems='center'>
                            <Grid item sm={1}></Grid>
                            <Grid item sm={4}>
                                <Typography variant='caption'>Axes</Typography>
                                <br />
                                <Select
                                    multiple
                                    value={task.taskConfig.axes}
                                    onChange={(ev) => { task.taskConfig.axes = ev.target.value; this.setState({ task: task }) }}
                                    MenuProps={MenuProps}
                                    renderValue={selected => (
                                        <div>
                                            {selected.map(value => (
                                                <Chip key={value} label={value} style={{ margin: 4 }} />
                                            ))}
                                        </div>
                                    )}>
                                    {axes.map(name => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item sm={4}>
                                <Typography variant='caption' >Segments count</Typography>
                                <Slider
                                    defaultValue={task.taskConfig.segmentsCount}
                                    onChangeCommitted={(ev, val) => { task.taskConfig.segmentsCount = val; }}
                                    step={1}
                                    min={2}
                                    max={7}
                                    valueLabelDisplay="auto"
                                    marks={[2, 3, 4, 5, 6, 7].map(val => ({ value: val, label: val }))}
                                />
                            </Grid>
                        </Grid>
                    </div>
                ) : (<Typography> Unknown task type </Typography>)}

            </div>
        )
    }
}

export default withStyles(styles)(TaskEdit);
