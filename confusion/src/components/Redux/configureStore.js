import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { Dishes } from './dishes';
import Thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms'

export const ConfigureStore = () => {

    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(Thunk, logger)
    );
    return store;
}