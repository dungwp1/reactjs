import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { getDetailInfoDoctor } from '../../../../services/userService';
import { getFullInfoBooking } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import { NumericFormat } from 'react-number-format';
import moment from 'moment';
import { getAllCodeService, postInfoBooking } from '../../../../services/userService';
import { toast } from 'react-toastify';
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/flatpickr.css';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infoDoctorBooking: '',
            listGender: '',
            listProvince: '',
            namePatient: '',
            gerderPatient: '',
            phonePatient: '',
            emailPatient: '',
            lastNamePatient: '',
            firstNamePatient: '',
            provincePatient: '',
            reason: '',
            addressPatient: '',
            birthdayPatient: '',
        };

    }

    async componentDidMount() {
        let listGenderAPI = await getAllCodeService('GENDER')
        console.log('check listGenderAPI: ', listGenderAPI.data)
        this.setState({
            listGender: listGenderAPI.data
        })
        let listProvinceAPI = await getAllCodeService('PROVINCE')
        console.log('check listProvinceAPI: ', listProvinceAPI.data)
        this.setState({
            listProvince: listProvinceAPI.data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('check infoDoctorBooking res: ', this.props.detailDoctor);
        if (this.props.isOpenModal !== prevProps.isOpenModal) {
            this.setState({
                namePatient: '',
                gerderPatient: '',
                phonePatient: '',
                emailPatient: '',
                lastNamePatient: '',
                firstNamePatient: '',
                provincePatient: '',
                reason: '',
                addressPatient: '',
                birthdayPatient: '',

            })
        }
        if (this.props.detailDoctor !== prevProps.detailDoctor) {
            this.setState({
                infoDoctorBooking: this.props.detailDoctor
            })
        }
    }

    handleOnChangeInput = (event, input) => {
        console.log('check event: ', event.target.value, input)
        let copyState = { ...this.state };
        copyState[input] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleSaveInfoBooking = async () => {
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
        })
        if (response.errCode === 0) {
            toast.success('Save info booking succeed!')
        } else {
            toast.error('Save info booking failed!')

        }
        this.props.closeModalBooking()
        console.log('check response API postInfoBooking: ', response)
    }
    handleSelectBirthdayPatient = (dateSelect) => {
        console.log('check dateSelect: ', dateSelect)
        this.setState({
            birthdayPatient: new Date(dateSelect).getTime()
        })
    }


    render() {
        if (!this.props.isOpenModal) {
            return null;
        }
        let { language, selectedTime, selectedDay } = this.props;
        let { infoDoctorBooking, listGender, gerderPatient, listProvince, provincePatient, reason, addressPatient, birthdayPatient } = this.state;
        let nameVi = '', nameEn = '';
        if (infoDoctorBooking && infoDoctorBooking.positionData) {
            nameVi = `${infoDoctorBooking.positionData.valueVi}, ${infoDoctorBooking.lastName} ${infoDoctorBooking.firstName}`;
            nameEn = `${infoDoctorBooking.positionData.valueEn}, ${infoDoctorBooking.firstName} ${infoDoctorBooking.lastName}`;
        }
        let timeBooking = language === LANGUAGES.VI ? selectedTime.timeTypeData.valueVi : selectedTime.timeTypeData.valueEn;
        let dayBooking = language === LANGUAGES.VI ? moment((selectedDay)).format('dddd - DD/MM') : moment((selectedDay)).locale('en').format('dddd - DD/MM');
        // let languageCalendar = language === LANGUAGE.VI ? Vietnamese : ''
        console.log('check state modal: ', this.state)
        console.log('check props modal: ', this.props)
        return (
            <div className='booking-modal-container'>
                <Modal isOpen={this.props.isOpenModal} centered>
                    <ModalHeader toggle={() => this.props.closeModalBooking()}>
                        <div className='title'>Đặt lịch khám</div>
                    </ModalHeader>
                    <ModalBody>
                        <div className='header'>
                            <div className='content-left'>
                                <div className='content-image' style={{ backgroundImage: `url(${infoDoctorBooking.image})` }}></div>

                            </div>
                            <div className='content-right'>
                                <div className='name-doctor'>
                                    {infoDoctorBooking.positionData && infoDoctorBooking.positionData.valueVi &&
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
                                    <div className='name-clinic'>{infoDoctorBooking.Doctor_Info.nameClinic}</div>
                                </div>
                                <div className='address'>
                                    <i class="fas"></i>
                                    <div className='address-clinic'>
                                        {infoDoctorBooking.Doctor_Info.addressClinic}
                                    </div>
                                </div>
                                <div className='price'>
                                    <i class="fas fa-money-bill"></i>
                                    <div className='price-doctor'>Giá khám: {language === LANGUAGES.VI
                                        ? <NumericFormat
                                            value={infoDoctorBooking.Doctor_Info.priceData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' VNĐ'}
                                        />
                                        : <NumericFormat
                                            value={infoDoctorBooking.Doctor_Info.priceData.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' $'}
                                        />
                                    }
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
                                        placeholder="Họ (bắt buộc)"
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
                                        placeholder="Tên (bắt buộc)"
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
                                        <option value="" disabled selected >{language === LANGUAGES.VI ? 'Chọn giới tính' : 'Select gender'}</option>
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
                                        placeholder="Số điện thoại liên hệ (bắt buộc)"
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
                                        placeholder="Địa chỉ email"
                                        value={this.state.emailPatient}
                                        onChange={(event) => this.handleOnChangeInput(event, 'emailPatient')} />

                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="input-group">

                                    <span class="input-group-text">
                                        <i class="fas fa-calendar-alt"></i>
                                    </span>
                                    <Flatpickr class="form-control flatpickr" style={{ background: 'none' }} placeholder="Ngày tháng năm sinh (bắt buộc)"
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
                                        <option value="" disabled selected >{language === LANGUAGES.VI ? 'Chọn tỉnh/thành' : 'Select province'}</option>
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
                                        placeholder="Địa chỉ"
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
                                        placeholder="Lý do khám"
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
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
