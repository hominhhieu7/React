import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Form, Button, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            telenum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                telenum: false,
                email: false
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    handleSubmit(event) {
        console.log("Current State is: " + JSON.stringify(this.state));
        alert("Current State is: " + JSON.stringify(this.state));
        event.preventDefault();
    }
    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }
    validate(firstname, lastname, telenum, email) {
        debugger
        const errors = {
            firstname: '',
            lastname: '',
            telenum: '',
            email: '',
        };
        if (this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First name should be >= 3 characters';
        else if (this.state.touched.firstname && firstname.length > 10)
            errors.firstname = 'First name should be < 10 characters';
        if (this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'Last name should be >= 3 characters';
        else if (this.state.touched.lastname && lastname.length > 10)
            errors.lastname = 'Last name should be < 10 characters';
        const reg = /^\d+$/;
        if (this.state.telenum && !reg.test(telenum)) // kiem tra trong chuoi chi so khong co ky tu khac
            errors.telenum = 'Tel. Number should contain only number';
        if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)  //kiem tra chuoi co it nhat @ trong mail
            errors.email = 'Email should contain a @';
        else if (this.state.touched.email && email.split('').filter(x => x === '.').length !== 1)
        errors.email = 'Email should contain a .';
        return errors;
    }
    render() {
        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.telenum, this.state.email)
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
                        <Form onSubmit={this.handleSubmit} >
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={6}>
                                    <Input type="text" id="firstname" name="firstname" valid={errors.firstname === ''} invalid={errors.firstname !== ''} placeholder="First Name" value={this.state.firstname} onBlur={this.handleBlur('firstname')} onChange={this.handleInputChange} />
                                    <FormFeedback>
                                        {errors.firstname}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={6}>
                                    <Input type="text" id="lastname" name="lastname" valid={errors.lastname === ''} invalid={errors.lastname !== ''} placeholder="Last Name" value={this.state.lastname} onBlur={this.handleBlur('lastname')} onChange={this.handleInputChange} />
                                    <FormFeedback>
                                        {errors.lastname}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telenum" md={2}>Contact Tel.</Label>
                                <Col md={6}>
                                    <Input type="tel" id="telenum" name="telenum" valid={errors.telenum === ''} invalid={errors.telenum !== ''} placeholder="Telephone Number" value={this.state.telenum} onBlur={this.handleBlur('telenum')} onChange={this.handleInputChange} />
                                    <FormFeedback>
                                        {errors.telenum}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={6}>
                                    <Input type="email" id="email" name="email" valid={errors.email === ''} invalid={errors.email !== ''} placeholder="Email" value={this.state.email} onBlur={this.handleBlur('email')} onChange={this.handleInputChange} />
                                    <FormFeedback>
                                        {errors.email}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 4, offset: 2 }} >
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree" checked={this.state.agree} onChange={this.handleInputChange} />{' '} <strong>May we contact you???</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 2 }} >
                                    <Input type="select" name="contactType" value={this.state.contactType} onChange={this.handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Mail</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>Your feedback</Label>
                                <Col md={6}>
                                    <Input type="textarea" id="message" name="message" rows="10" value={this.state.message} onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary" >Send feedback</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Contact;