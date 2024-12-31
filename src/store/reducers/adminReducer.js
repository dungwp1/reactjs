import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    users: [],
    topDoctors: [],
    doctors: [],
    allScheduleTime: [],
    doctorPrice: [],
    paymentMethod: [],
    provinces: []
}

const adminReducer = (state = initialState, action) => {
    let copyState = { ...state };
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            copyState.isLoadingGender = true;
            console.log('fire fetch gender start: ', action)
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            copyState.genders = action.data;
            copyState.isLoadingGender = false;
            console.log('fire fetch gender success: ', action)
            // console.log('fire fetch gender success, check copyState: ', copyState)
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('fire fetch gender failed: ', action)
            copyState.genders = [];
            copyState.isLoadingGender = false;
            return {
                ...copyState
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            copyState.positions = action.data;
            return {
                ...copyState
            }
        case actionTypes.FETCH_POSITION_FAILED:
            copyState.positions = [];
            return {
                ...copyState
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            copyState.roles = action.data;
            return {
                ...copyState
            }
        case actionTypes.FETCH_ROLE_FAILED:
            copyState.roles = [];
            return {
                ...copyState
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            copyState.users = action.users;
            return {
                ...copyState
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            copyState.users = [];
            return {
                ...copyState
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            copyState.topDoctors = action.dataTopDoctors;
            return {
                ...copyState
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            copyState.topDoctors = [];
            return {
                ...copyState
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            copyState.doctors = action.dataDoctors;
            return {
                ...copyState
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            copyState.doctors = [];
            return {
                ...copyState
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            copyState.allScheduleTime = action.dataTime;
            return {
                ...copyState
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            copyState.allScheduleTime = [];
            return {
                ...copyState
            }
        case actionTypes.FETCH_DOCTOR_PRICE_SUCCESS:
            copyState.doctorPrice = action.dataDoctorPrice;
            return {
                ...copyState
            }
        case actionTypes.FETCH_DOCTOR_PRICE_FAILED:
            copyState.doctorPrice = [];
            return {
                ...copyState
            }
        case actionTypes.FETCH_PAYMENT_METHOD_SUCCESS:
            copyState.paymentMethod = action.dataPayment;
            return {
                ...copyState
            }
        case actionTypes.FETCH_PAYMENT_METHOD_FAILED:
            copyState.paymentMethod = [];
            return {
                ...copyState
            }
        case actionTypes.FETCH_PROVINCE_SUCCESS:
            copyState.provinces = action.dataProvince;
            return {
                ...copyState
            }
        case actionTypes.FETCH_PROVINCE_FAILED:
            copyState.provinces = [];
            return {
                ...copyState
            }

        default:
            return copyState;
    }
}

export default adminReducer;