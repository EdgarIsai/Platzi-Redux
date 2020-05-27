import axios from 'axios';

import { UPDATE, LOADING, ERROR, COM_LOADING, COM_ERROR, COM_UPDATE } from "../types/publicationsTypes";
import * as usersTypes from '../types/usuariosTypes';

const { BRING_ALL: USERS_BRING_ALL } = usersTypes;

export const bringFromUser = (key) => async (dispatch, getState) => {
    const { users } = getState().usuariosReducer;
    const { posts } = getState().publicacionesReducer;
    const user_id = users[key].id

    dispatch({
        type: LOADING
    })
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);

        const newOnes = response.data.map((post) => ({
            ...post,
            comments: [],
            open: false
        }))

        const  updated_posts = [
                ...posts,
                newOnes
            ]
            
        dispatch({
            type: UPDATE,
            payload: updated_posts
        });
        
        const posts_key = updated_posts.length - 1;
        const updated_users = [...users];
        updated_users[key] = {
            ...users[key],
            posts_key
        }

        dispatch({
            type: USERS_BRING_ALL,
            payload: updated_users
        });

    }
    catch (error) {
        dispatch({
            type: ERROR,
            payload: "Could not load posts"
        })
    }
}

export const openClose = (posts_key, com_key) => (dispatch, getState) => {
    const { posts } = getState().publicacionesReducer;
    const selected = posts[posts_key][com_key];

    const updated = {
        ...selected,
        open: !selected.open
    }

    const updatedPosts = [...posts];
    updatedPosts[posts_key] = [
        ...posts[posts_key]
    ]
    updatedPosts[posts_key][com_key] = updated;

    dispatch({
        type: UPDATE,
        payload: updatedPosts
    });
}

export const bringComments = (posts_key, com_key) => async (dispatch, getState) => {
    dispatch({
        type: COM_LOADING
    });
    const { posts } = getState().publicacionesReducer;
    const selected = posts[posts_key][com_key];

    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${selected.id}`)
    
        const updated = {
            ...selected,
            comments: response.data
        };
    
        const updatedPosts = [...posts];
        updatedPosts[posts_key] = [
            ...posts[posts_key]
        ]
        updatedPosts[posts_key][com_key] = updated;
    
        dispatch({
            type: COM_UPDATE,
            payload: updatedPosts
        });
    } catch (error) {
        dispatch (
            {
                type: COM_ERROR,
                payload: "Could not load comments"
            }
        )
    }
}