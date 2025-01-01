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

    handleChangeSelectDoctor = async (selectedDoctor) => {
        let { language } = this.props;
        this.setState({ selectedDoctor, doctorId: selectedDoctor.value });
        let res = await getDetailInfoDoctor(selectedDoctor.value);
        let formatPrice = {};
        formatPrice.value = res.data.Doctor_Info.priceId;
        formatPrice.label = language === LANGUAGES.VI ? res.data.Doctor_Info.priceData.valueVi : res.data.Doctor_Info.priceData.valueEn

        let formatPayment = {};
        formatPayment.value = res.data.Doctor_Info.paymentId;
        formatPayment.label = language === LANGUAGES.VI ? res.data.Doctor_Info.paymentData.valueVi : res.data.Doctor_Info.paymentData.valueEn

        let formatProvince = {};
        formatProvince.value = res.data.Doctor_Info.provinceId;
        formatProvince.label = language === LANGUAGES.VI ? res.data.Doctor_Info.provinceData.valueVi : res.data.Doctor_Info.provinceData.valueEn

        console.log('check format price: ', formatPrice)

        console.log('chcek res', res)
        if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Markdown.contentMarkdown
            && res.data.Markdown.contentHTML && res.data.Markdown.description
            && res.data.Doctor_Info.nameClinic && res.data.Doctor_Info.addressClinic && res.data.Doctor_Info.note) {
            // if (res && res.errCode === 0) {
            this.setState({
                contentMarkdown: res.data.Markdown.contentMarkdown,
                contentHTML: res.data.Markdown.contentHTML,
                description: res.data.Markdown.description,
                selectedPrice: formatPrice,
                selectedPayment: formatPayment,
                selectedProvince: formatProvince,
                nameClinic: res.data.Doctor_Info.nameClinic,
                addressClinic: res.data.Doctor_Info.addressClinic,
                note: res.data.Doctor_Info.note,
                isOldData: true
            })
        }
        else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                nameClinic: '',
                addressClinic: '',
                note: '',
                isOldData: false
            });
        }
    }

    handleChangePrice = async (selectedPrice) => {
        this.setState({ selectedPrice });
        console.log('check selectedPrice: ', selectedPrice)
    }

    handleChangePaymentMethod = async (selectedPayment) => {
        this.setState({ selectedPayment });
        console.log('check : selectedPayment', selectedPayment)

    }
    handleChangeProvince = async (selectedProvince) => {
        this.setState({ selectedProvince });
        console.log('check : selectedProvince', selectedProvince)

    }

    handleOnChangeText = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
        console.log('check handleonchangetext: ', copyState[id])
    }

    handleSaveContentMarkdown = () => {
        console.log('check btn save detail', this.state)
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.doctorId,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        })
    }

    render() {
        let language = this.props.language;
        let { listDoctors, isOldData, listPrice, listPayment, listProvince } = this.state;
        console.log('check state: ', this.state)
        console.log('check props: ', this.props)
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
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}>
                        </textarea>
                    </div>
                </div>
                <div className='more-info-extra row'>
                    <div className='col-4 form group'>
                        <label><FormattedMessage id='admin.manage-doctor.price' /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={(event) => this.handleChangePrice(event)}
                            placeholder={language === LANGUAGES.VI ? 'Chọn giá khám' : 'Select price'}
                            options=
                            {listPrice && listPrice.length > 0 &&
                                listPrice.map((item) => {
                                    return {
                                        value: item.keyMap,
                                        label: language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                    }
                                })}
                        />
                    </div>
                    <div className='col-4 form group'>
                        <label><FormattedMessage id='admin.manage-doctor.payment-method' /></label>
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
                        <label><FormattedMessage id='admin.manage-doctor.province' /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={(event) => this.handleChangeProvince(event)}
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
                        <label><FormattedMessage id='admin.manage-doctor.clinic' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic} />
                    </div>
                    <div className='col-4 form group'>
                        <label><FormattedMessage id='admin.manage-doctor.address-clinic' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic} />
                    </div>
                    <div className='col-4 form group'>
                        <label><FormattedMessage id='admin.manage-doctor.note' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note} />
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
