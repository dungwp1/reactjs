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
            doctorId: '',
            description: '',
            listDoctors: [],
            selectedDoctor: '',
            isOldData: false,
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',


        }
    }

    componentDidMount() {
        this.props.loadAllDoctors();
        this.props.getDoctorPrice();
        this.props.getPaymentMethod();
        this.props.getProvince();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            this.setState({
                listDoctors: this.props.allDoctorsRedux
            })
        }
        if (prevProps.priceDoctorRedux !== this.props.priceDoctorRedux) {
            this.setState({
                listPrice: this.props.priceDoctorRedux
            })
        }
        if (prevProps.paymentMethodRedux !== this.props.paymentMethodRedux) {
            this.setState({
                listPayment: this.props.paymentMethodRedux
            })
        }
        if (prevProps.provinceRedux !== this.props.provinceRedux) {
            this.setState({
                listProvince: this.props.provinceRedux
            })
        }
    }

    builDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map(item => {
                let object = {};
                let labelEn = `${item.firstName} ${item.lastName}`;
                let labelVi = `${item.lastName} ${item.firstName}`;
                object.value = item.id;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                result.push(object);
            })
        }
        console.log('check builDataInputSelect: result: ', result)
        return result;
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

    handleChangePrice = async (selectedPrice) => {
        this.setState({ selectedPrice });
    }

    handleChangePaymentMethod = async (selectedPayment) => {
        this.setState({ selectedPayment });
    }

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
        console.log(this.state.description)
    }

    render() {
        let language = this.props.language;
        let { listDoctors, isOldData, listPrice, listPayment, listProvince } = this.state;
        console.log('check arrdoctors: ', this.state.listDoctors)
        console.log('check state: ', this.state)
        console.log('check props: ', this.props)
        console.log('check listPrice: ', listPrice)
        console.log('check state listDoctors: ', listDoctors)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title title'><FormattedMessage id='admin.manage-doctor.title' /></div>
                <div className='more-info'>
                    <div className='content-left'>
                        <label><FormattedMessage id='admin.manage-doctor.select-doctor' /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={(event) => this.handleChangeSelectDoctor(event)}
                            placeholder={language === LANGUAGES.VI ? 'Chọn bác sĩ' : 'Select doctor'}
                            // options={listDoctors}
                            options=
                            {listDoctors && listDoctors.length > 0 &&
                                listDoctors.map((item) => {
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
                        <label><FormattedMessage id='admin.manage-doctor.about' /></label>
                        <textarea
                            className='form-control'
                            rows='4'
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}>
                        </textarea>
                    </div>
                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form group'>
                        <label>{language === LANGUAGES.VI ? 'Giá khám' : 'Price'}</label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={(event) => this.handleChangePrice(event)}
                            placeholder={language === LANGUAGES.VI ? 'Chọn giá khám' : 'Select price'}
                            options=
                            {listPrice && listPrice.length > 0 &&
                                listPrice.map((item) => {
                                    return {
                                        value: item.keyMap,
                                        label: language === LANGUAGES.VI ? item.valueVi + ` VND` : item.valueEn + ` USD`
                                    }
                                })}
                        />
                    </div>
                    <div className='col-4 form group'>
                        <label>{language === LANGUAGES.VI ? 'Phương thức thanh toán' : 'Payment method'}</label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={(event) => this.handleChangePaymentMethod(event)}
                            placeholder={language === LANGUAGES.VI ? 'Chọn phương thức thanh toán' : 'Select payment method'}
                            options=
                            {listPayment && listPayment.length > 0 &&
                                listPayment.map((item) => {
                                    return {
                                        value: item.keyMap,
                                        label: language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                    }
                                })}
                        />
                    </div>
                    <div className='col-4 form group'>
                        <label>{language === LANGUAGES.VI ? 'Tỉnh thành' : 'Province'}</label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={(event) => this.handleChangePaymentMethod(event)}
                            placeholder={language === LANGUAGES.VI ? 'Chọn tỉnh thành' : 'Select province'}
                            options=
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item) => {
                                    return {
                                        value: item.keyMap,
                                        label: language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                    }
                                })}
                        />
                    </div>
                    <div className='col-4 form group'>
                        <label>Tên phòng khám</label>
                        <select className='form-control' />
                    </div>
                    <div className='col-4 form group'>
                        <label>Địa chỉ phòng khám</label>
                        <select className='form-control' />
                    </div>
                    <div className='col-4 form group'>
                        <label>Note</label>
                        <input className='form-control' />
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
                    onClick={() => this.handleSaveContentMarkdown()}>
                    {isOldData === true ? <FormattedMessage id='admin.manage-doctor.update' /> : <FormattedMessage id='admin.manage-doctor.create' />}
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctorsRedux: state.admin.doctors,
        priceDoctorRedux: state.admin.doctorPrice,
        paymentMethodRedux: state.admin.paymentMethod,
        provinceRedux: state.admin.provinces


    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getDoctorPrice: () => dispatch(actions.fetchDoctorPrice()),
        getPaymentMethod: () => dispatch(actions.fetchPaymentMethod()),
        getProvince: () => dispatch(actions.fetchProvince()),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
