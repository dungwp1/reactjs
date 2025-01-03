import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { getDetailInfoDoctor } from '../../../../services/userService';
import { getFullInfoBooking } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import { NumericFormat } from 'react-number-format';
import moment from 'moment';



class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infoDoctorBooking: '',
        };

    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('check infoDoctorBooking res: ', this.props.detailDoctor);

        if (this.props.detailDoctor !== prevProps.detailDoctor) {
            this.setState({
                infoDoctorBooking: this.props.detailDoctor
            })
        }
    }



    render() {
        if (!this.props.isOpenModal) {
            return null;
        }
        let { language, selectedTime, selectedDay } = this.props;
        let { infoDoctorBooking } = this.state;
        let nameVi = '', nameEn = '';
        if (infoDoctorBooking && infoDoctorBooking.positionData) {
            nameVi = `${infoDoctorBooking.positionData.valueVi}, ${infoDoctorBooking.lastName} ${infoDoctorBooking.firstName}`;
            nameEn = `${infoDoctorBooking.positionData.valueEn}, ${infoDoctorBooking.firstName} ${infoDoctorBooking.lastName}`;
        }
        let timeBooking = language === LANGUAGES.VI ? selectedTime.timeTypeData.valueVi : selectedTime.timeTypeData.valueEn;
        let dayBooking = language === LANGUAGES.VI ? moment((selectedDay)).format('dddd - DD/MM') : moment((selectedDay)).locale('en').format('dddd - DD/MM');
        console.log('check props, state modal: ', this.props, this.state)
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
                            <div className='col-12 form group'>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fa fa-user"></i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="Họ và tên (bắt buộc)" />
                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="form-check-inline">
                                    <label class="form-check-label">
                                        <input type="radio" class="form-check-input" name="optradio" />Nam
                                    </label>
                                </div>
                                <div class="form-check-inline">
                                    <label class="form-check-label">
                                        <input type="radio" class="form-check-input" name="optradio" />Nữ
                                    </label>
                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fa fa-phone"></i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="Số điện thoại liên hệ (bắt buộc)" />
                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fa fa-envelope"></i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="Địa chỉ email" />
                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fas fa-calendar-alt"></i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="Ngày tháng năm sinh (bắt buộc)" />
                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </span>
                                    <select class="form-control">
                                        <option value="" disabled selected >-- Chọn Tỉnh/Thành --</option>
                                        <option value="1">All</option>
                                        <option value="2">Active</option>
                                        <option value="3">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </span>
                                    <select class="form-control">
                                        <option value="" disabled selected >-- Chọn Quận/Huyện --</option>
                                        <option value="1">All</option>
                                        <option value="2">Active</option>
                                        <option value="3">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="Địa chỉ" />
                                </div>
                            </div>
                            <div className='col-12 form group'>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fas fa-plus-circle"></i>
                                    </span>
                                    <input type="text" class="form-control" placeholder="Lý do khám" />
                                </div>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={true}>
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
