import axiosInstance from "../helpers/axios";
import { orderConstants, pageConstants } from "./constants"

export const getCustomerOrders = () => {
    return async dispatch => {
        dispatch({ type: orderConstants.GET_ORDER_REQUEST });
        try {
            const res = await axiosInstance.get(`/order/getCustomerOrders`);
            if(res.status == 200){
                dispatch({
                    type: orderConstants.GET_ORDER_SUCCESS,
                    payload:{
                        orders: res.data.orders
                    }
                })
            } else {
                dispatch({
                    type: orderConstants.GET_ORDER_FAILURE,
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

export const updateOrder = (payload) => {
    return async dispatch => {
       dispatch({type: orderConstants.UPDATE_ORDER_REQUEST});
        try {
            const res = await axiosInstance.post(`/order/update`, payload);
            if(res.status == 201){
                dispatch({type: orderConstants.UPDATE_ORDER_SUCCESS});
                dispatch(getCustomerOrders())
            } else {
                dispatch({
                    type: orderConstants.UPDATE_ORDER_FAILURE,
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