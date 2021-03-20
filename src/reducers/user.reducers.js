import { userConstants } from "../actions/constants";

const initState = {
    error: null,
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case userConstants.USER_REG_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.USER_REG_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break;
        case userConstants.USER_REG_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    
        default:
            break;
    }
    return state;
}