import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';




export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});




export const fetchComments = () => (dishpatch) => {
    return fetch(baseUrl + 'comments')
        .then(reponsive => reponsive.json()
            .then(comments => dishpatch(addComments(comments))));
}
export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
export const commentsFailed = (error) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: error
});



export const fetchDishes = () => (dishpatch) => {
    dishpatch(dishesLoading(true));
    return fetch(baseUrl + 'dishes')
        .then(reponsive => reponsive.json())
        .then(dishes => dishpatch(addDishes(dishes)));
};
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});
export const dishFailed = (error) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: error
});
export const addDishes = (dishes) => ({
    type: ActionTypes.DISHES_ADDED,
    payload: dishes
});


export const fetchPromos = () => (dishpatch) => {
    dishpatch(promosLoading(true));
    return fetch(baseUrl + 'promotions')
        .then(reponsive => reponsive.json())
        .then(promos => dishpatch(addPromotions(promos)));
}
export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});
export const addPromotions = (promos) =>({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});
export const promosFailed = (error) =>({
    type: ActionTypes.PROMOS_FAILED,
    payload: error
});