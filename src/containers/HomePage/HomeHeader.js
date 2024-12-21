import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { withRouter } from 'react-router';
import { changeLangugeApp } from '../../store/actions';
class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLangugeAppRedux(language)
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo' onClick={() => this.returnToHome()}></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.title1" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.subtitle1" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.title2" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.subtitle2" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.title3" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.subtitle3" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.title4" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.subtitle4" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i class="fas fa-question-circle"></i><FormattedMessage id="home-header.support" /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                <span onClick={() => { this.changeLanguage(LANGUAGES.VI) }}>VI</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                <span onClick={() => { this.changeLanguage(LANGUAGES.EN) }}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id="banner.title1" /></div>
                            <div className='title2'><b><FormattedMessage id="banner.title2" /></b></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text'
                                    placeholder={language === LANGUAGES.VI ? 'Tìm kiếm' : 'Search'} />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><i class="far fa-hospital"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child1" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i class="fas fa-mobile-alt"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child2" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i class="fas fa-stethoscope"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child3" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i class="fas fa-syringe"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child4" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i class="fas fa-user"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child5" /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i class="fas fa-hospital-symbol"></i></div>
                                    <div className='text-child'><FormattedMessage id="banner.child6" /></div>
                                </div>

                            </div>
                        </div>

                    </div>
                }
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLangugeAppRedux: (language) => dispatch(changeLangugeApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
