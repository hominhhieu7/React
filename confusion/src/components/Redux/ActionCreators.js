import * as ActionTypes from './ActionTypes';
import { DISHES } from '../../shared/Dishes';





export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fetchDishes = () => (dishpatch) => {
    dishpatch(dishesLoading(true));
    setTimeout(() => {
        dishpatch(addDishes(DISHES))
    }, 1000);
};
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});
export const dishFail = (error) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: error
});
export const addDishes = (dishes) => ({
    type: ActionTypes.DISHES_ADDED,
    payload: dishes
});