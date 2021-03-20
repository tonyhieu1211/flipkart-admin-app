import axiosInstance from "../helpers/axios"
import { productConstants } from "./constants";

export const getProducts = () => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_ALL_PRODUCT_REQUEST });
        try {
            const res = await axiosInstance.get(`/product/getProducts`);
            if(res.status == 200){
                dispatch({
                    type: productConstants.GET_ALL_PRODUCT_SUCCESS,
                    payload:{
                        products: res.data.products
                    }
                })
            } else {
                dispatch({
                    type: productConstants.GET_ALL_PRODUCT_FAILURE,
                    payload:{
                        error: res.data.error
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
        
    }
}

export const addProduct = (data) => {
    return async dispatch => {
        try {
            dispatch({ type: productConstants.ADD_PRODUCT_REQUEST})
            const res = await axiosInstance.post(`/product/create`, data);
            if(res.status == 201){
                dispatch({type: productConstants.ADD_PRODUCT_SUCCESS});
                dispatch(getProducts());
            }else{
                dispatch({type:productConstants.ADD_PRODUCT_FAILURE});
            }
        } catch (error) {
            console.log(error);
        }
        
    }
}

export const deleteProductById = (payload) => {
    return async dispatch => {
        try {
            dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST})
            const res = await axiosInstance.delete(`/product/deleteProductById`, {
                data:{payload}
            });
            if(res.status == 202){
                dispatch({type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS});
                dispatch(getProducts());
            }else{
                dispatch({type:productConstants.DELETE_PRODUCT_BY_ID_FAILURE});
            }
        } catch (error) {
            console.log(error);
        }
    }    
}