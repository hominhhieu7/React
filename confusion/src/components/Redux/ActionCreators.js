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
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json()
            .then(comments => dishpatch(addComments(comments))))
        .catch(error => dishpatch(commentsFailed(error.message)));
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
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(dishes => dishpatch(addDishes(dishes)))
        .catch(error => dishpatch(dishFailed(error.message)));
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
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var err = new Error('Error ' + response.status + ': ' + response.statusText);
                err.response = response;
                throw err;
            }
        }, error => {
           var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(promos => dishpatch(addPromotions(promos)))
        .catch(error => dishpatch(promosFailed(error.message)));
}
export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});
export const addPromotions = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});
export const promosFailed = (error) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: error
});