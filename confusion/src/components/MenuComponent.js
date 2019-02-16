import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';


class Menu extends Component {

    constructor(props) {
        super()
        this.state = {
            selectDish: null
        }   
        // console.log('Menu Component constructor is invoked');
    }

    // componentDidMount(){
    //     console.log('Menu Component componentDidMuont is invoked');
    // }

    onDishSelect(dish) {
        this.setState({ selectDish: dish })
    }
    
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" object src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>
                                {dish.name}
                            </CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row ">
                    {menu}
                </div>
                <DishDetail dish={this.state.selectDish}/>
            </div>
        );
    }
}

export default Menu;