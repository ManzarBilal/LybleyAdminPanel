import React from 'react';
import Dashboard from './Dashboard/Dashboard';
import ProductGrid from './Products/ProductGrid';
import ProductList from './Products/ProductList';
import { Switch, Route,Redirect } from 'react-router-dom';
import ProductEdit from './Products/ProductEdit';
import ProductDetail from './Products/ProductDetail';
import ProductAdd from './Products/ProductAdd';
import ShoppingCart from './Products/ShoppingCart';
import Header from '../components/common/Header';
import CheckOut from './Products/CheckOut';
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

function MainIndex (props) {
    const { activekey } = props;
    return (
      <div className='main px-lg-4 px-md-4' >
        {activekey === "/chat" ? "" : <Header />}
        <div className="body d-flex py-3 ">
          <Switch>
            {/* <Route exact path={process.env.PUBLIC_URL + "/ghj"} render={() => { return <Dashboard /> }} /> */}
            <Route exact path={process.env.PUBLIC_URL + "/dashboard"} render={() => { return <Dashboard /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/product-grid'} render={() => { return <ProductGrid /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/product-list'} render={() => { return <ProductList /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/product-edit'} render={() => { return <ProductEdit /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/product-detail'} render={() => { return <ProductDetail /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/product-Add'} render={() => { return <ProductAdd /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/shopping-cart'} render={() => { return <ShoppingCart /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/check-out'} render={() => { return <CheckOut /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/categories-list'} render={() => { return <CategoriesList /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/categories-edit'} render={() => { return <CategoriesEdit /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/categories-add'} render={() => { return <CategoriesAdd /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/order-list'} render={() => { return <OrderList /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/order-detail'} render={() => { return <OrderDetail /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/order-invoice'} render={() => { return <OrderInvoice /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/customer-list'} render={() => { return <CustomerList /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/customer-detail'} render={() => { return <CustomerDetail /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/coupons-list'} render={() => { return <CouponsList /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/coupons-add'} render={() => { return <CouponsAdd /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/coupons-edit'} render={() => { return <CouponsEdit /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/stock-list'} render={() => { return <StockList /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/purchase'} render={() => { return <Purchase /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/supplier'} render={() => { return <Supplier /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/return'} render={() => { return <Return /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/departments'} render={() => { return <Departments /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/invoices'} render={() => { return <Invoices /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/simple-invoice'} render={() => { return <SimpleInvoice /> }} />

            <Route exact path={process.env.PUBLIC_URL + '/expense'} render={() => { return <Expense /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/salaryslip'} render={() => { return <Salaryslip /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/chat'} render={() => { return <Chat /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/calendar'} render={() => { return <Calendar /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/store-location'} render={() => { return <StoreLocation /> }} />

            <Route exact path={process.env.PUBLIC_URL + '/profile-pages'} render={() => { return <ProfilePage /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/price-plan'} render={() => { return <PricePlanExample /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/contact-us'} render={() => { return <ContactUs /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/icons'} render={() => { return <Icons /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/form-example'} render={() => { return <FormsExample /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/table-example'} render={() => { return <TableExample /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/charts-example'} render={() => { return <ChartsExample /> }} />

            <Route exact path={process.env.PUBLIC_URL + '/ui-alerts'} render={() => { return <Alerts /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-badge'} render={() => { return <Badges /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-breadcrumb'} render={() => { return <Breadcrumb /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-buttons'} render={() => { return <Buttons /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-card'} render={() => { return <Cards /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-carousel'} render={() => { return <Carousel /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-collapse'} render={() => { return <Collapse /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-dropdowns'} render={() => { return <Dropdowns /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-listgroup'} render={() => { return <ListGroup /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-modalui'} render={() => { return <ModalUI /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-navbarui'} render={() => { return <NavbarUI /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-navsui'} render={() => { return <NavsUI /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-paginationui'} render={() => { return <PaginationUI /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-popoversui'} render={() => { return <PopoversUI /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-progressui'} render={() => { return <ProgressUI /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-Scrollspyui'} render={() => { return <Scrollspy /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-spinnersui'} render={() => { return <SpinnersUI /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/ui-toastsui'} render={() => { return <ToastsUI /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/stater-page'} render={() => { return <StaterPage /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/documentation'} render={() => { return <Documentation /> }} />
            <Route exact path={process.env.PUBLIC_URL + '/changelog'} render={() => { return <Changelog /> }} />

            <Route exact path={process.env.PUBLIC_URL + '/help'} render={() => { return <Help /> }} />
            <Redirect from='/' to={process.env.PUBLIC_URL + '/sign-in'}/>
          </Switch>
        </div>
      </div>
    );
  }
export default MainIndex;