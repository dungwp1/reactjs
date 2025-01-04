import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getDetailInfoDoctor } from '../../../services/userService';
import { NumericFormat } from 'react-number-format';

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameClinic: '',
            addressClinic: '',
            price: '',
            isShowAboutPrice: false,
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.detailDoctor !== prevProps.detailDoctor) {
            let { detailDoctor } = this.props
            this.setState({
                nameClinic: detailDoctor.Doctor_Info.nameClinic,
                addressClinic: detailDoctor.Doctor_Info.addressClinic,
                price: detailDoctor.Doctor_Info.priceData,
            })
        }

    }
    handleShowHide = (input) => {
        this.setState({
            isShowAboutPrice: input
        })
    }


    render() {
        // console.log('check props doctorExtraInfo: ', this.props)
        const { language } = this.props
        let { nameClinic, addressClinic, price, isShowAboutPrice } = this.state

        return (
            <div className='doctor-extra-info-container'>
                <div className='doctor-extra-info-content'>
                    <div className='title-clinic'><FormattedMessage id='menu.doctor.address-clinic' /></div>
                    <div className='name-clinic'>{nameClinic}</div>
                    <div className='address-clinic'>{addressClinic}</div>
                    <div className='price'>
                        {isShowAboutPrice === false &&
                            <div className='hide-price'>
                                <div><FormattedMessage id='menu.doctor.price' />
                                    {language === LANGUAGES.VI
                                        ? <NumericFormat
                                            value={price.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' VND'}
                                        />
                                        : <NumericFormat
                                            value={price.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' $'}
                                        />}.

                                    <span className='xem-chi-tiet' onClick={() => this.handleShowHide(true)}><FormattedMessage id='menu.doctor.show' /></span>
                                </div>

                            </div>
                        }
                        {isShowAboutPrice === true &&
                            <div className='show-price'>
                                <div className='title-1'><FormattedMessage id='menu.doctor.facility' /></div>
                                <div className='title-2'><FormattedMessage id='menu.doctor.price' /></div>
                                <div className='row-1'>
                                    <div className='left'>
                                        <span><FormattedMessage id='menu.doctor.price-1' /></span>
                                        <span><FormattedMessage id='menu.doctor.about-price-1' /></span>
                                    </div>
                                    <div className='right'>
                                        <span>{language === LANGUAGES.VI
                                            ? <NumericFormat
                                                value={price.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' VNĐ'}
                                            />
                                            : <NumericFormat
                                                value={price.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' $'}
                                            />}</span>
                                    </div>

                                </div>
                                <div className='row-2'>
                                    <span><FormattedMessage id='menu.doctor.payment' /></span>
                                </div>

                                <span className='xem-chi-tiet' onClick={() => this.handleShowHide(false)}><FormattedMessage id='menu.doctor.hide' /></span>
                            </div>
                        }

                    </div>

                </div>

                {/* <div className='insurance'>Loại bảo hiểm áp dụng</div> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,


    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
