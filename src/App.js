import React from 'react';
import { Redirect, Switch, withRouter } from 'react-router-dom';
import AddModal from './components/common/AddModal';
import Sidebar from './components/common/Sidebar';
import AuthIndex from "./screens/AuthIndex";
import MainIndex from './screens/MainIndex';
import { Toaster } from 'react-hot-toast';
import BrandIndex from './screens/BrandIndex';

function App(props) {
  let user1 = localStorage.getItem("user");
  let user = JSON.parse(user1);
 // let user = 
  let url=user && user?.role==="ADMIN" ? "/admin" : user && user?.role==="BRAND" ? "/brand" : "/user";
  console.log(url,"url");
  const activekey = () => {
    var res = window.location.pathname;
  //  var res = url;
    var baseUrl = user && user?.role==="ADMIN" ? "/admin" : user && user?.role==="BRAND" ? "/brand" : "/user";
   // var baseUrl = process.env.PUBLIC_URL;
    baseUrl = baseUrl?.split("/");
    res = res?.split("/");
    res = res?.length > 0 ? res[baseUrl.length] : "/";
    res = res ? "/" + res : "/";
    const activeKey1 = res;
    return activeKey1
  }
  if (activekey() === '/sign-in' || activekey() === '/new-password' || activekey() === '/sign-up' || activekey() === '/reset-password' || activekey() === '/verification' || activekey() === '/page-404') {
    return (
      <div id="ebazar-layout" className='theme-blue'>
        <Toaster />
        <Switch>
          <AuthIndex user={user} url={url} />
        </Switch>
      </div>
    );
  }
  else if (user && user.role === "BRAND") {
    return (
      <div id="ebazar-layout" className='theme-blue'>
        <Toaster />
        <Sidebar url={"/brand"} user={user} activekey={activekey()} history={props.history} />
        <AddModal />
        <Switch>
          <BrandIndex url={"/brand"} activekey={activekey()} />
        </Switch>
      </div>
    )
  }
  else if(user && user.role === "ADMIN"){
    return (
      <div id="ebazar-layout" className='theme-blue'>
        <Toaster />
        <Sidebar url={"/admin"} user={user} activekey={activekey()} history={props.history} />
        <AddModal />
        <Switch>
          <MainIndex url={"/admin"} activekey={activekey()} />
        </Switch>
      </div>
    )
  }
  else{
    <Switch>
      <Redirect from="/" to="/user/page-404" />
    </Switch>
  }
}
export default withRouter(App);