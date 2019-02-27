import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';


function RenderCard({ item, isLoading, error}) {
    debugger
    if (isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );

    }
    else if (error) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{error}</h4>
                </div>
            </div>
        )
    }
    else return (
        <Card>
            <CardImg src={baseUrl + item.image} alt={item.name} />
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
                    <RenderCard item={Dish} isLoading={props.dishesLoading} error={props.errorDish} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={Promotion} isLoading= {props.promosLoading} error={props.errorPromo} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={Leader}  />
                </div>
            </div>
        </div>
    );
}
export default Home;