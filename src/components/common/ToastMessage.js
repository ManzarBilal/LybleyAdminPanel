
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';


export const ToastMessage = (props) => {
console.log(props,"props")
    {
        props?.staus === true ?
            toast.success(`${props?.msg}`,
                {
                    position: "top-center"

                })
            : toast.error(`${props?.msg}`,
                {
                    position: "top-center"

                })

    }

}
