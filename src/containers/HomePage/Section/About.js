import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss'
import { FormattedMessage } from 'react-intl';

class About extends Component {


    render() {
        return (
            <div className='section-share section-about'>
                <div className='content-header'><b>Truyền thông nói gì về Bookingcare</b></div>
                <div className='section-about-header'>
                    <div className='content-left'>
                        <div className='left'>
                            <iframe width="90%" height="450"
                                src="https://www.youtube.com/embed/FyDQljKtWnI"
                                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>
                    <div className='content-right'>
                        <p>BookingCare là nền tảng y tế chăm sóc sức khỏe toàn diện hỗ trợ người dùng kết nối với các cơ sở y tế, các bác sĩ chuyên khoa cũng như các dịch vụ, sản phẩm chăm sóc sức khỏe phù hợp với nhu cầu, do Công ty Cổ phần Công nghệ BookingCare phát triển.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
