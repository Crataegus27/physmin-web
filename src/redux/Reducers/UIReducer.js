import {
    LOADING_UI,
    STOP_LOADING_UI,
    LOADING_LEVELS_UI,
    STOP_LOADING_LEVELS_UI,
    LOADING_LEVEL_UI,
    STOP_LOADING_LEVEL_UI,
    SEQ_INDICATING,
    STOP_SEQ_INDICATING,
} from './../types';


const initialState = {
    loading: false,
    levels_loading: false,
    level_loading: false,
    seq_indicating: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_UI:
            return {
                ...state,
                loading: true
            };
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            };
        case LOADING_LEVELS_UI:
            return {
                ...state,
                levels_loading: true
            };
        case STOP_LOADING_LEVELS_UI:
            return {
                ...state,
                levels_loading: false
            };
        case LOADING_LEVEL_UI:
            return {
                ...state,
                level_loading: true
            };
        case STOP_LOADING_LEVEL_UI:
            return {
                ...state,
                level_loading: false
            };
        case SEQ_INDICATING:
            return {
                ...state,
                seq_indicating: true
            };
        case STOP_SEQ_INDICATING:
            return {
                ...state,
                seq_indicating: false
            };
        default: return state;
    }
};