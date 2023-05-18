import React from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import Avatar1 from '../../assets/images/xs/avatar1.svg';
import Avatar3 from '../../assets/images/xs/avatar3.svg';
import Avatar4 from '../../assets/images/lg/avatar4.svg'
import Avatar5 from '../../assets/images/xs/avatar5.svg';
import Avatar6 from '../../assets/images/xs/avatar6.svg';
import Avatar7 from '../../assets/images/xs/avatar7.svg';
import Profile from '../../assets/images/profile_av.svg';
import { connect } from 'react-redux';
import { Onopenmodalsetting } from '../../Redux/Actions/Action';
import { Link, useHistory } from 'react-router-dom';
import ImageLogo from "../../assets/images/spareLogo.png";
 

function Header (props) {
    const data=localStorage.getItem("user");
    const userType=JSON.parse(data);
    const  headerData=JSON.parse(data)
   const history=useHistory();
    const handleSignout=()=>{
        localStorage.removeItem("user")
        history.push("/user/sign-in");
    }
    //  console.log("headerData",headerData);
        return (
            <div className="header">
                <nav className="navbar py-4">
                    <div className="container-xxl">
                        <div className="h-right d-flex align-items-center mr-5 mr-lg-0 order-1">  
                            <div className="d-flex mt-1" >
                                <Link to="help" className="nav-link text-primary collapsed" title="Get Help" >
                                   <div style={{fontSize:"30px",marginTop:"-20px"}}> <i style={{fontSize:"35px",}} className="icofont-info-square fs-51"></i></div>
                                </Link>
                            </div>
                            <Dropdown className="zindex-popover mx-2">
                                
                                {/* <Dropdown.Toggle as='a' className="nav-Dropdown.Itemnk dropdown-toggle pulse" href="#!" >
                                    <Image src={userType?.role==="ADMIN" ? ImageLogo : userType?.brandLogo} alt='logo'height="30" width="30" />
                                </Dropdown.Toggle> */}
                                {/* <Dropdown.Menu className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-md-end p-0 m-0 mt-5 ">
                                    <div className="card border-0">
                                        <ul className="list-unstyled list py-2 px-3">
                                            <li>
                                                <Dropdown.Item href="#!"><Image src={GB} alt="" /> English</Dropdown.Item>
                                            </li>
                                            <li>
                                                <Dropdown.Item href="#!"><Image src={DE} alt="" /> German</Dropdown.Item>
                                            </li>
                                            <li>
                                                <Dropdown.Item href="#!"><Image src={FR} alt="" /> French</Dropdown.Item>
                                            </li>
                                            <li>
                                                <Dropdown.Item href="#!"><Image src={IT} alt="" /> Italian</Dropdown.Item>
                                            </li>
                                            <li>
                                                <Dropdown.Item href="#!"><Image src={RU} alt="" /> Russian</Dropdown.Item>
                                            </li>
                                        </ul>
                                    </div>
                                </Dropdown.Menu> */}
                            </Dropdown>
                            <Dropdown className="notifications zindex-popover">
                                <Dropdown.Toggle as="a" className="nav-link dropdown-toggle pulse" style={{fontSize:"35px",marginTop:"-20px"}}>
                                    <i className="icofont-alarm fs-51 me-3" ></i>
                                    <span className="pulse-ring"></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="rounded-lg shadow border-0 dropdown-animation dropdown-menu-sm-end p-0 m-0">
                                    <div className="card border-0 w380">
                                        <div className="card-header border-0 p-3">
                                            <h5 className="mb-0 font-weight-light d-flex justify-content-between">
                                                <span>Notifications</span>
                                                <span className="badge text-white">06</span>
                                            </h5>
                                        </div>
                                        <div className=" card-body">
                                            <div className="">
                                                <ul className="list-unstyled list mb-0">
                                                    <li className="py-2 mb-1 border-bottom">
                                                        <a href="#!" className="d-flex">
                                                            <img className="avatar rounded-circle" src={Avatar1} alt="" />
                                                            <div className="flex-fill ms-2">
                                                                <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Dylan Hunter</span> <small>2MIN</small></p>
                                                                <span className="">Added  2021-02-19 my-Task ui/ux Design <span className="badge bg-success">Review</span></span>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="py-2 mb-1 border-bottom">
                                                        <a href="#!" className="d-flex">
                                                            <div className="avatar rounded-circle no-thumbnail">DF</div>
                                                            <div className="flex-fill ms-2">
                                                                <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Diane Fisher</span> <small>13MIN</small></p>
                                                                <span className="">Task added Get Started with Fast Cad project</span>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="py-2 mb-1 border-bottom">
                                                        <a href="#!" className="d-flex">
                                                            <img className="avatar rounded-circle" src={Avatar3} alt="" />
                                                            <div className="flex-fill ms-2">
                                                                <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Andrea Gill</span> <small>1HR</small></p>
                                                                <span className="">Quality Assurance Task Completed</span>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="py-2 mb-1 border-bottom">
                                                        <a href="#!" className="d-flex">
                                                            <img className="avatar rounded-circle" src={Avatar5} alt="" />
                                                            <div className="flex-fill ms-2">
                                                                <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Diane Fisher</span> <small>13MIN</small></p>
                                                                <span className="">Add New Project for App Developemnt</span>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="py-2 mb-1 border-bottom">
                                                        <a href="#!" className="d-flex">
                                                            <img className="avatar rounded-circle" src={Avatar6} alt="" />
                                                            <div className="flex-fill ms-2">
                                                                <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Andrea Gill</span> <small>1HR</small></p>
                                                                <span className="">Add Timesheet For Rhinestone project</span>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="py-2">
                                                        <a href="#!" className="d-flex">
                                                            <img className="avatar rounded-circle" src={Avatar7} alt="" />
                                                            <div className="flex-fill ms-2">
                                                                <p className="d-flex justify-content-between mb-0 "><span className="font-weight-bold">Zoe Wright</span> <small className="">1DAY</small></p>
                                                                <span className="">Add Calander Event</span>
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <a className="card-footer text-center border-top-0" href="#!"> View all notifications</a>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown className="dropdown user-profilem ml-2 ml-sm-3 d-flex align-items-center zindex-popover">
                                <div className="u-info me-2 d-flex flex-column justify-content-center align-items-center">
                                    <p className="mb-0 text-end line-height-sm "><span className="font-weight-bold">{headerData?.brandName}</span></p>
                                   <p> { headerData && headerData?.role==="ADMIN" ? <small> Admin Profile </small>: <small> Brand Profile </small>}</p>
                                </div>
                                <Dropdown.Toggle as='a' className="nav-link dropdown-toggle pulse p-0 mb-3" href="#!" role="button">
                                    <img className="img-thumbnail rounded-circle " src={userType?.role==="ADMIN" ? ImageLogo ? ImageLogo : Avatar4 : userType?.brandLogo ? userType?.brandLogo : Avatar4 } alt="profile" height="45px" width="45px"/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0 mt-5 ">
                                    <div className="card border-0   w280">
                                        <div className="card-body pb-0 ">
                                            <div className="d-flex py-1">
                                                <img className="avatar rounded-circle" src={Profile} alt="" />
                                                <div className="flex-fill ms-3">
                                                    <p className="mb-0"><span className="font-weight-bold"> {headerData?.brandName}</span></p>
                                                    <small> {headerData?.email}</small>
                                                </div>
                                            </div>
                                            <div><hr className="dropdown-divider border-dark " /></div>
                                        </div>
                                        <div className="list-group m-2 ">
                                            <Link to={`${props?.url}/profile-pages`} className="list-group-item list-group-item-action border-0 "><i className="icofont-ui-user fs-5 me-3"></i>Profile Page</Link>
                                            <Link to={process.env.PUBLIC_URL+"/order-invoice"} className="list-group-item list-group-item-action border-0 "><i className="icofont-file-text fs-5 me-3"></i>Order Invoices</Link>
                                            <div onClick={handleSignout} className="list-group-item list-group-item-action border-0 "><i className="icofont-logout fs-5 me-3"></i>Signout</div>
                                        </div>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="setting ms-2" style={{marginTop:"-17px"}}>
                                <a href='#!' onClick={(val) => {props.Onopenmodalsetting(true) }}style={{fontSize:"40px"}} ><i className="icofont-gear-alt fs-51"></i></a>
                            </div>
                        </div>
                        <button className="navbar-toggler p-0 border-0 menu-toggle order-3" type="button" onClick={() => {
                            var sidebar = document.getElementById('mainsidemenu')
                           
                            if (sidebar) {
    
                                if (sidebar.classList.contains('open')) {
                                    sidebar.classList.remove('open')
                                } else {
                                    sidebar.classList.add('open')
                                }
                            }
                        }}>
                            <span className="fa fa-bars"></span>
                        </button>
                        <div className="order-0 col-lg-4 col-md-4 col-sm-12 col-12 mb-4  ">
                            <div className="input-group flex-nowrap input-group-lg">
                                <input type="search" className="form-control" placeholder="Search" />
                                <button type="button" className="input-group-text" id="addon-wrapping"><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }


const mapSatetToProps = ({ Mainreducer }) => ({
    Mainreducer
})


export default connect(mapSatetToProps, {
    Onopenmodalsetting
})(Header);