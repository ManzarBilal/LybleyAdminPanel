import React, { useEffect, useState } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import ShoppingStatuschart from '../../components/dashboard/ShoppingStatuschart';
import TopShellingProductChart from '../../components/dashboard/TopShellingProductChart';
import AvgexpenceChart from '../../components/dashboard/AvgexpenceChart';
import BranchLocation from '../../components/dashboard/BranchLocation';
import ActiveUsersStatus from '../../components/dashboard/ActiveUsersStatus';
import RecentTransaction from '../../components/dashboard/RecentTransaction';
import SalesStatus from '../../components/dashboard/SalesStatus';
import { DashboardStatusData, MonthData, WeekData, YearData } from '../../components/Data/Data';
import httpCommon from "../../http-common"
import { ReactLoader } from '../../components/common/ReactLoader';
import OrderList from '../Orders/OrderList';

function Dashboard(props) {
    const [data, setData] = useState([])
    const [adminOrder, setAdminOrder] = useState([])
    const [adminCustomer, setAdminCustomer] = useState([])
    const [adminSpareParts, setAdminSpareParts] = useState([])
    const [adminBrands, setAdminBrands] = useState([])
    const [brandData, setBrandData] = useState([])
    const [brandByIdData, setBrandBYIdData] = useState([])
    const [loading, setLoading] = useState(false)
    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
        getDashBoardData()
        getBrandData()
        getBrandDataById()
        getTransaction();
    }, []);

    const getTransaction = async () => {
        try {
            let response = await httpCommon.get("/getAllTransaction");
            let { data } = response;
            setTransaction(data);
        } catch (err) {
            console.log(err);
        }
    }

    const getDashBoardData = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get(`/dashboardDetails`);
            let { data } = response;
            setData(data);
            setAdminCustomer(data?.totalCustomers);
            setAdminOrder(data?.orders);
            setAdminBrands(data?.totalBrands);
            setAdminSpareParts(data?.sparParts);
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }

    const getBrandData = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get(`/getAllBrands`);
            let { data } = response;
            setBrandData(data);
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }
    const getBrandDataById = async () => {
        try {
            let user = JSON.parse(userData)
            let brandId = user?._id
            setLoading(true)
            let response = await httpCommon.get(`/getBrandBy/${brandId}`);
            let { data } = response;
            setBrandBYIdData(data);
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)

        }
    }


    let userData = localStorage?.getItem("user")
    let user = JSON.parse(userData)
    let brandId = user?._id
    // const revenue = user?.role === "ADMIN" ? brandData : brandData?.filter((item, i) => item?._id === brandId);

    const spareParts = user?.role === "ADMIN" ? data?.sparParts : data?.sparParts?.filter((item, i) => item?.userId === user?._id);
    const orders = user?.role === "ADMIN" ? data?.orders : data?.orders?.filter((item, i) => item?.items?.find((it => it?.brandId === user?._id)));
    const transaction1 = user?.role === "ADMIN" ? transaction : transaction?.filter(t1 => t1?.brandId === brandId);

    const [toDateFormat, setToDateFormat] = useState("");
    const [fromDateFormat, setFromDateFormat] = useState("");
    const [filter, setFilter] = useState("All")
    const [filterData, setFilterData] = useState([]);
    const [val, setVal] = useState("");

    const handleToDate = (e) => {
        const date = new Date()
        console.log(date);
        setToDateFormat(date)

    }
    const handleFromDate = (e) => {
        const getFromDateValue = e.target.value;
        var someDate = new Date(getFromDateValue);
        someDate.setDate(someDate.getDate() + 1); //number  of days to add, e.x. 15 days
        var dateFormated = someDate.toISOString().substr(0, 10);
        const date = new Date(dateFormated)
        setFromDateFormat(date)

    }

    const getFilteredData1 = (val, color) => {
        setFilter(color);
        setVal(val);
    }

    const todayDate = new Date()
    const todayDate1 = new Date(todayDate)?.toISOString()?.substr(0, 10);
    const todayDate2 = new Date(todayDate)?.toISOString();

    const someDate = new Date(todayDate1);
    someDate?.setDate(someDate?.getDate() - val); //number  of days to add, e.x. 15 days
    const dateFormDated1 = someDate?.toISOString()
    let sd = new Date(dateFormDated1).getTime()
    let ds = new Date(todayDate2).getTime();

    let adminOrder1 = orders?.filter(item => {
        let date = new Date(item?.createdAt).getTime();
        return val ? date >= sd && date <= ds : adminOrder;
    })
    let adminCustomer1 = adminCustomer.filter(item => {
        let date = new Date(item?.createdAt).getTime();
        return val ? date >= sd && date <= ds : adminCustomer;
    })
    let adminSpareParts1 = spareParts?.filter(item => {
        let date = new Date(item?.createdAt).getTime();
        return val ? date >= sd && date <= ds : adminSpareParts;
    })
    let adminBrands1 = adminBrands.filter(item => {
        let date = new Date(item?.createdAt).getTime();
        return val ? date >= sd && date <= ds : adminBrands;
    })
    let orders1 = orders?.filter(item => {
        let date = new Date(item?.createdAt).getTime();
        return val ? date >= sd && date <= ds : adminBrands;
    })

    console.log(adminBrands1)

    let totalOrder = adminOrder1?.reduce((acc, curr) => acc.concat(curr?.items), []);


    var frequencyCount = {};
    var mostOccurringValue;
    var maxCount = 0;

    totalOrder?.map(obj => {
        var value = obj?.sparePartName;
        frequencyCount[value] = (frequencyCount[value] || 0) + 1;

        if (frequencyCount[value] > maxCount) {
            maxCount = frequencyCount[value];
            mostOccurringValue = value;
        }
    });

    let tot = totalOrder?.map(m1 => ({ tot: m1?.MRP * m1?.quantity }));
    let qty = totalOrder?.reduce((acc, curr) => acc + curr?.quantity, 0);
    let totalSale = tot?.reduce((acc, curr) => acc + curr?.tot, 0)
    let avgSale = totalSale / adminOrder1?.length;
    
    let avgSaleItem = tot?.reduce((acc, curr) => acc + curr?.tot, 0) / qty;

    return (
        <div className="body d-flex py-3">
            {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div> :
                <div className="container-xxl">
                    <div className="row g-3 mb-3 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-4">

                        {user?.role === "ADMIN" ? <div className="col">
                            <div className={`alert-success alert mb-0`}>
                                <div className="d-flex align-items-center">
                                    <div className={`avatar rounded no-thumbnail bg-success text-light`}><i className='icofont-rupee fa-lg'></i></div>
                                    <div className="flex-fill ms-3 text-truncate">
                                        <div className="h6 mb-0"> Total Revenue</div>
                                        <span className="small">{brandData?.reduce((acc, curr) => acc + curr?.revenue, 0)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                            : ""}
                        <div className="col">
                            <div className={`alert-success alert mb-0`}>
                                <div className="d-flex align-items-center">
                                    <div className={`avatar rounded no-thumbnail bg-success text-light`}><i className='icofont-rupee fa-lg'></i></div>
                                    <div className="flex-fill ms-3 text-truncate">
                                        <div className="h6 mb-0">Revenue</div>
                                        <span className="small fw-bold">{brandByIdData?.revenue}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className={`alert-danger alert mb-0`}>
                                <div className="d-flex align-items-center">
                                    <div className={`avatar rounded no-thumbnail bg-danger text-light`}><i className='icofont-rupee fa-lg'></i></div>
                                    <div className="flex-fill ms-3 text-truncate">
                                        <div className="h6 mb-0">Total Pay</div>
                                        <span className="small">{user?.role === "ADMIN" ? brandData?.reduce((acc, curr) => acc + curr?.totalPay, 0) : brandByIdData?.totalPay}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className={`alert-danger alert mb-0`}>
                                <div className="d-flex align-items-center">
                                    <div className={`avatar rounded no-thumbnail bg-danger text-light`}><i className='icofont-rupee fa-lg'></i></div>
                                    <div className="flex-fill ms-3 text-truncate">
                                        <div className="h6 mb-0">Total Due</div>
                                        <span className="small">{user?.role === "ADMIN" ? brandData?.reduce((acc, curr) => acc + curr?.totalDue, 0) : brandByIdData?.totalDue}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className={`alert-warning alert mb-0`}>
                                <div className="d-flex align-items-center">
                                    <div className={`avatar rounded no-thumbnail bg-warning text-light`}><i className='fa fa-smile-o fa-lg'></i></div>
                                    <div className="flex-fill ms-3 text-truncate">
                                        <div className="h6 mb-0">Happy Customers</div>
                                        <span className="small">{orders?.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col">
                            <div className={`alert-info alert mb-0`}>
                                <div className="d-flex align-items-center">
                                    <div className={`avatar rounded no-thumbnail bg-info text-light`}><i className='fa fa-shopping-bag'></i></div>
                                    <div className="flex-fill ms-3 text-truncate">
                                        <div className="h6 mb-0">New StoreOpen</div>
                                        <span className="small">4656</span>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    </div>
                    <div className="mt-1">
                        <Tab.Container className="col-lg-12 col-md-12">
                            <Row>
                                <Col sm={12}>
                                    <div className="tab-filter d-flex align-items-center justify-content-between mb-3 flex-wrap">
                                        <Nav variant="pills" className="nav nav-tabs tab-card tab-body-header rounded  d-inline-flex w-sm-100">
                                            <Nav.Item className="nav-item"><Nav.Link className={`${filter === "All" ? "bg-primary text-white" : ""} nav-link`} onClick={(e) => getFilteredData1(0, "All")}>All</Nav.Link></Nav.Item>
                                            <Nav.Item className="nav-item"><Nav.Link className={`${filter === "Today" ? "bg-primary text-white" : ""} nav-link`} onClick={(e) => getFilteredData1(1, "Today")} >Today</Nav.Link></Nav.Item>
                                            <Nav.Item className="nav-item"><Nav.Link className={`${filter === "Week" ? "bg-primary text-white" : ""} nav-link`} onClick={(e) => getFilteredData1(7, "Week")} >Week</Nav.Link></Nav.Item>
                                            <Nav.Item className="nav-item"><Nav.Link className={`${filter === "Month" ? "bg-primary text-white" : ""} nav-link`} onClick={(e) => getFilteredData1(30, "Month")} >Month</Nav.Link></Nav.Item>
                                            <Nav.Item className="nav-item"><Nav.Link className={`${filter === "Year" ? "bg-primary text-white" : ""} nav-link`} onClick={(e) => getFilteredData1(365, "Year")} >Year</Nav.Link></Nav.Item>
                                        </Nav>
                                        <div className="date-filter d-flex align-items-center mt-2 mt-sm-0 w-sm-100">
                                            <div className="input-group">
                                                <input type="date" className="form-control" />
                                                <button className="btn btn-primary" type="button"><i className="icofont-filter fs-5"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={12}>

                                    <div className="row g-1 g-sm-3 mb-3 row-deck">
                                        {user?.role === "ADMIN" ? <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                            <div className="card">
                                                <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                                                    <div className="left-info">
                                                        <span className="text-muted">Brand</span>
                                                        <div><span className="fs-6 fw-bold me-2">{adminBrands1.length === 0 ? 0 : adminBrands1?.filter(f1=>f1?.role!=="ADMIN")?.length}</span></div>
                                                    </div>
                                                    <div className="right-icon">
                                                        <i className={`icofont-student-alt fs-3 color-light-orange`}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : ""}
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                            <div className="card">
                                                <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                                                    <div className="left-info">
                                                        <span className="text-muted">Customers</span>
                                                        <div><span className="fs-6 fw-bold me-2">{user?.role === "ADMIN" ? adminCustomer1?.length : orders1?.length}</span></div>
                                                    </div>
                                                    <div className="right-icon">
                                                        <i className={`icofont-student-alt fs-3 color-light-orange`}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                            <div className="card">
                                                <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                                                    <div className="left-info">
                                                        <span className="text-muted">Order</span>
                                                        <div><span className="fs-6 fw-bold me-2">{adminOrder1?.length}</span></div>
                                                    </div>
                                                    <div className="right-icon">
                                                        <i className={`icofont-shopping-cart fs-3 color-lavender-purple`}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                            <div className="card">
                                                <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                                                    <div className="left-info">
                                                        <span className="text-muted">Total Products</span>
                                                        <div><span className="fs-6 fw-bold me-2">{adminSpareParts1?.length}</span></div>
                                                    </div>
                                                    <div className="right-icon">
                                                        <i className={`icofont-bag fs-3 color-light-orange`}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                            <div className="card">
                                                <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                                                    <div className="left-info">
                                                        <span className="text-muted">Avg Sale</span>
                                                        <div><span className="fs-6 fw-bold me-2">{isNaN(avgSale?.toFixed(2)) ? 0 : avgSale?.toFixed(2)}</span></div>
                                                    </div>
                                                    <div className="right-icon">
                                                        <i className={`icofont-sale-discount fs-3 color-santa-fe`}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                            <div className="card">
                                                <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                                                    <div className="left-info">
                                                        <span className="text-muted">Avg Item Sale</span>
                                                        <div><span className="fs-6 fw-bold me-2">{isNaN(avgSaleItem?.toFixed(2)) ? 0 : avgSaleItem?.toFixed(2)}</span></div>
                                                    </div>
                                                    <div className="right-icon">
                                                        <i className={`icofont-calculator-alt-2 fs-3 color-danger`}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                            <div className="card">
                                                <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                                                    <div className="left-info">
                                                        <span className="text-muted">Total Sale</span>
                                                        <div><span className="fs-6 fw-bold me-2">{totalSale}</span></div>
                                                    </div>
                                                    <div className="right-icon">
                                                        <i className={`icofont-users-social fs-3 color-light-success`}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                            <div className="card">
                                                <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                                                    <div className="left-info">
                                                        <span className="text-muted">Top Selling Item</span>
                                                        <div><span className="fs-6 fw-bold me-2">{mostOccurringValue}</span></div>
                                                    </div>
                                                    <div className="right-icon">
                                                        <i className={`icofont-star fs-3 color-lightyellow`}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                                    <div className="card">
                                                        <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                                                            <div className="left-info">
                                                                <span className="text-muted">Dealership</span>
                                                                <div><span className="fs-6 fw-bold me-2">14,208</span></div>
                                                            </div>
                                                            <div className="right-icon">
                                                                <i className={`icofont-handshake-deal fs-3 color-lavender-purple`}></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                            <div className="card">
                                                <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                                                    <div className="left-info">
                                                        <span className="text-muted">Visitors</span>
                                                        <div><span className="fs-6 fw-bold me-2">14,208</span></div>
                                                    </div>
                                                    <div className="right-icon">
                                                        <i className={`icofont-users-social fs-3 color-light-success`}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                    {/* <div className='row g-3 mb-3'>
                        <div className='col-xl-12'>
                            <SalesStatus />
                        </div>
                    </div> */}
                    <div className="row g-3 mb-3">
                        <div className="col-xxl-8 col-xl-8">
                            {/* <ShoppingStatuschart /> */}
                            <TopShellingProductChart orders={orders} />
                        </div>
                        <div className='col-xxl-4 col-xl-4'>
                            <BranchLocation />
                        </div>
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-lg-4 col-md-12">
                            <ActiveUsersStatus />
                        </div>
                        <div className="col-lg-4 col-md-12"></div>
                        <div className="col-lg-4 col-md-12">
                            <div className='card' style={{ width: '100%', height: '100%' }}>
                                <div className="card-header py-3 d-flex justify-content-between align-items-center bg-transparent border-bottom-0">
                                    <h6 className="m-0 fw-bold">Our Branch Location &amp; Revenue</h6>
                                </div>
                                <div id='map' style={{ margin: '15px' }}>
                                    <iframe
                                        src="https://maps.google.com/maps?hl=en&amp;coord=52.70967533219885, -8.020019531250002&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
                                        width="100%"
                                        height="365"
                                        frameBorder="0"
                                        title="f"
                                        style={{ border: '0' }}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                        {/* <div className='col-lg-8 col-md-12'>
                            <AvgexpenceChart />
                        </div> */}
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-md-12">
                            <OrderList url={props?.url} />
                        </div>
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-md-12">
                            <RecentTransaction transaction={transaction1} />
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}
export default Dashboard;