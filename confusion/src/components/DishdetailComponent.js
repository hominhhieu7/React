import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';


function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <Card>
                <CardImg width="100%" object="true" src={dish.image} alt={dish.name} />
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
function RenderComments({ comments }) {
    const commentList = comments.map((comment) => {
        return (
            <div key={comment.id} className="row">
                <div className="col-8">
                    {comment.author}: {comment.comment}
                </div>
                <div className="col-4">
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                </div>
            </div>
        )
    });
    return (
        <div>
            <h4>Comments</h4>
            <div>
                {commentList}
            </div>
        </div>
    );
}
const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem> <Link to="/menu">Menu</Link> </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3> <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                        <CommentForm/>
                    </div>

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
export default DishDetail;