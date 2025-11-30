import { AUTH_SAVE_DATA, AUTH_UPDATE_INFO, REMOVE_INFO } from '../actionTypes'

const initialState = {
    data: {
        first_name: '',
        last_name: '',
    }
}

const updateInfoReduce = (state = initialState, action) => {
    const { payload } = { ...action };
    switch (action.type) {
        case AUTH_UPDATE_INFO: {
            return { payload }
        }
        case REMOVE_INFO: {
            return initialState
        }
        default: {
            return state
        }
    }
}



export default updateInfoReduce