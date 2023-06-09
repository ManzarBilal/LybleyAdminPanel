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

function Dashboard() {
    const [data, setData] = useState()
    const [brandData, setBrandData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getDashBoardData()
        getBrandData()
    }, []);

    const getDashBoardData = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get(`/dashboardDetails`);
            let { data } = response;
            setData(data);
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

    
    let userData = localStorage?.getItem("user")
    let user = JSON.parse(userData)
    let brandId = user?._id
    // const revenue = user?.role === "ADMIN" ? brandData : brandData?.filter((item, i) => item?._id === brandId);

    const spareParts = user?.role === "ADMIN" ? data : data?.sparParts?.filter((item, i) => item?.userId === user?._id);
    const orders = user?.role === "ADMIN" ? data : data?.orders?.filter((item, i) => item?.items?.find((it => it?.brandId === user?._id)));
     const revenue =  brandData?.mane
    console.log("data", data);
    console.log("branData", orders);
    console.log("revenue", revenue);
    console.log("brandId", brandId);

    return (
        <div className="body d-flex py-3">
            {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div> :
                <div className="container-xxl">
                    <div className="row g-3 mb-3 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-4">

                        <div className="col">
                            <div className={`alert-success alert mb-0`}>
                                <div className="d-flex align-items-center">
                                    <div className={`avatar rounded no-thumbnail bg-success text-light`}><i className='fa fa-dollar fa-lg'></i></div>
                                    <div className="flex-fill ms-3 text-truncate">
                                        <div className="h6 mb-0">Revenue</div>
                                        <span className="small">{revenue === 0 ? 0 : revenue}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className={`alert-danger alert mb-0`}>
                                <div className="d-flex align-items-center">
                                    <div className={`avatar rounded no-thumbnail bg-danger text-light`}><i className='fa fa-credit-card fa-lg'></i></div>
                                    <div className="flex-fill ms-3 text-truncate">
                                        <div className="h6 mb-0">Expense</div>
                                        <span className="small">1000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className={`alert-warning alert mb-0`}>
                                <div className="d-flex align-items-center">
                                    <div className={`avatar rounded no-thumbnail bg-warning text-light`}><i className='fa fa-smile-o fa-lg'></i></div>
                                    <div className="flex-fill ms-3 text-truncate">
                                        <div className="h6 mb-0">Happy Clients</div>
                                        <span className="small">5456454</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className={`alert-info alert mb-0`}>
                                <div className="d-flex align-items-center">
                                    <div className={`avatar rounded no-thumbnail bg-info text-light`}><i className='fa fa-shopping-bag'></i></div>
                                    <div className="flex-fill ms-3 text-truncate">
                                        <div className="h6 mb-0">New StoreOpen</div>
                                        <span className="small">4656</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mt-1">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first" className="col-lg-12 col-md-12">
                            <Row>
                                <Col sm={12}>
                                    <div className="tab-filter d-flex align-items-center justify-content-between mb-3 flex-wrap">
                                        <Nav variant="pills" className="nav nav-tabs tab-card tab-body-header rounded  d-inline-flex w-sm-100">
                                            <Nav.Item className="nav-item"><Nav.Link className="nav-link " eventKey="first" href="#summery-today">Today</Nav.Link></Nav.Item>
                                            <Nav.Item className="nav-item"><Nav.Link className="nav-link" eventKey="second" href="#summery-week">Week</Nav.Link></Nav.Item>
                                            <Nav.Item className="nav-item"><Nav.Link className="nav-link" eventKey="third" href="#summery-month">Month</Nav.Link></Nav.Item>
                                            <Nav.Item className="nav-item"><Nav.Link className="nav-link" eventKey="fourth" href="#summery-year">Year</Nav.Link></Nav.Item>
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
                                    <Tab.Content className="tab-content mt-1">
                                        <Tab.Pane eventKey="first" className="tab-pane fade show" id="summery-today">
                                            <div className="row g-1 g-sm-3 mb-3 row-deck">
                                                {user?.role === "ADMIN" ? <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                                    <div className="card">
                                                        <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                                                            <div className="left-info">
                                                                <span className="text-muted">Brand</span>
                                                                <div><span className="fs-6 fw-bold me-2">{data?.totalBrands}</span></div>
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
                                                                <div><span className="fs-6 fw-bold me-2">{user?.role === "ADMIN" ? data?.totalCustomers : orders?.length}</span></div>
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
                                                                <div><span className="fs-6 fw-bold me-2">{user?.role === "ADMIN" ? data?.totalOrders : orders?.length}</span></div>
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
                                                                <div><span className="fs-6 fw-bold me-2">{user?.role === "ADMIN" ? data?.sparePart : spareParts?.length}</span></div>
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
                                                                <div><span className="fs-6 fw-bold me-2">14,208</span></div>
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
                                                                <div><span className="fs-6 fw-bold me-2">14,208</span></div>
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
                                                                <div><span className="fs-6 fw-bold me-2">14,208</span></div>
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
                                                                <div><span className="fs-6 fw-bold me-2">14,208</span></div>
                                                            </div>
                                                            <div className="right-icon">
                                                                <i className={`icofont-star fs-3 color-lightyellow`}></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
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
                                                </div>
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
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second" className="tab-pane fade show" id="summery-week">
                                            <div className="row g-3 mb-4 row-deck">
                                                {
                                                    WeekData.map((d, i) => {
                                                        return <div key={'weekdata' + i} className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                                            <div className="card">
                                                                <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                                                                    <div className="left-info">
                                                                        <span className="text-muted">{d.title}</span>
                                                                        <div><span className="fs-6 fw-bold me-2">{d.value}</span></div>
                                                                    </div>
                                                                    <div className="right-icon">
                                                                        <i className={`${d.iconClass}`}></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })
                                                }

                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="third" className="tab-pane fade show" id="summery-month">
                                            <div className="row g-3 mb-4 row-deck">
                                                {
                                                    MonthData.map((d, i) => {
                                                        return <div key={'monthdata' + i} className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                                            <div className="card">
                                                                <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                                                                    <div className="left-info">
                                                                        <span className="text-muted">{d.title}</span>
                                                                        <div><span className="fs-6 fw-bold me-2">{d.value}</span></div>
                                                                    </div>
                                                                    <div className="right-icon">
                                                                        <i className={`${d.iconClass}`}></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="fourth" className="tab-pane fade show" id="summery-year">
                                            <div className="row g-3 mb-4 row-deck">
                                                {
                                                    YearData.map((d, i) => {
                                                        return <div key={'yeardata' + i} className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                                            <div className="card">
                                                                <div className="card-body py-xl-4 py-3 d-flex flex-wrap align-items-center justify-content-between">
                                                                    <div className="left-info">
                                                                        <span className="text-muted">{d.title}</span>
                                                                        <div><span className="fs-6 fw-bold me-2">{d.value}</span></div>
                                                                    </div>
                                                                    <div className="right-icon">
                                                                        <i className={`${d.iconClass}`}></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                    <div className='row g-3 mb-3'>
                        <div className='col-xl-12'>
                            <SalesStatus />
                        </div>
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-xxl-8 col-xl-8">
                            <ShoppingStatuschart />
                            <TopShellingProductChart />
                        </div>
                        <div className='col-xxl-4 col-xl-4'>
                            <BranchLocation />
                        </div>
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-lg-4 col-md-12">
                            <ActiveUsersStatus />
                        </div>
                        <div className='col-lg-8 col-md-12'>
                            <AvgexpenceChart />
                        </div>
                    </div>
                    <div className="row g-3 mb-3">
                        <div className="col-md-12">
                            <RecentTransaction />
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}
export default Dashboard;