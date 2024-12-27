import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils/constant'
import { FormattedMessage } from 'react-intl';
import _isEmpty from 'lodash/isEmpty';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    handleChangeLanguage = (language) => {
        console.log('check language', language)
        this.props.changeLangugeAppRedux(language)

    }

    render() {

        const { processLogout, language, userInfo } = this.props;
        // console.log('check userInfo', userInfo)

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='languages'>
                    <div className='welcome'>
                        <span><FormattedMessage id="home-header.welcome" />, {userInfo && userInfo.lastName ? userInfo.lastName : ''} !</span>
                    </div>
                    <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                        <span onClick={() => { this.handleChangeLanguage(LANGUAGES.VI) }}>VI</span>
                    </div>
                    <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                        <span onClick={() => { this.handleChangeLanguage(LANGUAGES.EN) }}>EN</span>
                    </div>
                </div>

                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLangugeAppRedux: (language) => dispatch(actions.changeLangugeApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
