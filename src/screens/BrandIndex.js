import React from 'react'
import { Switch,Redirect, Route } from 'react-router-dom';
import BrandList from './Brand/BrandList';
import Header from '../components/common/Header';
const BrandIndex = (props) => {
  const { activekey } = props;
    return (
      <div className='main px-lg-4 px-md-4' >
      {activekey === "/chat" ? "" : <Header />}
      <div className="body d-flex py-3 ">
                <Switch>
                  <Route exact path={process.env.PUBLIC_URL+"/brand"} render={() => { return <BrandList /> }} />
                  <Redirect from="/" to={process.env.PUBLIC_URL+"/brand"} render={() => { return <BrandList /> }} />
                </Switch>
                </div>
      </div>
  )
}

export default BrandIndex;