import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap'
import { Control, LocalForm, Errors } from 'react-redux-form';



const required = (val) => val && val.length; //check required
const maxLength = (len) => (val) => !(val) || (val.length <= len); //check max length
const minLength = (len) => (val) => (val) && (val.length >= len); //check min length
class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    handleComment(values) {
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
        this.toggleModal();
    }
    render() {

        return (
            <div>
                <Button color="secondary" outline onClick={this.toggleModal} >
                    <i className="fa fa-pencil-square-o"></i>{' '}<span>Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleComment(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select defaultValue="1" className="form-control" model=".rating" name="rating" id="rating">
                                        <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your name</Label>
                                <Col md={12}>
                                    <Control.text validators={{ required, minLength: minLength(2), maxLength: maxLength(10) }} className="form-control" model=".author" name="author" id="author" placeholder="Your name" />
                                    <Errors className="text-danger" model=".author" show="touched" messages={{ required: 'Required ', minLength: 'Must be greater 2 characters', maxLength: 'Must be 10 characters or less' }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea className="form-control" model=".comment" name="comment" id="comment" rows="10" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button color="primary" type="submit">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default CommentForm;