import * as ActionTypes from './ActionTypes'
// const initialState = {
//     promotions: PROMOTIONS
// }
export const Promotions = (state = {
    isLoading: true,
    error: null,
    promotions: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMOS:
            return { ...state, isLoading: false, error: null, promotions: action.payload }
        case ActionTypes.PROMOS_LOADING:
            return { ...state, isLoading: true, error: null, promotions: [] }
        case ActionTypes.PROMOS_FAILED:
            return { ...state, isLoading: false, error: action.payload, promotions: [] }
        default:
            return state;
    }
}