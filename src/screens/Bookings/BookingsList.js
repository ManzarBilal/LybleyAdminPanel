import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { Link } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import { ReactLoader } from '../../components/common/ReactLoader';

function BookingList(props) {
    const [checkedB,setCheckDb]=useState(false)
    const columns = () => {
        return [
            // {
            //     name: "SR NO.",
            //     selector: (row) => row?.i,
            //     sortable: true,
            // },
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
                checked={checkedB}
                onChange={()=>setCheckDb(!checkedB)}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            },
           
        ]
    }

    const [order, setOrders] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getAllOrder();
    }, []);

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
export default BookingList;