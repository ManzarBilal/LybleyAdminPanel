import React from 'react';
import AuthLeft from '../components/Auth/AuthLeft';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../components/Auth/SignIn';
import Signup from '../components/Auth/Signup';
import Resetpassword from '../components/Auth/Resetpassword';
import Verification from '../components/Auth/Verification';
import Page404 from '../components/Auth/Page404';
import Newpassword from '../components/Auth/NewPassword';

function AuthIndex (props) {
  
    return (
      <div className='main p-2 py-3 p-xl-5 '>
        <div className='body d-flex p-0 p-xl-5'>
          <div className='container-xxl'>
            <div className='row g-0'>
              <AuthLeft />
              <Switch>
                <Route exact path={props?.url+"/sign-in"} render={() => { return <SignIn url={props?.url} /> }} />
                <Route exact path={props?.url+"/sign-up"} render={() => { return <Signup /> }} />
                <Route exact path={props?.url+"/new-password"} render={() => { return <Newpassword /> }} />
                <Route exact path={props?.url+"/reset-password"} render={() => { return <Resetpassword /> }} />
                <Route exact path={props?.url+"/verification"} render={() => { return <Verification /> }} />
                <Route exact path={props?.url+"/page-404"} render={() => { return <Page404 /> }} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default AuthIndex;