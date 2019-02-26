import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Footer from './FooterComponent';
import DishDetail from './DishdetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from './Redux/ActionCreators';
import { actions } from 'react-redux-form';



const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
};
const mapDishpatchToProps = (dishpatch) => ({
    addComment: (dishId, rating, author, comment) => dishpatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dishpatch(fetchDishes()) },
    resetFeedbackForm: () =>{dishpatch(actions.reset('feedback'))}
});


class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
    };

    render() {
        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    isLoading={this.props.dishes.isLoading}
                    errorDish={this.props.dishes.error}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                    promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
                />
            );
        }
        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId), 10)[0]}
                    isLoading={this.props.dishes.isLoading}
                    error={this.props.dishes.error}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId), 10)}
                    addComment={this.props.addComment}
                />
            );
        }
        const AboutPage = () => {
            return (
                <About leaders={this.props.leaders} />
            );

        }
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/about" component={AboutPage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route exact path="/contactus" component={() =><Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDishpatchToProps)(Main));
