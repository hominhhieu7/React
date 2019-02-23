import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { onErrorResumeNext } from 'rxjs';


const required = (val) => val && val.length; //check required
const maxLength = (len) => (val) => !(val) || (val.length <= len); //check max length
const minLength = (len) => (val) => (val) && (val.length >= len); //check min length
const isNumber = (val) => !isNaN(Number(val)); //check number
const valid = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val); //check email

class Contact extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }
    render() {
        return (
            <div className="container" >
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem> <Link to="/home">Home</Link> </BreadcrumbItem>
                        <BreadcrumbItem active>Contact</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact</h3> <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            {/* <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a> */}
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content" >
                    <div className="col-12" >
                        <h3>Send us Your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={6}>
                                    <Control.text className="form-control" validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} model=".firstname" id="firstname" name="firstname" placeholder="First Name" />
                                    <Errors className="text-danger" model=".firstname" show="touched" messages={{ required: 'Required ', minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 characters or less' }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={6}>
                                    <Control.text className="form-control" validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} model=".lastname" id="lastname" name="lastname" placeholder="Last Name" />
                                    <Errors className="text-danger" model=".lastname" show="touched" messages={{ required: 'Required ', minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 characters or less' }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telenum" md={2}>Contact Tel.</Label>
                                <Col md={6}>
                                    <Control.text className="form-control" validators={{ required, isNumber, minLength: minLength(10), maxLength: maxLength(15) }} model=".telenum" type="tel" id="telenum" placeholder="Telephone Number" />
                                    <Errors className="text-danger" model=".telenum" show="touched" messages={{ required: 'Required ', minLength: ' Numbers greater than 10 number', maxLength: ' Numbers be 15 numbers or less ', isNumber: ' Must a numbers' }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={6}>
                                    <Control.text className="form-control" validators={{ required, valid }} model=".email" type="email" id="email" name="email" placeholder="Email" />
                                    <Errors className="text-danger" model=".email" show="touched" messages={{ required: 'Required ', valid: 'Invalid email adress'}}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 4, offset: 2 }} >
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox className="form-check-input" model=".agree" name="agree" />{' '} <strong>May we contact you???</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{ size: 2 }} >
                                    <Control.select model=".contactType" className="form-control" type="select" name="contactType">
                                        <option>Tel.</option>
                                        <option>Mail</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your feedback</Label>
                                <Col md={6}>
                                    <Control.textarea model=".message" className="form-control" type="textarea" id="message" name="message" rows="10" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary" >Send feedback</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
            </div>
        );
    }
}
export default Contact;