import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHomeService,
    getAllDoctorHomeService, saveDetailDoctorService
} from '../../services/userService'
import { toast } from 'react-toastify';


// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error: ', e)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionFailed error: ', e)
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed error: ', e)
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Create a new user succeed!')
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('fetchRoleFailed error: ', e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed error: ', e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const fetchDeleteUserStart = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Delete the user succeed!')
                dispatch(fetchDeleteUsersSuccess())
                dispatch(fetchAllUserStart());
            } else {
                toast.error('Delete the user error!')
                dispatch(fetchDeleteUsersFailed());
            }
        } catch (e) {
            dispatch(fetchDeleteUsersFailed());
            console.log('fetchDeleteUsersFailed error: ', e)
        }
    }
}

export const fetchDeleteUsersSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    users: data
})
export const fetchDeleteUsersFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const fetchEditUserStart = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Edit the user succeed!')
                dispatch(fetchEditUsersSuccess())
                dispatch(fetchAllUserStart());
            } else {
                toast.error('Edit the user error!')
                dispatch(fetchEditUsersFailed());
            }
        } catch (e) {
            dispatch(fetchEditUsersFailed());
            console.log('fetchEditUsersFailed error: ', e)
        }
    }
}

export const fetchEditUsersSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    users: data
})
export const fetchEditUsersFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('10');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataTopDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
        }
    }
}
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorHomeService();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            console.log('check response: ', res)
            if (res && res.errCode === 0) {
                toast.success('Save detail doctor succeed!')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error('Save detail doctor error!')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            toast.error('Save detail doctor error (catch)!')
            console.log('SAVE_DETAIL_DOCTOR_FAILED: ', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    }
}

export const fetchAllcodeScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })
        }
    }
}

export const fetchDoctorPrice = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('PRICE');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_DOCTOR_PRICE_SUCCESS,
                    dataDoctorPrice: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_DOCTOR_PRICE_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_DOCTOR_PRICE_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })
        }
    }
}

export const fetchPaymentMethod = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('PAYMENT');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_PAYMENT_METHOD_SUCCESS,
                    dataPayment: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_PAYMENT_METHOD_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_PAYMENT_METHOD_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_PAYMENT_METHOD_FAILED,
            })
        }
    }
}

export const fetchProvince = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('PROVINCE');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_PROVINCE_SUCCESS,
                    dataProvince: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_PROVINCE_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_PROVINCE_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_PROVINCE_FAILED,
            })
        }
    }
}
