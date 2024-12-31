import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils';
import { getDoctorSchedule } from '../../../services/userService';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            selectedOption: [],
        }
    }

    async componentDidMount() {
        let timeVi = moment(new Date()).format(' - DD/MM');
        timeVi = 'Hôm nay' + timeVi;
        let timeEn = moment(new Date()).locale('en').format('dddd - DD/MM');
        console.log('check format timeVi: ', timeVi)
        console.log('check format timeEn: ', timeEn)
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (this.props.language === LANGUAGES.VI) {
                if (i !== 0) {
                    object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                } else {
                    object.label = moment(new Date()).add(i, 'days').format(' - DD/MM');
                    object.label = 'Hôm nay' + object.label;
                }
            } else {
                if (i !== 0) {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format(' - DD/MM');
                    object.label = 'Today' + object.label;
                }
            }
            let date = new Date();
            date.setDate(date.getDate() + i);
            date.setHours(0, 0, 0, 0);
            object.value = date.getTime()
            arrDate.push(object)
        }
        console.log('check arrDate: ', arrDate)
        console.log('check ngày đầu doctorId: ', this.props.doctorId)
        console.log('check ngày đầu date: ', arrDate[0].value)
        let response = await getDoctorSchedule(this.props.doctorId, arrDate[0].value)
        console.log('check ngày đầu: ', response)
        this.setState({
            allDays: arrDate,
            selectedOption: response.data,
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
                        object.label = moment(new Date()).add(i, 'days').format(' - DD/MM');
                        object.label = 'Hôm nay' + object.label;
                    }
                } else {
                    if (i !== 0) {
                        object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                    } else {
                        object.label = moment(new Date()).add(i, 'days').locale('en').format(' - DD/MM');
                        object.label = 'Today' + object.label;
                    }
                }
                let date = new Date();
                date.setDate(date.getDate() + i);
                date.setHours(0, 0, 0, 0);
                object.value = date.getTime()
                arrDate.push(object)
            }
            console.log('check arrDate: ', arrDate)
            this.setState({
                allDays: arrDate
            })
        }
    }

    handleSelectDay = async (selectedDay) => {
        let date = selectedDay.target.value;
        let doctorId = this.props.doctorId;
        console.log('check date: ', date)
        console.log('check doctorId: ', doctorId)


        let response = await getDoctorSchedule(doctorId, date)
        console.log('check response: ', response)
        this.setState({
            selectedOption: response.data,
        })
        console.log('check selectedOption: ', this.state.selectedOption)
    }


    render() {
        console.log('check state: ', this.state)
        const { selectedOption, allDays } = this.state;
        const { language } = this.props

        return (
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
                        {selectedOption && selectedOption.length > 0 ?
                            (selectedOption.map((item, index) => {
                                return (
                                    <button key={index}>
                                        {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                    </button>
                                )
                            }))
                            : <div>Không có lịch hẹn trong khoảng thời gian này, vui lòng chọn thời gian khác!</div>
                        }
                    </div>
                    <div className='contact'>
                        <span>
                            {selectedOption && selectedOption.length > 0 ? (
                                <>
                                    Chọn <i class="far fa-hand-point-up"></i> và đặt (Phí đặt lịch 0đ)
                                </>
                            ) : (``)}
                        </span>

                    </div>
                </div>
                <div className='all-available'>

                </div>

            </div >
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
