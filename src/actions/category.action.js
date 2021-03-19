import axiosInstance from "../helpers/axios";
import axios from "../helpers/axios"
import { categoryConstants } from "./constants";

const getCategories = () => {
    return async dispatch => {
        dispatch({ type: categoryConstants.GET_CATEGORIES_REQUEST });
        const res = await axios.get(`/categories`);
        
        if(res.status === 200){
           
            console.log(res);
            const { categoryList } = res.data;

            dispatch({
                type: categoryConstants.GET_CATEGORIES_SUCCESS,
                payload:{
                    categories: categoryList
                }
            });
        } else {
            dispatch({
                type: categoryConstants.GET_CATEGORIES_FAILURE,
                payload:{
                    error: res.data.error
                }
            });
        }
    } 
}

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.ADD_CATEGORY_REQUEST });
        const res = await axios.post(`/category/create`, form);
        if(res.status === 201){
            dispatch({
                type: categoryConstants.ADD_CATEGORY_SUCCESS,
                payload:{ category: res.data.category }
            })
        } else {
            dispatch({
                type: categoryConstants.ADD_CATEGORY_FAILURE,
                payload:res.data.error
            })
        }
        
    }
}

export const updateCategories = (form) => {
    
    return async dispatch => {
        dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST });
        const res = await axiosInstance.post('/categories/update', form);
        if(res.status === 201){
            dispatch({ type: categoryConstants.UPDATE_CATEGORY_SUCCESS });
            dispatch(getCategories());
        } else {
            const {error} = res;
            dispatch({ 
                type: categoryConstants.UPDATE_CATEGORY_FAILURE, 
                payload: { error }
            });

        }
    }
}

export const deleteCategories = (idsArray) => {
    
    return async dispatch => {
        dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });
        const res = await axiosInstance.post('/categories/delete', {
            payload: {
                idsArray
            }
        });

        
        if(res.status === 201){
            dispatch(getCategories());
            dispatch({
                type: categoryConstants.DELETE_CATEGORY_SUCCESS
            })
        } else {
            const { error } = res.data;
            dispatch({
                type: categoryConstants.DELETE_CATEGORY_FAILURE,
                payload:{ error }
            })
        }
    }
}

export{
    getCategories
}