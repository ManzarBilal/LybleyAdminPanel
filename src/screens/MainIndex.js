import React from 'react';
import Dashboard from './Dashboard/Dashboard';
import ProductGrid from './Products/ProductGrid';
import ProductList from './Products/ProductList';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProductEdit from './Products/ProductEdit';
import ProductDetail from './Products/ProductDetail';
import ProductAdd from './Products/ProductAdd';
import Header from '../components/common/Header';
import CategoriesList from './Categories/CategoriesList';
import OrderList from './Orders/OrderList';
import OrderDetail from './Orders/OrderDetail';
import OrderInvoice from './Orders/OrderInvoice';
import CustomerList from './Customers/CustomerList';
import CustomerDetail from './Customers/CustomerDetail';
import CouponsList from './SalesPromotion.js/CouponsList';
import CouponsAdd from './SalesPromotion.js/CouponsAdd';
import CouponsEdit from './SalesPromotion.js/CouponsEdit';
import StockList from './Inventory/StockList';
import Purchase from './Inventory/Purchase';
import Supplier from './Inventory/Supplier';
import Return from './Inventory/Return';
import Departments from './Inventory/Departments';
import Invoices from './Accounts/Invoices';
import Expense from './Accounts/Expense';
import Salaryslip from './Accounts/Salaryslip';
import Chat from './App/Chat';
import ProfilePage from './Other Pages/ProfilePage'
import PricePlanExample from './Other Pages/PricePlanExample';
import ContactUs from './Other Pages/ContactUs';
import Icons from './Other Pages/Icon';
import FormsExample from './Other Pages/FormsExample';
import TableExample from './Other Pages/TableExample';
import ChartsExample from './Other Pages/ChartsExample';
import Alerts from './Uicomponent/Alerts';
import Badges from './Uicomponent/Badge';
import Breadcrumb from './Uicomponent/Breadcrumb';
import Buttons from './Uicomponent/Buttons';
import Cards from './Uicomponent/Card';
import Carousel from './Uicomponent/Carousel';
import Collapse from './Uicomponent/Collapse';
import Dropdowns from './Uicomponent/Dropdowns';
import ListGroup from './Uicomponent/ListGroup';
import ModalUI from './Uicomponent/Modal';
import NavbarUI from './Uicomponent/Navbar';
import NavsUI from './Uicomponent/Navs';
import PaginationUI from './Uicomponent/Pagination';
import PopoversUI from './Uicomponent/Popovers';
import ProgressUI from './Uicomponent/Progress';
import Scrollspy from './Uicomponent/Scrollspy';
import SpinnersUI from './Uicomponent/Spinners';
import ToastsUI from './Uicomponent/Toasts';
import Calendar from './App/Calendar';
import StaterPage from './Stater Page/StaterPage';
import Documentation from './Documentation/Documentation';
import Changelog from './Changelog/Changelog';
import CategoriesEdit from './Categories/CategoriesEdit';
import CategoriesAdd from './Categories/CategoriesAdd';
import StoreLocation from './StoreLocation/Storelocation';
import Help from './Help/Help';
import SimpleInvoice from '../components/Accounts/Invoice/SimpleInvoice';
import BrandList from './Brand/BrandList';
import SparePartGrid from './SpareParts/SparePartGrid';
import SparePartList from './SpareParts/SparePartList';
import SparePartEdit from './SpareParts/SparePartEdit';
import SparePartAdd from './SpareParts/SparePartAdd';
import SparePartVideos from './SpareParts/SparePartVideos';
import FaultList from './SpareParts/FaultList';
import CategoryList from './ProductCategory/CategoryList';
import BookingList from './Bookings/BookingsList';
import BookingDetail from './Bookings/BookingDetails';
import AllBrandsPayments from './PaymentsDeatails/AllBrandsPayments';
import BrandPayment from './PaymentsDeatails/BrandPayment';
import BankAccount from './PaymentsDeatails/BankAccount';

function MainIndex(props) {

  //  const { activekey } = props;

  return (
    <div className='main px-lg-4 px-md-4' >
      <Header url={props?.url} />
      <div className="body d-flex py-3 ">
        <Switch>
          {/* <Route exact path={props?.url + "/ghj"} render={() => { return <Dashboard /> }} /> */}
          <Route exact path={props?.url + '/dashboard'} render={() => { return <Dashboard /> }} />
          <Route exact path={props?.url + '/brand-list'} render={() => { return <BrandList /> }} />

          <Route exact path={props?.url + '/category-list'} render={() => { return <CategoryList /> }} />

          <Route exact path={props?.url + '/product-grid'} render={() => { return <ProductGrid url={props?.url} /> }} />
          <Route exact path={props?.url + '/product-list'} render={() => { return <ProductList url={props?.url} /> }} />
          <Route exact path={props?.url + '/product-edit/:id'} render={() => { return <ProductEdit url={props?.url} /> }} />
          <Route exact path={props?.url + '/product-detail'} render={() => { return <ProductDetail /> }} />
          <Route exact path={props?.url + '/product-Add'} render={() => { return <ProductAdd /> }} />

          <Route exact path={props?.url + '/spareParts-grid'} render={() => { return <SparePartGrid url={props?.url} /> }} />
          <Route exact path={props?.url + '/spareParts-list'} render={() => { return <SparePartList url={props?.url} /> }} />
          <Route exact path={props?.url + '/sparePart-edit/:id'} render={() => { return <SparePartEdit url={props?.url} /> }} />
          <Route exact path={props?.url + '/spareParts-detail'} render={() => { return <ProductDetail /> }} />
          <Route exact path={props?.url + '/spareParts-Add'} render={() => { return <SparePartAdd /> }} />
          <Route exact path={props?.url + '/spareParts-fault'} render={() => { return <FaultList /> }} />
          <Route exact path={props?.url + '/spareParts-videos'} render={() => { return <SparePartVideos /> }} />

          {/* <Route exact path={props?.url + '/product-grid'} render={() => { return <ProductGrid url={props?.url} /> }} />
          <Route exact path={props?.url + '/product-list'} render={() => { return <ProductList url={props?.url} /> }} />
          <Route exact path={props?.url + '/product-edit'} render={() => { return <ProductEdit /> }} />
          <Route exact path={props?.url + '/product-detail'} render={() => { return <ProductDetail /> }} />
          <Route exact path={props?.url + '/product-Add'} render={() => { return <ProductAdd /> }} />
          <Route exact path={props?.url + '/shopping-cart'} render={() => { return <ShoppingCart /> }} />
          <Route exact path={props?.url + '/check-out'} render={() => { return <CheckOut /> }} /> */}


          <Route exact path={props?.url + '/categories-list'} render={() => { return <CategoriesList /> }} />
          <Route exact path={props?.url + '/categories-edit'} render={() => { return <CategoriesEdit /> }} />
          <Route exact path={props?.url + '/categories-add'} render={() => { return <CategoriesAdd /> }} />


          <Route exact path={props?.url + '/order-list'} render={() => { return <OrderList  url={props?.url} /> }} />
          <Route exact path={props?.url + '/order-detail/:id'} render={() => { return <OrderDetail /> }} />
          <Route exact path={props?.url + '/booking-list'} render={() => { return <BookingList  url={props?.url} /> }} />
          <Route exact path={props?.url + '/booking-detail/:id'} render={() => { return <BookingDetail /> }} />

          <Route exact path={props?.url + '/allBrandsPayments'} render={() => { return <AllBrandsPayments url={props?.url}/> }} />
          <Route exact path={props?.url + '/brandPayments/:id'} render={() => { return <BrandPayment url={props?.url}/> }} />
          <Route exact path={props?.url + '/bankAccount'} render={() => { return <BankAccount url={props?.url}/> }} />


          <Route exact path={props?.url + '/order-invoice'} render={() => { return <OrderInvoice /> }} />
          <Route exact path={props?.url + '/customer-list'} render={() => { return <CustomerList /> }} />
          <Route exact path={props?.url + '/customer-detail'} render={() => { return <CustomerDetail /> }} />
          <Route exact path={props?.url + '/coupons-list'} render={() => { return <CouponsList /> }} />
          <Route exact path={props?.url + '/coupons-add'} render={() => { return <CouponsAdd /> }} />
          <Route exact path={props?.url + '/coupons-edit'} render={() => { return <CouponsEdit /> }} />
          <Route exact path={props?.url + '/stock-list'} render={() => { return <StockList /> }} />
          <Route exact path={props?.url + '/purchase'} render={() => { return <Purchase /> }} />
          <Route exact path={props?.url + '/supplier'} render={() => { return <Supplier /> }} />
          <Route exact path={props?.url + '/return'} render={() => { return <Return /> }} />
          <Route exact path={props?.url + '/departments'} render={() => { return <Departments /> }} />
          <Route exact path={props?.url + '/invoices'} render={() => { return <Invoices /> }} />
          <Route exact path={props?.url + '/simple-invoice'} render={() => { return <SimpleInvoice /> }} />

          <Route exact path={props?.url + '/expense'} render={() => { return <Expense /> }} />
          <Route exact path={props?.url + '/salaryslip'} render={() => { return <Salaryslip /> }} />
          <Route exact path={props?.url + '/chat'} render={() => { return <Chat /> }} />
          <Route exact path={props?.url + '/calendar'} render={() => { return <Calendar /> }} />
          <Route exact path={props?.url + '/store-location'} render={() => { return <StoreLocation /> }} />

          <Route exact path={props?.url + '/profile-pages'} render={() => { return <ProfilePage /> }} />
          <Route exact path={props?.url + '/price-plan'} render={() => { return <PricePlanExample /> }} />
          <Route exact path={props?.url + '/contact-us'} render={() => { return <ContactUs /> }} />
          <Route exact path={props?.url + '/icons'} render={() => { return <Icons /> }} />
          <Route exact path={props?.url + '/form-example'} render={() => { return <FormsExample /> }} />
          <Route exact path={props?.url + '/table-example'} render={() => { return <TableExample /> }} />
          <Route exact path={props?.url + '/charts-example'} render={() => { return <ChartsExample /> }} />

          <Route exact path={props?.url + '/ui-alerts'} render={() => { return <Alerts /> }} />
          <Route exact path={props?.url + '/ui-badge'} render={() => { return <Badges /> }} />
          <Route exact path={props?.url + '/ui-breadcrumb'} render={() => { return <Breadcrumb /> }} />
          <Route exact path={props?.url + '/ui-buttons'} render={() => { return <Buttons /> }} />
          <Route exact path={props?.url + '/ui-card'} render={() => { return <Cards /> }} />
          <Route exact path={props?.url + '/ui-carousel'} render={() => { return <Carousel /> }} />
          <Route exact path={props?.url + '/ui-collapse'} render={() => { return <Collapse /> }} />
          <Route exact path={props?.url + '/ui-dropdowns'} render={() => { return <Dropdowns /> }} />
          <Route exact path={props?.url + '/ui-listgroup'} render={() => { return <ListGroup /> }} />
          <Route exact path={props?.url + '/ui-modalui'} render={() => { return <ModalUI /> }} />
          <Route exact path={props?.url + '/ui-navbarui'} render={() => { return <NavbarUI /> }} />
          <Route exact path={props?.url + '/ui-navsui'} render={() => { return <NavsUI /> }} />
          <Route exact path={props?.url + '/ui-paginationui'} render={() => { return <PaginationUI /> }} />
          <Route exact path={props?.url + '/ui-popoversui'} render={() => { return <PopoversUI /> }} />
          <Route exact path={props?.url + '/ui-progressui'} render={() => { return <ProgressUI /> }} />
          <Route exact path={props?.url + '/ui-Scrollspyui'} render={() => { return <Scrollspy /> }} />
          <Route exact path={props?.url + '/ui-spinnersui'} render={() => { return <SpinnersUI /> }} />
          <Route exact path={props?.url + '/ui-toastsui'} render={() => { return <ToastsUI /> }} />
          <Route exact path={props?.url + '/stater-page'} render={() => { return <StaterPage /> }} />
          <Route exact path={props?.url + '/documentation'} render={() => { return <Documentation /> }} />
          <Route exact path={props?.url + '/changelog'} render={() => { return <Changelog /> }} />

          <Route exact path={props?.url + '/help'} render={() => { return <Help /> }} />
          {/* <Redirect from='/' to={props?.url+'/dashboard'}/> */}
          {props?.url === "/admin" ? <Redirect from='/' to={props?.url + '/dashboard'} /> : <Redirect from='/' to={'/user/page-404'} />}
        </Switch>
      </div>
    </div>
  );
}
export default MainIndex;