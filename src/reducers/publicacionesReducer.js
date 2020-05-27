import {
    UPDATE,
    LOADING,
    ERROR,
    COM_LOADING,
    COM_UPDATE,
    COM_ERROR
} from "../types/publicationsTypes";

const INITIAL_STATE = {
    posts: [],
    loading: false,
    error: '',
    com_loading: false,
    com_error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE:
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: ''
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case COM_LOADING:
            return {
                ...state,
                com_loading: true
            }
        case COM_UPDATE:
            return {
                ...state,
                posts: action.payload,
                com_loading: false,
                com_error: ''
            }
        case COM_ERROR:
            return {
                ...state,
                com_error: action.payload,
                com_loading: false
            }
        default: return state;
    }
}