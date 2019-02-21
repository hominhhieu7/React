import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'

function RenderCard({ item }) {
    return (
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
                <CardTitle>
                    {item.name}
                </CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

function Home(props) {
    const Dish = props.dish
    const Leader = props.leader
    const Promotion = props.promotion
    return (

        <div className="container">
            <div className="col-12">
                <h3>Home</h3> <hr />
            </div>
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={Dish} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={Promotion} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={Leader} />
                </div>
            </div>
        </div>
    );
}
export default Home;