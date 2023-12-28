import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { ConfirmBox } from '../../components/common/ConfirmBox';
import { ToastMessage } from '../../components/common/ToastMessage';
import Avatar4 from "../../assets/images/lg/avatar4.svg";
import { ReactLoader } from '../../components/common/ReactLoader';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';


const defaultBanner = "https://visme.co/blog/wp-content/uploads/2021/01/header-3.png"
function Wallet() {
    const [brandDetails, setBrandDetails] = useState();
    const [walletDetails, setWalletDetails] = useState();
    const [table_row, setTable_row] = useState();
    const [viewDetail, setViewDetail] = useState([]);
    const [ismodal, setIsmodal] = useState(false);
    const [iseditmodal, setIseditmodal] = useState(false);
    const [randomValue, setRandomValue] = useState("");

    const [loading, setLoading] = useState(false)

  const history=useHistory()

    useEffect(() => {
        getBrandDetails()
        getWalletDetails()
    }, [ ])
    const getBrandDetails = async () => {

        try {
            let user = localStorage.getItem("user");
            let brandObj = JSON.parse(user);
            setLoading(true)
            let response = await httpCommon.get(`/getBrandBy/${brandObj?._id}`)

            let { data } = response
           
            setBrandDetails(data)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            setLoading(false)

        }
    }
    const getWalletDetails = async () => {

        try {
            let user = localStorage.getItem("user");
            let brandObj = JSON.parse(user);
            setLoading(true)
            let response = await httpCommon.get(`/getWalletTransaction/${brandObj?._id}`)

            let { data } = response
           
            setWalletDetails(data.reverse())
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            setLoading(false)

        }
    }


    const validationSchema = Yup.object().shape({
        amount: Yup.string().required(' Amount is required')


    });


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });


   

    const onRegister = data => {
        payment(data);
    }


    const columns = () => {
        return [
           
            {
                name: "Brand Name",
                selector: (row) => row?.brandName,
                sortable: true,
            },
            {
                name: "Paid Amount",
                selector: (row) => row?.addedAmount+ " INR",
                sortable: true,
            },
           
           
            {
                name: "Payment Release Date",
                selector: (row) => new Date(row?.createdAt).toLocaleString(),
                sortable: true,
            },


        ]
    }
    const payment=async(obj)=>{
        try{
            let user = localStorage.getItem("user");
            let brandObj = JSON.parse(user);
         let response=await httpCommon.post("/walletPayment",{amount:obj?.amount});
         let {data}=response;
         setIsmodal(false)
         const options = {
          key: "rzp_live_yEWZ902y0STtSb", // Enter the Key ID generated from the Dashboard
          amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "SpareTrade", //your business name
          description: "Payment for wallet",
          image: "https://lybley-webapp-collection.s3.amazonaws.com/PNG-031.png-1684751868223-284237810",
          order_id: data?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: async function (orderDetails){
            try{
            
            let response =await axios.post("https://sparetradebackend-production.up.railway.app/paymentVerificationForWallet",{response:{...orderDetails,amount:obj?.amount,_id:brandDetails?._id} });
            let {data}=response;
            window.location.reload();
            ToastMessage(data)
            
            }catch(err){
              console.log(err);
            }
        },
          prefill: {
              name: brandDetails?.brandName, //your customer's name
              email: brandDetails.email,
              contact: brandDetails.contact
          },
          notes: {
              "address": "Razorpay Corporate Office"
          },
          theme: {
              color: "#3399cc"
          }
      };
      const rzp1 = new window.Razorpay(options);
          rzp1.open();
        }catch(err){
          console.log(err);
        }
    } 

    
    return (
        <>
            <div className="body d-flex py-lg-3 py-md-2">
                <div className="container-xxl">
                    <PageHeader1 pagetitle='Wallet ' modalbutton={() => {
                        return <>
                            <div className="col-auto d-flex w-sm-100">
                                 
                                <button type="button" onClick={() => { setIsmodal(true) }} className="btn btn-primary btn-set-task w-sm-100" data-bs-toggle="modal" data-bs-target="#expadd"><i className="icofont-plus-circle me-2 fs-6"></i>Add Amount</button>
                            </div>

                        </>
                    }} />

                    <div className="row clearfix g-3">
                        {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div>
                            : <div className="col-sm-12">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div id="myProjectTable_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <DataTable
                                                        columns={columns()}
                                                        data={walletDetails}
                                                        defaultSortField="title"
                                                        pagination
                                                        selectableRows={false}
                                                        className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
                                                        highlightOnHover={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        }
                    </div>
                </div>


                <Modal show={ismodal} onHide={() => { setIsmodal(false) }} style={{ display: 'block' }}>
                    <Modal.Header className="modal-header" closeButton>
                        <h5 className="modal-title  fw-bold" id="expaddLabel">Add Amount</h5>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <div className="deadline-form row">


                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label"> Amount</label>
                                    <input type="number" className={(errors && errors.amount) ? "form-control  border-danger " : "form-control"} placeholder=" amount"
                                        {...register('amount')}

                                    />
                                    <div className='text-danger'>
                                        {errors.amount?.message}
                                    </div>
                                </div>
                            </div>


                        </div>

                    </Modal.Body>
                    <Modal.Footer className="modal-footer">
                        <button onClick={() => { setIsmodal(false) }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleSubmit(onRegister)} className="btn btn-primary">Add Wallet Amount</button>
                    </Modal.Footer>

                </Modal>

            </div>

        </>
    )
}
export default Wallet;