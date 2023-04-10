 

export const userEmail = (regEmail) => {
    return (dispatch) => {
            dispatch({
                type: "USER_EMAIL",
                payload: regEmail,
            })
        }
    }
