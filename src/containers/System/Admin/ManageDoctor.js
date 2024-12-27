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
import { every } from 'lodash';
import { getDetailInfoDoctor } from '../../../services/userService';


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
            arrDoctors: '',
            isOldData: ''

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


    handleChangeSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInfoDoctor(selectedDoctor.value);

        if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.contentMarkdown
            && res.data.Markdown.contentHTML && res.data.Markdown.description) {
            this.setState({
                contentMarkdown: res.data.Markdown.contentMarkdown,
                contentHTML: res.data.Markdown.contentHTML,
                description: res.data.Markdown.description,
                isOldData: true
            })
        }
        else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                isOldData: false
            });
        }
        console.log('check state sau khi select bac sĩ: ', this.state)
        console.log('check isOldData: ', this.state.isOldData)
    }

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
        console.log(this.state.description)
    }

    render() {
        let language = this.props.language;
        let { arrDoctors, isOldData } = this.state;
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
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>
                <button
                    className={isOldData === true ? 'save-content-doctor btn-warning' : 'save-content-doctor btn-primary'}
                    // className='save-content-doctor btn-primary'
                    onClick={() => this.handleSaveContentMarkdown()}>
                    {isOldData === true ? 'Cập nhật thông tin' : 'Tạo thông tin'}
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
