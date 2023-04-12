import React from 'react';
import AuthLeft from '../components/Auth/AuthLeft';
import { Switch, Route, Redirect } from 'react-router-dom';
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
                <Route exact path="/user/sign-in" render={(props) => { return <SignIn url={props?.url} {...props} /> }} />
                <Route exact path="/user/sign-up" render={() => { return <Signup url={props?.url}/> }} />
                <Route exact path="/user/new-password" render={() => { return <Newpassword url={props?.url}/> }} />
                <Route exact path="/user/reset-password" render={() => { return <Resetpassword url={props?.url} /> }} />
                <Route exact path="/user/verification" render={() => { return <Verification url={props?.url}/> }} />
                <Route exact path="/user/page-404" render={() => { return <Page404 user={props?.user} /> }} />
                <Redirect  form="/" to="/user/sign-in" />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default AuthIndex;