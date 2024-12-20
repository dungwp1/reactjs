import { first } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
        }
    }
    handleOnChangeInput = (event, input) => {
        let copyState = { ...this.state };
        copyState[input] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i])
                break;
            }
        }

        return isValid;
    }
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }
    }



    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
                centered>
                <ModalHeader toggle={() => { this.toggle() }}>Create New User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                // value={this.state.email}
                                type='text'>
                            </input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                // value={this.state.password}
                                type='password'>
                            </input>
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input
                                onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                // value={this.state.firstName}
                                type='text'>
                            </input>
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input
                                onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                // value={this.state.lastName}
                                type='text'>
                            </input>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Adress</label>
                            <input
                                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                // value={this.state.address}
                                type='text'>
                            </input>
                        </div>
                        <div className='input-container'>
                            <label>Phone Number</label>
                            <input
                                onChange={(event) => { this.handleOnChangeInput(event, 'phoneNumber') }}
                                // value={this.state.phoneNumber}
                                type='text'>
                            </input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-3' color="primary" onClick={() => { this.handleAddNewUser() }}>
                        Create
                    </Button>{' '}
                    <Button className='px-3' color="secondary" onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


