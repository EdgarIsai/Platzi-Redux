import axios from 'axios';

import { BRING_ALL, ERROR, LOADING } from "../types/tasksTypes";

export const bringAll = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        dispatch({
            type: BRING_ALL,
            payload: response.data
        })
    }
    catch (error) {
        dispatch({
            type: ERROR,
            payload: "User information not available"
        })
    }
}

