import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from './DoctorSchedule';
import './DetailDoctor.scss';
import { LANGUAGES } from '../../../utils';
import DoctorExtraInfo from './DoctorExtraInfo';
import { getDetailInfoDoctor } from '../../../services/userService';


class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailInfoDoctor(id)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }



    render() {
        // console.log(this.props.match.params.id);
        // console.log("check state detail doctor: ", this.state);
        let { detailDoctor } = this.state;
        let language = this.props.language;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        return (
            <Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'>
                            <div className='content-image' style={{ backgroundImage: `url(${detailDoctor.image})` }}></div>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {detailDoctor.positionData && detailDoctor.positionData.valueVi &&
                                    <span>
                                        {language === LANGUAGES.VI ? nameVi : nameEn}
                                    </span>
                                }
                            </div>
                            <div className='down'>
                                {detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }

                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                id={this.props.match.params.id}
                                detailDoctor={detailDoctor}
                            />
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfo
                                id={this.props.match.params.id}
                                detailDoctor={detailDoctor}
                            />

                        </div>
                    </div>
                    <div className='section-detail-info-doctor'>
                        <div className='detail-info-doctor'>
                            {detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                                <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>
                                </div>
                            }
                        </div>
                        <div className='comment-doctor'>

                        </div>
                    </div>
                </div>
            </Fragment>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
