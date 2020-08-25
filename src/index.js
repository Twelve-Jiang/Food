import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router,Route,Redirect,Switch}from 'react-router-dom'
import {Provider} from 'react-redux'
import { mainRouter } from './routers';
import store from './store'
import * as Api from './api'
import Login from './views/Login'


React.Component.prototype.$Api = Api
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/app' render={routeProps=><App {...routeProps}></App>}></Route>
        {
          mainRouter.map(route=>{
            return <Route key={route.path} {...route}/>
          })
        }
        <Redirect exact from='/' to='/login'></Redirect>
        <Redirect to='/404'></Redirect>
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
