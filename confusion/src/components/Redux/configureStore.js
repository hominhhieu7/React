import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { Dishes } from './dishes';
import Thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {

    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        }),
        applyMiddleware(Thunk,logger)
    );
    return store;
}