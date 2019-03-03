import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';




export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});
export const postComment = (dishId, rating, author, comment) =>(dishpatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();
    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
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
        }).then(response => response.json())
        .then(response => dishpatch(addComment(response)))
        .catch(error => {
            console.log('Post comments' + error.message)
            alert('Your comment could not  be posted\nError: ' + error.message);
        }
        );
}



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
const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
const commentsFailed = (error) => ({
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
const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});
const dishFailed = (error) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: error
});
const addDishes = (dishes) => ({
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
const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});
const addPromotions = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});
const promosFailed = (error) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: error
});

