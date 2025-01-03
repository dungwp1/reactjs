import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils';
import { getDoctorSchedule } from '../../../services/userService';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            availableTime: [],
            isOpenModalBooking: false,
            selectedTime: {},
            selectedDay: ''
            // selectedDay: 'Hôm nay' + moment(new Date()).format(' - DD/MM')
        }
    }

    async componentDidMount() {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (this.props.language === LANGUAGES.VI) {
                if (i !== 0) {
                    object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                } else {
                    object.label = moment(new Date()).format(' - DD/MM');
                    object.label = 'Hôm nay' + object.label;
                }
            } else {
                if (i !== 0) {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                } else {
                    object.label = moment(new Date()).locale('en').format(' - DD/MM');
                    object.label = 'Today' + object.label;
                }
            }
            let date = new Date();
            date.setDate(date.getDate() + i);
            date.setHours(0, 0, 0, 0);
            object.value = date.getTime()
            arrDate.push(object)
        }
        // console.log('check arrDate: ', arrDate)
        // console.log('check ngày đầu doctorId: ', id)
        console.log('check ngày đầu arrDate[0].value: ', arrDate[0].value, typeof arrDate[0].value)
        let response = await getDoctorSchedule(this.props.id, arrDate[0].value)
        console.log('check ngày đầu: ', response)
        this.setState({
            allDays: arrDate,
            availableTime: response.data,
            selectedDay: arrDate[0].value
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let arrDate = [];
            for (let i = 0; i < 7; i++) {
                let object = {};
                if (this.props.language === LANGUAGES.VI) {
                    if (i !== 0) {
                        object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    } else {
                        object.label = moment(new Date()).format(' - DD/MM');
                        object.label = 'Hôm nay' + object.label;
                    }
                } else {
                    if (i !== 0) {
                        object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                    } else {
                        object.label = moment(new Date()).locale('en').format(' - DD/MM');
                        object.label = 'Today' + object.label;
                    }
                }
                let date = new Date();
                date.setDate(date.getDate() + i);
                date.setHours(0, 0, 0, 0);
                object.value = date.getTime()
                arrDate.push(object)
            }
            // console.log('check arrDate: ', arrDate)
            this.setState({
                allDays: arrDate
            })
        }
    }

    handleSelectDay = async (selectedDay) => {
        // console.log('check selected day: ', moment(selectedDay.target.value).format('dddd - DD/MM'))
        let date = Number(selectedDay.target.value);
        // console.log('check selected day: ', moment((date)).format('dddd - DD/MM'))
        let { id } = this.props;
        // console.log('check date: ', date, typeof date)
        // console.log('check doctorId: ', id)


        let response = await getDoctorSchedule(id, date)
        // console.log('check getDoctorSchedule response: ', response)
        this.setState({
            availableTime: response.data,
            selectedDay: date
        })
        // console.log('check availableTime: ', this.state.availableTime)
        // console.log('check selectedDay: ', this.state.selectedDay)
    }

    handleSelectTime = (selectedTime) => {
        // console.log('check selected time: ', selectedTime)
        this.setState({
            selectedTime: selectedTime,
            isOpenModalBooking: true
        })
    }

    closeModalBooking = () => {
        this.setState({
            isOpenModalBooking: !this.state.isOpenModalBooking
        })
    }

    render() {
        console.log('check state doctorschedule: ', this.state)
        const { availableTime, allDays } = this.state;
        const { language, id } = this.props
        // console.log('check doctorschedule doctorId: ', id)
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select
                            className='select-day'
                            onChange={(event) => this.handleSelectDay(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>
                                            {item.label}
                                        </option>
                                    )
                                })}
                        </select>
                        <div className='text-calendar'>
                            <span><i class="fas fa-calendar-alt"></i> LỊCH KHÁM</span>
                        </div>
                        <div className='time-content'>
                            {availableTime && availableTime.length > 0 ?
                                (availableTime.map((item, index) => {
                                    return (
                                        <button onClick={() => this.handleSelectTime(item)} key={index}>
                                            {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                        </button>
                                    )
                                }))
                                : <div>Không có lịch hẹn trong khoảng thời gian này, vui lòng chọn thời gian khác!</div>
                            }
                        </div>
                        <div className='contact'>
                            <span>
                                {availableTime && availableTime.length > 0 ? (
                                    <>
                                        Chọn <i class="far fa-hand-point-up"></i> và đặt (Phí đặt lịch 0đ)
                                    </>
                                ) : (``)}
                            </span>

                        </div>
                    </div>
                    <div className='all-available'></div>
                </div >
                <BookingModal
                    id={id}
                    selectedTime={this.state.selectedTime}
                    selectedDay={this.state.selectedDay}
                    detailDoctor={this.props.detailDoctor}
                    isOpenModal={this.state.isOpenModalBooking}
                    closeModalBooking={() => this.closeModalBooking()} />
            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
