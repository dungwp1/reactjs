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




class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: '',
            arrDoctors: '',
            currentDate: new Date().toLocaleDateString('en-GB'),
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
            this.setState({
                rangeTime: this.props.allScheduleTime
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
        console.log('check select date', date);
        console.log('check format  date', date.toLocaleDateString('en-GB'));
        this.setState({
            currentDate: date.toLocaleDateString('en-GB')
        })
    }

    handleonClick = (inputClick) => {
        console.log('đã click: inputClick: ', inputClick)
    }

    render() {
        console.log("check state: ", this.state)
        // console.log("check props: ", this.props)
        let { language, allScheduleTime } = this.props;
        let { arrDoctors, rangeTime } = this.state;


        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='row'>
                    <div className='form-group col-6'>
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
                    </div>
                    <div className='form-group col-6'>
                        <label><FormattedMessage id='manage-schedule.choose-date' /></label>
                        <Calendar
                            minDate={new Date()}
                            onChange={(date) => this.handleOnchangeDatePicker(date)} />
                    </div>
                    <div className='col-12 pick-hour-container'>
                        {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                            return (
                                <button className='btn btn-outline-secondary' key={index} onClick={() => this.handleonClick(item.valueEn)}>
                                    {item.valueEn}
                                </button>
                            )
                        })}
                    </div>
                    <div className='col-12'>
                        <button className='btn btn-primary'><FormattedMessage id='manage-schedule.save' /></button>
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
