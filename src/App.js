import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import AddModal from './components/common/AddModal';
import Sidebar from './components/common/Sidebar';
import AuthIndex from "./screens/AuthIndex";
import MainIndex from './screens/MainIndex';

function App(props) {
  const activekey = () => {
    var res = window.location.pathname;
    var baseUrl = process.env.PUBLIC_URL;
    baseUrl = baseUrl.split("/");
    res = res.split("/");
    res = res.length > 0 ? res[baseUrl.length] : "/";
    res = res ? "/" + res : "/";
    const activeKey1 = res;
    return activeKey1
  }
  if (activekey() === '/sign-in' || activekey() === '/sign-up' || activekey() === '/reset-password' || activekey() === '/verification' || activekey() === '/page-404') {
    return (
      <div id="ebazar-layout" className='theme-blue'>
        <Switch>
          <AuthIndex />
        </Switch>
      </div>
    );
  }
  return (
    <div id="ebazar-layout" className='theme-blue'>
      <Sidebar activekey={activekey()} history={props.history} />
      <AddModal />
      <Switch>
        <MainIndex activekey={activekey()} />
      </Switch>
    </div>
  )
}
export default withRouter(App);