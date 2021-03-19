import axiosInstance from "../helpers/axios"
import { categoryConstants, initialDataConstants, orderConstants, productConstants } from "./constants";

export const getInitialData = () => {
    return async dispatch => {
        dispatch({ type: initialDataConstants.GET_INIT_DATA_REQUEST});
        const res = await axiosInstance.get(`/initial-data`);
        if(res.status === 200){
            const {categories, products, orders} = res.data;
            dispatch({type: initialDataConstants.GET_INIT_DATA_SUCCESS});
            dispatch({ 
                type: categoryConstants.GET_CATEGORIES_SUCCESS,
                payload: {
                    categories
                } 
            });
            dispatch({
                type: productConstants.GET_PRODUCT_SUCCESS,
                payload: {
                    products
                }
            });
            dispatch({
                type:orderConstants.GET_ORDER_SUCCESS,
                payload:{
                    orders
                }
            })
        } else {
            dispatch({
                type: initialDataConstants.GET_INIT_DATA_FAILURE,
                payload:{
                    error: res.data.error
                }
            })
        }
    }
}