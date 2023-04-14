import React from 'react';
import Modal from 'react-bootstrap/Modal';
 

export function ConfirmBox(props) {

    
    return (
        <>
            <Modal
                show={props?.bool}
                onClick={() => props?.setConfirmBoxView(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Confirm Box
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="profile-block text-center w220 mx-auto">

                        <img src="https://img.freepik.com/free-vector/red-exclamation-mark-symbol-attention-caution-sign-icon-alert-danger-problem_40876-3505.jpg?size=626&ext=jpg&ga=GA1.1.1565121225.1680255264&semt=ais" alt="brandLogo" className="avatar xl rounded img-thumbnail shadow-sm" />


                    </div>
                    <h4 className='text-center'>
                        Your data will be deleted permanently!
                    </h4>
                    <p className='text-center' >Are you sure to proceed?</p>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-between'>
                    <button className='btn btn-primary' onClick={() => props?.setConfirmBoxView(false)}>Cancel</button>
                    <button className='btn btn-danger text-white' onClick={() =>props?.onSubmit()}>Yes, delete it!</button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

