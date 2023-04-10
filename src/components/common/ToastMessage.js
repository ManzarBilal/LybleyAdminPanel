
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';


export const ToastMessage = (props) => {

    {
        props?.staus === true ?
            toast.success(`${props}`,
                {
                    position: "top-center"

                })
            : toast.error(`${props}`,
                {
                    position: "top-center"

                })

    }

}
