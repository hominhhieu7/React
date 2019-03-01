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
import { postComment, fetchDishes, fetchPromos,fetchComments } from './Redux/ActionCreators';
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
    postComment: (dishId, rating, author, comment) => dishpatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => { dishpatch(fetchDishes()) },
    resetFeedbackForm: () =>{dishpatch(actions.reset('feedback'))},
    fetchComments: () => {dishpatch(fetchComments())},
    fetchPromos: () => {dishpatch(fetchPromos())}
});


class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    };

    render() {
        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    errorDish={this.props.dishes.error}
                    promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                    promosLoading={this.props.promotions.isLoading}
                    errorPromo={this.props.promotions.error}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                    
                />
            );
        }
        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId), 10)[0]}
                    dishLoading={this.props.dishes.isLoading}
                    errorDish={this.props.dishes.error}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId), 10)}
                    postComment={this.props.postComment}
                    commentsLoading = {this.props.comments.isLoading}
                    errorComment= {this.props.comments.error}
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
