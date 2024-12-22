import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss'
import 'react-markdown-editor-lite/lib/index.css';



class ManageSchedule extends Component {



    componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    render() {
        return (
            <div className='manage-schedule-container'>
                <span>hello</span>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
