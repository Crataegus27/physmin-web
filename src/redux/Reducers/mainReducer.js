import {
    SET_LEVELS,
    SET_LEVEL,
    RENAME_LEVEL,
    SET_LEVELS_SEQUENCES,
} from './../types';


const initialState = {
    levels: [],
    level: {},
    levelName: null,
    exercisesSequence: [],
    examsSequence: [],
    exercisesList: [],
    examsList: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LEVELS:
            return {
                ...state,
                levels: action.payload
            };
        case SET_LEVEL:
            return {
                ...state,
                level: action.payload.data,
                levelName: action.payload.name
            };
        case RENAME_LEVEL:
            state.levels.splice(state.levels.indexOf(action.payload.oldName), 1, action.payload.newName) // replace old level name
            return {
                ...state,
                levelName: action.payload.newName,
                levels: state.levels
            }
        case SET_LEVELS_SEQUENCES:
            return {
                ...state,
                levelName: null,
                level: {},
                exercisesList: action.payload.exercisesList || [],
                examsList: action.payload.examsList || [],
                exercisesSequence: action.payload.ExercisesSequence || [],
                examsSequence: action.payload.ExamsSequence || []
            }
        default: return state;
    }
};