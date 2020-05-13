import axios from 'axios';

import {BRING_ALL, ERROR, LOADING} from "../types/usuariosTypes";

export const bringAll = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    try {
        const userRequest = await axios.get('https://jsonplaceholder.typicode.com/users')
        dispatch({
            type: BRING_ALL,
            payload: userRequest.data
        })
    }
    catch (error) {
        dispatch({
            type: ERROR,
            payload: error.message
        })
    }
}

