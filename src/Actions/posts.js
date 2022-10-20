import * as api from '../Api/index.js';
import {COMMENT,FETCH_ALL,FETCH_POST,FETCH_BY_SEARCH,START_LOADING,END_LOADING,CREATE,UPDATE,DELETE,FETCH_BY_CREATOR} from '../Constants/actionType';

export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchPost(id);
      dispatch({ type: FETCH_POST, payload: data});
    } catch (error) {
      console.log(error);
    }
};

export const getPosts = (page)=> async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.fetchPosts(page);
        const action = {type:FETCH_ALL, payload:data}
        dispatch(action);
        dispatch({type:END_LOADING});
    } catch (error) {
        console.log(error);    
    }

};

export const getPostsByCreator = (name) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data: { data } } = await api.fetchPostsByCreator(name);
  
      dispatch({ type: FETCH_BY_CREATOR, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };
export const getPostsBySearch = (searchQuery) => async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data:{data}} = await api.fetchPostsBySearch(searchQuery);
        const action = {type:FETCH_BY_SEARCH, payload:data};
        dispatch(action);
        dispatch({type:END_LOADING});
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (post,history)=> async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.createPost(post);
        const action = {type:CREATE, payload:data};
        history.push(`/posts/${data._id}`);
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id,post)=> async(dispatch)=>{
    try {
        const {data} = await api.updatePost(id,post);
        
        const action = {type:UPDATE, payload:data};
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async(dispatch)=>{
    try {
        await api.deletePost(id);
        const action = {type:DELETE,payload:id};
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id) => async(dispatch)=>{
    try {
        const {data} = await api.likePost(id);
        const action = {type:UPDATE, payload:data};
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
};

export const commentPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.comment(value, id);
  
      dispatch({ type: COMMENT, payload: data });
  
      return data.comments;
    } catch (error) {
      console.log(error);
    }
};