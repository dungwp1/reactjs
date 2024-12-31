import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss'
import 'react-markdown-editor-lite/lib/index.css';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { getDetailInfoDoctor } from '../../../services/userService';
import * as actions from '../../../store/actions';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import { saveBulkScheduleDoctor } from '../../../services/userService';




class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: '',
            arrDoctors: '',
            currentDate: '',
            rangeTime: [],
        }
    }

    componentDidMount() {
        this.props.loadAllDoctors();
        this.props.fetchAllcodeScheduleTime();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.allDoctorsRedux
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    handleChangeSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        // let res = await getDetailInfoDoctor(selectedDoctor.value);
        // if (res && res.errCode === 0 && res.data) {
        //     this.setState({
        //     })
        // }
    }

    handleOnchangeDatePicker = (date) => {
        console.log('check select date: ', date);
        date.setHours(0, 0, 0, 0);
        console.log('check select date: ', date, typeof date);
        console.log('check format  date: ', date.getTime(), typeof date.getTime());
        this.setState({
            currentDate: date.getTime()
        })
    }

    handleSelectedTime = (inputTime) => {
        let { rangeTime } = this.state;
        rangeTime.map(item => {
            if (item.id === inputTime.id) {
                item.isSelected = !item.isSelected
            }
            return item;
        })
        this.setState({
            rangeTime: rangeTime
        })
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!selectedDoctor) {
            toast.error('Please input valid doctor!')
            return
        }
        if (!currentDate) {
            toast.error('Please input valid date!')
            return
        }
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let obj = {};
                    obj.doctorId = selectedDoctor.value;
                    obj.date = currentDate;
                    obj.timeType = item.keyMap
                    result.push(obj)
                })
            } else {
                toast.error('Please input selected time!')
                return
            }
        }

        let response = await saveBulkScheduleDoctor({
            data: result,
            doctorId: selectedDoctor.value,
            date: currentDate
        })
        if (response.errCode === 0) {
            toast.success('Save schedule doctor succeed!')
        } else {
            toast.error('Save schedule doctor failed!')

        }

        console.log('check response: ', response)
    }


    render() {
        console.log("check state: ", this.state)
        // console.log("check props: ", this.props)
        let { language, allScheduleTime } = this.props;
        let { arrDoctors, rangeTime } = this.state;
        console.log("check rangeTime: ", rangeTime)



        return (
            <div className='manage-schedule-container'>
                <div className='row'>
                    <div className='m-s-title title col-12'>
                        <FormattedMessage id='manage-schedule.title' />
                    </div>
                    <div className='form-group col-8'>
                        <label><FormattedMessage id='manage-schedule.choose-doctor' /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={(event) => this.handleChangeSelectDoctor(event)}
                            options=
                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item) => {
                                    let labelEn = `${item.firstName} ${item.lastName}`;
                                    let labelVi = `${item.lastName} ${item.firstName}`;
                                    return {
                                        value: item.id,
                                        label: language === LANGUAGES.VI ? labelVi : labelEn
                                    }
                                })}
                        />
                        <div className='pick-hour-container'>
                            <label><FormattedMessage id='manage-schedule.choose-range-time' /></label>
                            <div className='range-time'>
                                {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? 'btn btn-warning ' : 'btn btn-outline-secondary'} key={index} onClick={() => this.handleSelectedTime(item)}>
                                            {item.valueVi}
                                        </button>
                                    )
                                })}
                            </div>
                            <div className='save-btn'>
                                <button className='btn btn-primary' onClick={() => this.handleSaveSchedule()}><FormattedMessage id='manage-schedule.save' /></button>
                            </div>
                        </div>
                    </div>
                    <div className='form-group col-4'>
                        <label><FormattedMessage id='manage-schedule.choose-date' /></label>
                        <Calendar
                            minDate={new Date()}
                            onChange={(date) => this.handleOnchangeDatePicker(date)} />
                    </div>


                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctorsRedux: state.admin.doctors,
        allScheduleTime: state.admin.allScheduleTime

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllcodeScheduleTime: () => dispatch(actions.fetchAllcodeScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
