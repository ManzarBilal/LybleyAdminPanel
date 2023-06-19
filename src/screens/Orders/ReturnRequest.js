import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { Link } from 'react-router-dom';
import { ReactLoader } from '../../components/common/ReactLoader';
import ReactPlayer from 'react-player';

function ReturnRequest(props) {
    const [hashWindow,setHashWindow]=useState(false);
    const playerRef=useRef(null);
    const [rand,setRand]=useState("")

    const updateRequest=async (id,val)=>{
          try{
            let response=await httpCommon.patch(`/updateReturnVerify/${id}`,{status:val});
            let {data}=response;
            setRand(val);
          }catch(err){
            console.log(err);
          }
    }

    const columns = () => {
        return [
            {
                name: "SR NO.",
                selector: (row) => row?.i,
                sortable: true, 
                maxWidth:"20px"
            },
           
            {
                name: "ORDERID",
                cell: row => row?.orderId,
                sortable: true,  
            },

            {
                name: "BRANDID",
                cell: row => row?.brandId,
                sortable: true, 
            },
            {
                name: "STATUS",
                cell: row =><button className={`btn ${row?.status==="NOT_VERIFIED" ? "btn-danger" : "btn-success"} btn-sm text-white`} onClick={()=>updateRequest(row?._id,row?.status==="NOT_VERIFIED" ? "VERIFIED" : "NOT_VERIFIED")}>{row?.status}</button>,
                sortable: true,
            },
            {
                name: "VIDEO",
                cell: row =><> {hashWindow && <ReactPlayer ref={playerRef} url={row?.video} controls height="100px" />}</>,
                sortable: true,
            },
            {
                name: "REQUEST CREATE DATE",
                cell: row => new Date(row?.createdAt).toLocaleString(),
                sortable: true,
            },
            // {
            //     name: "STATUS",
            //     selector: (row) => row?.status,
            //     cell: (row) => <div className="btn-group" role="group" aria-label="Basic outlined example">
            //         {row?.status === "INACTIVE" ? <button type="button" className="btn text-white btn-danger" onClick={() => approval(row?._id, "ACTIVE")}>INACTIVE</button>
            //             : <button type="button" className="btn text-white btn-success" onClick={() => approval(row?._id, "INACTIVE")} >ACTIVE</button>}

            //     </div>,
            //     sortable: true,
            // },
            // {
            //     name: "ACTION",
            //     selector: (row) => { },
            //     sortable: true,
            //     cell: (row) => 
            //     <div className="btn-group" role="group" aria-label="Basic outlined example">
            //         <button onClick={() => { edit(row?._id) }} type="button" className="btn btn-outline-secondary"><i className="icofont-edit text-success"></i></button>
            //         <button onClick={() => { handleBrand(row?._id) }} type="button" className="btn btn-outline-secondary deleterow"><i className="icofont-ui-delete text-danger"></i></button>
            //     </div>
            // }
        ]
    }

    const [order, setOrders] = useState([]);
    const [loading, setLoading] = useState(false)
    console.log(order);

    useEffect(() => {
        getAllReturnRequestOrder();
        if(typeof window !== "undefined"){
            setHashWindow(true);
        }
    }, [rand]);

    const getAllReturnRequestOrder = async () => {
        try {
            let user=localStorage.getItem("user");
            let obj=JSON.parse(user);
            setLoading(true)
            let response = await httpCommon.get(`/getReturnVerifyByBrand/${obj?._id}`);
            let { data } = response;
            setOrders(data);
            setLoading(false)

        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }



    // const orders1=orders
    const finalData = order?.map((item, i) => ({ ...item, i: i + 1 }))


    return (
        <div className="body d-flex py-3">
            <div className="container-xxl">
                <PageHeader1 pagetitle='Return Request List' />
                <div className="row g-3 mb-3">
                    <div className="col-md-12">
                        {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div> :
                            <div className="card">
                                <div className="card-body">
                                    <div id="myDataTable_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <DataTable
                                                    columns={columns()}
                                                    data={finalData}
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
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ReturnRequest;