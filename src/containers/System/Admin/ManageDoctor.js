import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManageDoctor.scss'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            doctorId: '',
            description: '',
            arrDoctors: ''
        }
    }

    componentDidMount() {
        this.props.loadAllDoctors();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.allDoctorsRedux
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        console.log('check btn save detail', this.state)
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value
        })


    }


    handleChange = (selectedDoctor) => {
        console.log('check selectedDoctor: ', selectedDoctor)
        this.setState({
            selectedDoctor
        }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
    }

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
        console.log(this.state.description)
    }

    render() {
        let language = this.props.language;
        let arrDoctors = this.state.arrDoctors;
        console.log('check arrdoctors: ', this.state.arrDoctors)
        console.log('check state: ', this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title title'>Manage Doctor</div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={(event) => this.handleChange(event)}
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
                    <div className='content-right'>
                        <label>Thông tin giới thiệu</label>
                        <textarea
                            className='form-control'
                            rows='4'
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}>
                        </textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
                </div>
                <button
                    className='save-content-doctor btn-primary'
                    onClick={() => this.handleSaveContentMarkdown()}>
                    Lưu thông tin
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctorsRedux: state.admin.doctors

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
