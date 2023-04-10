import React from 'react'
import { Switch,Redirect } from 'react-router-dom';
import AuthLeft from '../components/Auth/AuthLeft';
import Page404 from '../components/Auth/Page404';
const BrandIndex = () => {
    return (
        <div className='main p-2 py-3 p-xl-5 '>
          <div className='body d-flex p-0 p-xl-5'>
            <div className='container-xxl'>
              <div className='row g-0'>
                <AuthLeft />
                <Switch>
                  <Redirect from="/" to={process.env.PUBLIC_URL+"/page-404"} render={() => { return <Page404 /> }} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
  )
}

export default BrandIndex;