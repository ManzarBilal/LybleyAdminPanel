import httpCommon from "../../http-common";

export const getAllSpareParts = () => {
    return async (dispatch) => {
        try {
            let response = await httpCommon.get(`/allSparePart`)
            dispatch({
                type: "All_SPAREPART",
                payload: response.data
            })
            dispatch(showLoading(false))
        } catch (err) {
            console.log(err);
            dispatch(showLoading(false))
        }
    }
}
export const getSpareParts = (id) => {
    return async (dispatch) => {
        try {
            let response = await httpCommon.get(`/sparePartByuserId/${id}`)
            dispatch({
                type: "All_SPAREPART",
                payload: response.data
            })
            dispatch(showLoading(false))
        } catch (err) {
            console.log(err);
            dispatch(showLoading(false))

        }
    }
}

export const showLoading = (status) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: "LOADING",
                payload: status,
            })
        } catch (err) {
            console.log(err);
        }
    }
}