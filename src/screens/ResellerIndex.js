import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Header from '../components/common/Header';
import OrderList from './Orders/OrderList';
import OrderDetail from './Orders/OrderDetail';
import OrderInvoice from './Orders/OrderInvoice';
import CustomerList from './Customers/CustomerList';
import CustomerDetail from './Customers/CustomerDetail';
import ProfilePage from './Other Pages/ProfilePage' 
import Help from './Help/Help';
import SparePartAdd from './SpareParts/SparePartAdd';
import SparePartGrid from './SpareParts/SparePartGrid';
import SparePartList from './SpareParts/SparePartList';
import SparePartEdit from './SpareParts/SparePartEdit';
import FaultList from './SpareParts/FaultList';
import SparePartVideos from './SpareParts/SparePartVideos';
import BrandPayments from './PaymentsDeatails/BrandPayments';
import BankAccount from './PaymentsDeatails/BankAccount';
import ReturnList from './Orders/ReturnList';
import ReturnDetails from './Orders/ReturnDetails';
import ReturnRequest from './Orders/ReturnRequest';
import CustomerOrderList from './Customers/CustomerOrder';
import ProductDetail from './Products/ProductDetail';
import PickupLocation from './PickupLocation/PickupLocation';
import ShipOrderList from './ShipRocket/OrderList';
import AllShipmentsList from './ShipRocket/AllShipments';
import CourierPartners from './ShipRocket/CourierPartners';
import BrandShipOrderList from './ShipRocket/BrandOrderList';
import TechnicianCharges from './TechnicianCharges/TechnicianCharges';
import Wallet from './Wallet/Wallet';
const ResellerIndex = (props) => {
  const { activekey } = props;
  return (
    <div className='main px-lg-4 px-md-4' >
      {activekey === "/chat" ? "" :
        <Header url={props?.url} />
      }
      <div className="body d-flex py-3 ">
        <Switch>
          {/* <Route exact path={props?.url + "/ghj"} render={() => { return <Dashboard /> }} /> */}
          <Route exact path={props?.url + '/dashboard'} render={() => { return <Dashboard url={props?.url}/> }} />

          <Route exact path={props?.url + '/pickupLocation'} render={() => { return <PickupLocation url={props?.url}/> }} />

          <Route exact path={props?.url + '/wallet'} render={() => { return <Wallet url={props?.url}/> }} />

          {/* <Route exact path={props?.url + '/technicianCharges'} render={() => { return <TechnicianCharges url={props?.url}/> }} /> */}

          <Route exact path={props?.url + '/spareParts-grid'} render={() => { return <SparePartGrid url={props?.url} /> }} />
          <Route exact path={props?.url + '/spareParts-list'} render={() => { return <SparePartList url={props?.url} /> }} />
          <Route exact path={props?.url + '/sparePart-edit/:id'} render={() => { return <SparePartEdit url={props?.url} /> }} />
          <Route exact path={props?.url + '/spareParts-detail'} render={() => { return < ProductDetail /> }} />
          <Route exact path={props?.url + '/spareParts-Add'} render={() => { return <SparePartAdd /> }} />
          <Route exact path={props?.url + '/spareParts-fault'} render={() => { return <FaultList /> }} />
          <Route exact path={props?.url + '/spareParts-videos'} render={() => { return <SparePartVideos /> }} />

          <Route exact path={props?.url + '/order-list'} render={() => { return <OrderList url={props?.url} /> }} />
          <Route exact path={props?.url + '/order-detail/:id'} render={() => { return <OrderDetail /> }} />
          <Route exact path={props?.url + '/return-list'} render={() => { return <ReturnList url={props?.url} /> }} />
          <Route exact path={props?.url + '/return-request-list'} render={() => { return <ReturnRequest url={props?.url} /> }} />
          <Route exact path={props?.url + '/return-detail/:id'} render={() => { return <ReturnDetails /> }} />


          <Route exact path={props?.url + '/brandPayments'} render={() => { return <BrandPayments url={props?.url} /> }} />
          <Route exact path={props?.url + '/bankAccount'} render={() => { return <BankAccount url={props?.url} /> }} />



          <Route exact path={props?.url + '/order-invoice'} render={() => { return <OrderInvoice /> }} />
          <Route exact path={props?.url + '/customer-list'} render={() => { return <CustomerList url={props?.url}/> }} />
          <Route exact path={props?.url + '/customer-Allorders/:id'} render={() => { return <CustomerOrderList url={props?.url} /> }} />

          <Route exact path={props?.url + '/customer-detail'} render={() => { return <CustomerDetail /> }} />
          <Route exact path={props?.url + '/profile-pages'} render={() => { return <ProfilePage /> }} />
          <Route exact path={props?.url + '/help'} render={() => { return <Help /> }} />
          {props?.url === "/reseller" ? <Redirect from='/' to={props?.url + '/dashboard'} /> : <Redirect from='/' to={'/user/page-404'} />}


          <Route exact path={props?.url + '/shipRocketOrder-list/:id'} render={() => { return <BrandShipOrderList url={props?.url} /> }} /> 
          <Route exact path={props?.url + '/allShipments-list'} render={() => { return <AllShipmentsList url={props?.url} /> }} /> 
          <Route exact path={props?.url + '/coirierPartners'} render={() => { return <CourierPartners url={props?.url} /> }} />
        </Switch>
      </div>
    </div>
  )
}

export default ResellerIndex;