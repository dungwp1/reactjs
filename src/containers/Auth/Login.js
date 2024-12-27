import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { every } from 'lodash';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }

        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleonKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.handleLogin()
        }
    }
    render() {
        return (
            <div>
                <div className='login-background'>
                    <div className='login-containner'>
                        <div className='login-content'>
                            <div className='col-12 text-center login'>Login</div>
                            <div className='username'>
                                <label>Username:</label>
                                <input type='text'
                                    className='form-control'
                                    placeholder='Type your username'
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeUsername(event)}>
                                </input>
                            </div>
                            <div className='password'>
                                <label>Password:</label>
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Type your password'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(event) => this.handleonKeyDown(event)}>
                                </input>
                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    <i class={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </span>

                            </div>
                            <div className='forgot-password'>Forgot password?</div>
                            <div className='col-12' style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className='btn-login'>
                                <button onClick={() => this.handleLogin()}>LOGIN</button>
                            </div>
                            <div className='or-sign-up'>Or Login with:</div>
                            <div className='col-12 logo'>
                                <i className="fab fa-google"></i>
                                <i className="fab fa-twitter"></i>
                                <i className="fab fa-facebook-f"></i>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
