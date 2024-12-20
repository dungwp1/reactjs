import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss'
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class MedicalFacility extends Component {


    render() {
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><b>Cơ sở y tế nổi bật</b></span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='img-customize'>
                                <div className='bg-image section-medical-facility'> </div>
                                <div>Cơ sở 1</div>
                            </div>
                            <div className='img-customize'>
                                <div className='bg-image section-medical-facility'> </div>
                                <div>Cơ sở 2</div>
                            </div>
                            <div className='img-customize'>
                                <div className='bg-image section-medical-facility'> </div>
                                <div>Cơ sở 3</div>
                            </div>
                            <div className='img-customize'>
                                <div className='bg-image section-medical-facility'> </div>
                                <div>Cơ sở 4</div>
                            </div>
                            <div className='img-customize'>
                                <div className='bg-image section-medical-facility'> </div>
                                <div>Cơ sở 5</div>
                            </div>
                            <div className='img-customize'>
                                <div className='bg-image section-medical-facility'> </div>
                                <div>Cơ sở 6</div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
