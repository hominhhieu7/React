import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }
    renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg width="100%" object src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
    renderComments(comments){
        const commentList = comments.map((comment) => {
            return(
                <div key={comment.id}>
                    {comment.comment} <br /> {comment.author}  {comment.date}
                </div>
            )
        });
        return(
            <div>
                <h4>Comment</h4>
                <div>
                    {commentList}
                </div>
            </div>
        );
    }
    
    render() {
        if (this.props.dish) {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
                    </div>

                </div>
            );

        }
        else {
            return (
                <div></div>
            );
        }

    }
}
export default DishDetail;