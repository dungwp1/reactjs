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
        let timeVi = moment(new Date()).format('dddd - DD/MM');
        let timeEn = moment(new Date()).locale('en').format('dddd - DD/MM');
        console.log('check format timeVi: ', timeVi)
        console.log('check format timeEn: ', timeEn)
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (this.props.language === LANGUAGES.VI) {
                let formatLabel = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(formatLabel);
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
            }
            let date = new Date();
            date.setDate(date.getDate() + i);
            date.setHours(0, 0, 0, 0);
            object.value = date.toISOString()
            arrDate.push(object)
        }
        console.log('check arrDate: ', arrDate)
        this.setState({
            allDays: arrDate
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let arrDate = [];
            for (let i = 0; i < 7; i++) {
                let object = {};
                if (this.props.language === LANGUAGES.VI) {
                    let formatLabel = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(formatLabel);
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                }
                let date = new Date();
                date.setDate(date.getDate() + i);
                date.setHours(0, 0, 0, 0);
                object.value = date.toISOString()
                arrDate.push(object)
            }
            console.log('check arrDate: ', arrDate)
            this.setState({
                allDays: arrDate
            })
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
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
                        {selectedOption && selectedOption.length > 0
                            ? selectedOption.map((item, index) => {
                                return (
                                    <button key={index}>
                                        {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                    </button>
                                )
                            })
                            : <div>Không có lịch hẹn trong khoảng thời gian này, vui lòng chọn thời gian khác!</div>
                        }
                    </div>
                </div>
                <div className='all-available'>

                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
