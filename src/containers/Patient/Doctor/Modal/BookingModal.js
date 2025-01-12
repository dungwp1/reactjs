import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { LANGUAGES } from '../../../../utils';
import { NumericFormat } from 'react-number-format';
import moment from 'moment';
import { getAllCodeService, postInfoBooking } from '../../../../services/userService';
import { toast } from 'react-toastify';
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/flatpickr.css';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';

class BookingModal extends Component {

    constructor(props) {

        super(props);
        this.state = {
            listGender: '',
            listProvince: '',
            lastNamePatient: '',
            firstNamePatient: '',
            gerderPatient: '',
            phonePatient: '',
            emailPatient: '',
            birthdayPatient: '',
            provincePatient: '',
            addressPatient: '',
            reason: '',
            timeBooking: '',
            dayBooking: ''
        };

    }

    async componentDidMount() {

        let listGenderAPI = await getAllCodeService('GENDER')
        this.setState({
            listGender: listGenderAPI.data
        })
        let listProvinceAPI = await getAllCodeService('PROVINCE')
        this.setState({
            listProvince: listProvinceAPI.data
        })
        // console.log('check state modal didmount: ', this.state)
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isOpenModal !== prevProps.isOpenModal) {
            this.setState({
                lastNamePatient: '',
                firstNamePatient: '',
                gerderPatient: '',
                phonePatient: '',
                emailPatient: '',
                birthdayPatient: '',
                provincePatient: '',
                addressPatient: '',
                reason: '',
                timeBooking: this.props.language === LANGUAGES.VI ? this.props.selectedTime.timeTypeData.valueVi : this.props.selectedTime.timeTypeData.valueEn,
                dayBooking: this.props.language === LANGUAGES.VI ? moment((this.props.selectedDay)).format('dddd - DD/MM') : moment((this.props.selectedDay)).locale('en').format('dddd - DD/MM')

            })
        }
    }

    handleOnChangeInput = (event, input) => {
        let copyState = { ...this.state };
        copyState[input] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleSaveInfoBooking = async () => {

        console.log('trước API ', this.state.timeBooking, '--', this.state.dayBooking)

        let response = await postInfoBooking({
            email: this.state.emailPatient,
            statusId: 'S1',
            doctorId: this.props.id,
            selectedDay: this.props.selectedDay,
            timeType: this.props.selectedTime.timeType,
            phoneNumber: this.state.phonePatient,
            gender: this.state.gerderPatient,
            firstName: this.state.firstNamePatient,
            lastName: this.state.lastNamePatient,
            timeBooking: this.state.timeBooking,
            dayBooking: this.state.dayBooking
        })
        console.log('sau API ', this.state.timeBooking, '--', this.state.dayBooking)

        if (response.errCode === 0) {
            toast.success('Save info booking succeed!')
        } else {
            toast.error('Save info booking failed!')

        }
        this.props.closeModalBooking()
        console.log('sau API, close modal ', this.state.timeBooking, '--', this.state.dayBooking)

    }
    handleSelectBirthdayPatient = (dateSelect) => {
        this.setState({
            birthdayPatient: new Date(dateSelect).getTime()
        })
    }


    render() {

        if (!this.props.isOpenModal) {
            return null;
        }
        let { language, selectedTime, selectedDay, intl, detailDoctor } = this.props;
        let { listGender, gerderPatient, listProvince, provincePatient, reason, addressPatient, birthdayPatient, timeBooking, dayBooking } = this.state;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        // timeBooking = language === LANGUAGES.VI ? selectedTime.timeTypeData.valueVi : selectedTime.timeTypeData.valueEn;
        // dayBooking = language === LANGUAGES.VI ? moment((selectedDay)).format('dddd - DD/MM') : moment((selectedDay)).locale('en').format('dddd - DD/MM');
        // let languageCalendar = language === LANGUAGE.VI ? Vietnamese : ''
        console.log('check state modal: ', this.state)
        console.log('check props modal: ', this.props)
        console.log('check thời gian đặt lịch: ', timeBooking, typeof timeBooking, '--', dayBooking, typeof dayBooking)
        return (
            <div className='booking-modal-container'>
                <Modal isOpen={this.props.isOpenModal} centered toggle={() => this.props.closeModalBooking()}>
                    <ModalHeader toggle={() => this.props.closeModalBooking()}>
                        <div className='title'><FormattedMessage id='menu.patient.book-appointment' /></div>
                    </ModalHeader>
                    <ModalBody>
                        <div className='header'>
                            <div className='content-left'>
                                <div className='content-image' style={{ backgroundImage: `url(${detailDoctor.image})` }}></div>

                            </div>
                            <div className='content-right'>
                                <div className='name-doctor'>
                                    {detailDoctor.positionData && detailDoctor.positionData.valueVi &&
                                        <span>
                                            {language === LANGUAGES.VI ? nameVi : nameEn}
                                        </span>
                                    }
                                </div>
                                <div className='time'>
                                    <i className="fas fa-calendar-alt"></i>
                                    <div className='selected-time'> {timeBooking} - {dayBooking}</div>
                                </div>
                                <div className='clinic'>
                                    <i class="fas fa-hospital"></i>
                                    <div className='name-clinic'>{detailDoctor.Doctor_Info.nameClinic}</div>
                                </div>
                                <div className='address'>
                                    <i class="fas fa-map-marker-alt"></i>
                                    <div className='address-clinic'>
                                        {detailDoctor.Doctor_Info.addressClinic}
                                    </div>
                                </div>
                                <div className='price'>
                                    <i class="fas fa-money-bill"></i>
                                    <div className='price-doctor'><FormattedMessage id='menu.patient.price' /> <b>{language === LANGUAGES.VI
                                        ? <NumericFormat
                                            value={detailDoctor.Doctor_Info.priceData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' VNĐ'}
                                        />
                                        : <NumericFormat
                                            value={detailDoctor.Doctor_Info.priceData.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' $'}
                                        />
                                    }</b>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-12 form group name-patient'>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fa fa-user"></i>
                                    </span>
                                    <input class="form-control"
                                        type="text"
                                        placeholder={intl.formatMessage({ id: 'menu.patient.lastName' })}
                                        value={this.state.lastNamePatient}
                                        onChange={(event) => this.handleOnChangeInput(event, 'lastNamePatient')}
                                    />
                                </div>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fa fa-user"></i>
                                    </span>
                                    <input class="form-control"
                                        type="text"
                                        placeholder={intl.formatMessage({ id: 'menu.patient.firstName' })}
                                        value={this.state.firstNamePatient}
                                        onChange={(event) => this.handleOnChangeInput(event, 'firstNamePatient')}
                                    />
                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fas fa-transgender"></i>
                                    </span>
                                    <select class="form-control"
                                        value={gerderPatient}
                                        onChange={(event) => this.handleOnChangeInput(event, 'gerderPatient')}>
                                        <option value="" disabled hidden>
                                            {intl.formatMessage({ id: 'menu.patient.gender' })}
                                        </option>
                                        {listGender && listGender.length > 0 &&
                                            listGender.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap} >
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fa fa-phone"></i>
                                    </span>
                                    <input class="form-control"
                                        type="text"
                                        placeholder={intl.formatMessage({ id: 'menu.patient.phone' })}
                                        value={this.state.phonePatient}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phonePatient')}
                                    />
                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fa fa-envelope"></i>
                                    </span>
                                    <input class="form-control"
                                        type="email"
                                        placeholder={intl.formatMessage({ id: 'menu.patient.email' })}
                                        value={this.state.emailPatient}
                                        onChange={(event) => this.handleOnChangeInput(event, 'emailPatient')} />

                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="input-group">

                                    <span class="input-group-text">
                                        <i class="fas fa-calendar-alt"></i>
                                    </span>
                                    <Flatpickr class="form-control flatpickr"
                                        style={{ background: 'none' }}
                                        placeholder={intl.formatMessage({ id: 'menu.patient.birthday' })}
                                        selected={birthdayPatient}
                                        options={{
                                            locale: language === LANGUAGES.VI ? Vietnamese : '',
                                            dateFormat: language === LANGUAGES.VI ? "d/m/Y" : 'm/d/Y'
                                        }}
                                        onChange={(dateSelect) => this.handleSelectBirthdayPatient(dateSelect)} />

                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </span>
                                    <select class="form-control"
                                        value={provincePatient}
                                        onChange={(event) => this.handleOnChangeInput(event, 'provincePatient')}>
                                        <option value="" disabled hidden>
                                            {intl.formatMessage({ id: 'menu.patient.province' })}
                                        </option>
                                        {listProvince && listProvince.length > 0 &&
                                            listProvince.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap} >
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </span>
                                    <input class="form-control"
                                        type="text"
                                        placeholder={intl.formatMessage({ id: 'menu.patient.address' })}
                                        value={addressPatient}
                                        onChange={(event) => this.handleOnChangeInput(event, 'addressPatient')} />
                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fas fa-plus-circle"></i>
                                    </span>
                                    <input class="form-control"
                                        type="text"
                                        placeholder={intl.formatMessage({ id: 'menu.patient.reason' })}
                                        value={reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')} />
                                </div>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleSaveInfoBooking()}>
                            Xác nhận
                        </Button>
                        <Button color="secondary" onClick={() => this.props.closeModalBooking()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div >
        );
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

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(BookingModal));
