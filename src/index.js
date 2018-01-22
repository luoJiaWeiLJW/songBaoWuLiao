
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route,hashHistory,IndexRedirect } from 'react-router';
// import {message} from 'antd';
import Affairs from './pages/Affairs';
import NotificationList from './pages/Affairs/NotificationList';
import Todo from './pages/Affairs/Todo';
import BomManage from './pages/BomManage';
import CreateMaterial from './pages/BomManage/CreateMaterial';
import MaterialDetail from './pages/BomManage/CreateMaterial/MaterialDetail';
import MaterialList from './pages/BomManage/CreateMaterial/MaterialList';
import ProductType from './pages/BomManage/CreateMaterial/ProductType'
import CreateBom from './pages/BomManage/CreateBom';
import BomChange from './pages/BomManage/BomChange';
import MaterialChange from './pages/BomManage/MaterialChange';
import Personnel from './pages/Personnel';
import List from './pages/Personnel/List';
import ManageSetting from './pages/Personnel/ManageSetting';
import Plan from './pages/Plan';
import PlanMonth from './pages/Plan/PlanMonth';
import PlanWeek from './pages/Plan/PlanWeek';
import PlanChange from './pages/Plan/PlanChange';
import Progress from './pages/Progress';
import Error from './pages/Progress/Error';
import Everyday from './pages/Progress/Everyday';
import History from './pages/Progress/History';
import Month from './pages/Progress/Month';
import Now from './pages/Progress/Now';
// import Loading from './pages/RawMaterial/Loading';
import Setting from './pages/Setting';
import Permission from './pages/Setting/Permission';
import Account from './pages/Setting/Account';
import Password from './pages/Setting/Password';
import Record from './pages/Setting/Record';
import Statistics from './pages/Statistics';
import One from './pages/Statistics/One';
import Two from './pages/Statistics/Two';
import Three from './pages/Statistics/Three';
import System from './pages/System';
import Menu from './pages/System/Menu';
import Attribute from './pages/System/Attribute';

import Production from './pages/Production';
import Management from './pages/Production/Management';
import Station from './pages/Production/Station';
import Maching from './pages/Production/Machining';
import Drawing from './pages/Production/Drawing';
import Device  from './pages/Production/Device';
import AddDrawing from './pages/Production/Drawing/AddDrawing';
import axios from 'axios';

//'/api'用于转发到gateway
axios.defaults.baseURL = '/';

ReactDOM.render((
       <Router history={hashHistory}>
          <Route path="/" component={App} key="23" >
              <IndexRedirect to="/Affairs/NotificationList"/>
              <Route path="Affairs" component={Affairs} >
                  <Route path="NotificationList" component={NotificationList}></Route>
                  <Route path="ToDo" component={Todo}></Route>
              </Route>
              <Route path="Progress" component={Progress}>
                  <Route path="Month" component={Month}></Route>
                  <Route path="Now" component={Now}></Route>
                  <Route path="Everyday" component={Everyday}></Route>
                  <Route path="History" component={History}></Route>
                  <Route path="Error" component={Error}></Route>
              </Route>
              <Route path="Plan" component={Plan}>
                  <Route path="PlanMonth" component={PlanMonth}></Route>
                  <Route path="PlanWeek" component={PlanWeek}></Route>
                  <Route path="PlanChange" component={PlanChange}></Route>
              </Route>
              <Route path="Statistics" component={Statistics}>
                  <Route path="One" component={One}></Route>
                  <Route path="Two" component={Two}></Route>
                  <Route path="Three" component={Three}></Route>
              </Route>
              <Route path="BomManage" component={BomManage}>
                  <Route path="CreateMaterial" component={CreateMaterial}>
                      <Route path="MaterialList" components={MaterialList}/>
                      <Route path="MaterialDetail/:code" components={MaterialDetail}/>
                      <Route path="ProductType" components={ProductType}/>
                  </Route>
                  <Route path="CreateBom" component={CreateBom}></Route>
                  <Route path="BomChange" component={BomChange}></Route>
                  <Route path="MaterialChange" component={MaterialChange}></Route>
              </Route>
              <Route path="Production" component={Production}>
                  <Route path="Management" component={Management}></Route>
                  <Route path="Station" component={Station}></Route>
                  <Route path="Maching" component={Maching}></Route>
                  <Route path="AddDrawing" component={AddDrawing}></Route>
                  <Route path="Drawing" component={Drawing}></Route>
                  <Route path="Device" component={Device}></Route>
              </Route>

              <Route path="Personnel" component={Personnel}>
                  <Route path="List" component={List}></Route>
                  <Route path="ManageSetting" component={ManageSetting}></Route>
              </Route>
              <Route path="Setting" component={Setting}>
                  <Route path="Permission" component={Permission}></Route>
                  <Route path="Account" component={Account}></Route>
                  <Route path="Password" component={Password}></Route>
                  <Route path="Record" component={Record}></Route>
              </Route>
              <Route path="System" component={System}>
                  <Route path="Menu" component={Menu}></Route>
                  <Route path="Attribute" component={Attribute}></Route>
              </Route>
          </Route>
      </Router>

), document.getElementById('root'));