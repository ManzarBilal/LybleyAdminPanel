import React, { useEffect } from 'react';
import { Redirect, Switch,Route, withRouter,useHistory } from 'react-router-dom';
import AddModal from './components/common/AddModal';
import Sidebar from './components/common/Sidebar';
import AuthIndex from "./screens/AuthIndex";
import MainIndex from './screens/MainIndex';
import { Toaster } from 'react-hot-toast';
import BrandIndex from './screens/BrandIndex';
import SignIn from './components/Auth/SignIn';
import ResellerIndex from './screens/ResellerIndex';
 

function App(props) {
const history=useHistory()
  // useEffect(()=>{
  //   let user1 = localStorage.getItem("user");
  //   let user = JSON.parse(user1);
  //   user?.role==="ADMIN" ? history.push("/admin/dashboard"):
  //   user?.role==="BRAND" ?history.push("/brand/dashboard")
  //   : history.push("/user/sign-in")
     
  // },[])
  let user1 = localStorage.getItem("user");
  let user = JSON.parse(user1);
 // let user = 
  let url=user && user?.role==="ADMIN" ? "/admin" : user && user?.role==="BRAND" ? "/brand" : user && user?.role==="RESELLER" ?"/reseller":"/user";
  const activekey = () => {
    var res = window.location.pathname;
  //  var res = url;
    var baseUrl = user && user?.role==="ADMIN" ? "/admin" : user && user?.role==="BRAND" ? "/brand" : user && user?.role==="RESELLER" ?"/reseller": "/user";
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
      <div id="ebazar-layout" className='theme-black'>
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
      <div id="ebazar-layout" className='theme-black'>
        <Toaster />
        <Sidebar url={"/admin"} user={user} activekey={activekey()} history={props.history} />
        <AddModal />
        <Switch>
          <MainIndex url={"/admin"} activekey={activekey()} />
        </Switch>
      </div>
    )
  }
  else if(user && user.role === "RESELLER"){
    return (
      <div id="ebazar-layout" className='theme-black'>
        <Toaster />
        <Sidebar url={"/reseller"} user={user} activekey={activekey()} history={props.history} />
        <AddModal />
        <Switch>
          <ResellerIndex url={"/reseller"} activekey={activekey()} />
        </Switch>
      </div>
    )
  }
  else{
    return(
      <div id="ebazar-layout" className='theme-blue'>
    <Switch>
      <Route exact path="/user/sign-in" render={(props) => { return <SignIn url={url} {...props} /> }} />
      <Redirect from="/" to="/user/sign-in" />
    </Switch>
    </div>
  )}
}
export default withRouter(App);