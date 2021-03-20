import axios from "../helpers/axios";
import { authConstants, userConstants } from "./constants";

export const signup = (user) => { 
    console.log(user);
    return async (dispatch) => {
        dispatch({ type: userConstants.USER_REG_REQUEST });
        const res = await axios.post(`/admin/sign-up`,{
            ...user //why ... user ??
        });

        if(res.status === 201){
            
            dispatch({
                type: userConstants.USER_REG_SUCCESS,
            });
            const {token, user} = res.data;
            alert('Sign up successfully');
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{
                    token,
                    user
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