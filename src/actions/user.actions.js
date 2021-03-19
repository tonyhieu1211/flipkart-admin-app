import axios from "../helpers/axios";
import { userConstants } from "./constants";

export const signup = (user) => {
    console.log(user);
    return async (dispatch) => {
        dispatch({ type: userConstants.USER_REG_REQUEST });
        const res = await axios.post(`/admin/sign-up`,{
            ...user //why ... user ??
        });

        if(res.status === 201){
            const { message } = res.data;
            dispatch({
                type: userConstants.USER_REG_SUCCESS,
                payload:{
                    message
                }
            });
            
        } else if(res.status === 400){
            dispatch({
                type: userConstants.USER_REG_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }    
}