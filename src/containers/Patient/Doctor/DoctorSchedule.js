import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils';
import { getDoctorSchedule } from '../../../services/userService';
import moment from 'moment';
import localization from 'moment/locale/vi'


class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            selectedOption: '',
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
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
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
                    object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
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

    handleChange = (selectedOption) => {
        this.setState({
            selectedOption
        })
    }
    handleSelectDay = async (selectedDay) => {
        let date = selectedDay.target.value;
        let doctorId = this.props.doctorId;
        console.log('check date: ', date)
        console.log('check doctorId: ', doctorId)


        let response = await getDoctorSchedule(doctorId, date)
        console.log('check response: ', response)

    }


    render() {
        console.log('check state: ', this.state)
        const { selectedOption, allDays } = this.state;
        const { language } = this.props

        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select
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
