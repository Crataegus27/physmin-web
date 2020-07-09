import {
    ADD_LEVEL,
    SET_LEVEL,
    SET_LEVELS,
    RENAME_LEVEL,
    GET_LEVELS,
    GET_LEVELS_SEQUENCE,
    SET_LEVELS_SEQUENCES,
    LOADING_UI,
    SEQ_INDICATING,
    STOP_LOADING_UI,
    LOADING_LEVELS_UI,
    STOP_LOADING_LEVELS_UI,
    LOADING_LEVEL_UI,
    STOP_LOADING_LEVEL_UI,
    STOP_SEQ_INDICATING
} from './../types';
import axios from 'axios';
import { ProgressiveMovementPath, levelTemplate } from './../../utils/config'

export const getLevels = (topic) => (dispatch) => {
    dispatch({ type: LOADING_LEVELS_UI });
    dispatch({ type: SET_LEVEL, payload: {} });
    axios.get(`/getLevels/${ProgressiveMovementPath}/${topic}`)
        .then((res) => {
            dispatch({
                type: SET_LEVELS,
                payload: res.data
            });

        })
        .catch((err) => {
            console.error("Cant load levels." + err);
        }).finally(() => {
            dispatch({ type: STOP_LOADING_LEVELS_UI });
        })
}

export const getLevel = (topic, level) => (dispatch) => {
    dispatch({ type: LOADING_LEVEL_UI });
    axios.get(`/getLevel/${ProgressiveMovementPath}/${topic}/${level}`)
        .then((res) => {
            dispatch({
                type: SET_LEVEL,
                payload: { data: res.data, name: level }
            });

        })
        .catch((err) => {
            console.error("Cant load level." + err);
        }).finally(() => {
            dispatch({ type: STOP_LOADING_LEVEL_UI });
        })
}

export const addLevel = (topic, levelObj = levelTemplate) => (dispatch) => {
    axios.post(`/addLevel/${ProgressiveMovementPath}/${topic}`, levelObj)
        .then((res) => {
            dispatch(getLevels(topic));
        })
        .catch((err) => {
            console.error("Cant add level." + err);
        })
}
export const setLevel = (topic, level, levelObj) => (dispatch) => {
    axios.post(`/setLevel/${ProgressiveMovementPath}/${topic}/${level}`, levelObj)
        .then((res) => {
            dispatch(getLevel(topic, level));
        })
        .catch((err) => {
            console.error("Cant set level." + err);
        })
}

export const deleteLevel = (topic, level) => (dispatch) => {
    axios.post(`/deleteLevel/${ProgressiveMovementPath}/${topic}/${level}`)
        .then((res) => {
            dispatch(getLevels(topic));
        })
        .catch((err) => {
            console.error("Cant set level." + err);
        })
}

export const renameLevel = (topic, level, newName) => (dispatch) => {
    dispatch({ type: LOADING_LEVEL_UI });
    return axios.post(`/renameLevel/${ProgressiveMovementPath}/${topic}/${level}`, { newName: newName })
        .then((res) => {
            dispatch({
                type: RENAME_LEVEL,
                payload: {
                    oldName: level,
                    newName: newName
                }
            })
        })
        .catch((err) => {
            console.error("Cant rename level. " + err);
            throw ("error")
        }).finally(() => {
            dispatch({ type: STOP_LOADING_LEVEL_UI });
        })
}

export const getLevelsSequences = (topic, recursive = false) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    return axios.get(`/getLevelsSequences/${ProgressiveMovementPath}/${topic}`)
        .then(res => {
            dispatch({
                type: SET_LEVELS_SEQUENCES,
                payload: res.data
            })
        })
        .catch(err => {
            console.error("Cant get levels sequences. Try to create new one. " + err)
            if (!recursive) {
                dispatch(setLevelsSequences(topic, [], []))
                return dispatch(getLevelsSequences(topic, true))
            }
        })
        .finally(() => {
            dispatch({ type: STOP_LOADING_UI })
        })
}

export const setLevelsSequences = (topic, exercisesSeq, examSeq) => (dispatch) => {
    const data = {
        ExercisesSequence: exercisesSeq,
        ExamsSequence: examSeq
    };

    dispatch({ type: SEQ_INDICATING })
    axios.post(`/setLevelsSequences/${ProgressiveMovementPath}/${topic}`, data)
        .then((res) => {
            console.log("successfull setted seuqences")
        })
        .catch((err) => {
            console.error("Cant set sequences." + err);
        })
        .finally(() => {
            dispatch({ type: STOP_SEQ_INDICATING })
        })
}
