import * as ActionTypes from './ActionTypes';

// const initialState = {
//     dishes: DISHES
// }
export const Dishes = (state = {
    isLoading: true,
    error: null,
    dishes: []
}, action) => {
    switch (action.type) {
        case ActionTypes.DISHES_ADDED:
            return { ...state, isLoading: false, error: null, dishes: action.payload }
        case ActionTypes.DISHES_LOADING:
            return { ...state, isLoading: true, error: null, dishes: [] }

        case ActionTypes.DISHES_FAILED:
            return { ...state, isLoading: false, error: action.payload, dishes: [] }
        default:
            return state;

    }
}