import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { Link } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import { ReactLoader } from '../../components/common/ReactLoader';
import { ToastMessage } from '../../components/common/ToastMessage';


function BookingList(props) {
    const [checkedB,setCheckDb]=useState([])
    const [rand,setRand]=useState("");

    useEffect(() => {
        getAllOrder();
        getStatus();
    }, [rand,]);

    const columns = () => {
        return [
            {
                name: "SR NO.",
                selector: (row) => row?.i,
                sortable: true,
            },
            {
                name: "CUSTOMER NAME",
                selector: (row) => row?.name,
                cell: (row) => <Link className='text-primary' to={props?.url + `/booking-detail/${row?._id}`} >{row?.name}</Link>,
                sortable: true,
            },
            {
                name: "ADDRESS",
                cell: row => row?.address,
                sortable: true, minWidth: "200px"
            },

            {
                name: "EMAIL",
                cell: row => row?.email,
                sortable: true, minWidth: "220px"
            },
            {
                name: "CONTACT NO.",
                cell: row => row?.contact,
                sortable: true,
            },
            {
                name: "ITEMS",
                cell: row => row?.items?.length,
                sortable: true,maxWidth:"50px",
            },
            {
                name: "TOTAL MRP",
                cell: row => row?.items?.reduce((acc,curr)=> acc+curr?.MRP ,0) + " (18% GST included)",
                sortable: true,
            },
            {
                name: "TETCHNICIAN",
                cell: row => "Booked for " + row?.items?.find(f1=> f1?.technician)?.technician,
                sortable: true,
            }, 
            {
                name: "ACTION",
                selector: (row) => { },
                sortable: true,
                cell: (row)=>  <Switch
                checked={checkedB?.find(f1=>f1?.orderId===row?._id)?.closed}
                onChange={()=>updateClosed(row?._id,!checkedB?.find(f1=>f1?.orderId===row?._id)?.closed)}
                color="primary"
                name="checkedB"
                value={checkedB?.find(f1=>f1.orderId===row?._id)?.closed}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            },
           
        ]
    }

    const [order, setOrders] = useState([]);
    const [loading, setLoading] = useState(false)



    const getStatus=async()=>{
        try{
         let response=await httpCommon.get("/getAllTechnicianStatus");
         let {data}=response;
        setCheckDb(data);
        }catch(err){
          console.log(err);
        }
    }

    console.log(checkedB);

    const updateClosed=async(id,val)=>{
        try{
           let response=await httpCommon.patch(`/updateClosed/${id}`,{closed:val});
           let {data}=response;
           const x = Math.floor((Math.random() * 10) + 1);
           setRand(x);
           ToastMessage(data);
        }catch(err){
            console.log(err);
        }
    }

    const getAllOrder = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get("/getAllOrder");
            let { data } = response;
            setOrders(data);
            setLoading(false)

        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }


    let userData = localStorage?.getItem("user")
    let user = JSON.parse(userData)

    const orders = user?.role === "ADMIN" ? order : order?.filter((item, i) => item?.items?.find((it => it?.brandId === user?._id)));
    // const orders1=orders
    const finalData = orders?.filter((item, i) => item?.items.find(it=>it?.technician>0))
    const FinalData2=finalData?.map((item,i)=>({...item ,i:i+1}));
    console.log(finalData);

    return (
        <div className="body d-flex py-3">
            <div className="container-xxl">
                <PageHeader1 pagetitle='Booking List' />
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
                                                    data={FinalData2}
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
export default BookingList;