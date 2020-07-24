import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import store from './reducers/store';
import './App.scss';
import { toggleDropDown } from './reducers/drop-down/drop-down.reducer';
import { checkUser } from './reducers/user/user.actions';
import Header from './shared/header/header';
import Loading from './shared/elements/loading/loading';


const Home = lazy(() => import('./containers/home/home'));

const Register = lazy(() => import('./containers/registration/registration'));
const Signin = lazy(() => import('./containers/registration/signin'));
const Signout = lazy(() => import('./containers/registration/signout'));

const DepartmentContainer = lazy(() => import('./containers/process/department-container'));
const SingleObjectiveContainer = lazy(() => import('./containers/process/single-objective-container'));
const SingleStepContainer = lazy(() => import('./containers/process/single-step-container'));

const EmployeeContainer = lazy(() => import('./containers/schedule/employee-container'));
const ScheduleDayContainer = lazy(() => import('./containers/schedule/schedule-day-container'));
const ScheduleContainer = lazy(() => import('./containers/schedule/schedule-container'));



const App = (props) => {
  const [authValue, setAuthValue] = useState(props.isAuthenticated);

  useEffect(() => {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('id');
    if (!props.isAuthenticated) {
      props.checkUser(userId, token);
    }
    setAuthValue(props.isAuthenticated)
  }, [props]);

  const checkDropDown = () => {
    if (!store.getState().dropDown.hidden) {
      props.toggleDropDown();
    }
  }

  return (
    <div id="page" onClick={checkDropDown}>
      <Header />
      <div>
        {authValue ?
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path='/' component={ScheduleContainer} />
              <Route exact path='/signout' component={Signout} />

              <Route exact path='/departments' component={DepartmentContainer} />
              <Route path='/objective/:deptName/:objectiveName' component={SingleObjectiveContainer} />
              <Route path='/step/:deptName/:objectiveName/:stepNumber' component={SingleStepContainer} />

              <Route exact path='/employees' component={EmployeeContainer} />
              <Route exact path='/schedule' component={ScheduleContainer} />
              <Route path='/schedule/:employeeId' component={ScheduleContainer} />
              <Route exact path='/day/:month/:day/:year' component={ScheduleDayContainer} />
              <Route path='/day/:employeeId/:month/:day/:year' component={ScheduleDayContainer} />
            </Switch>
          </Suspense>
          :
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/signin' component={Signin} />
            </Switch>
          </Suspense>
        }
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    checkUser: (userId, token) => dispatch(checkUser(userId, token)),
    toggleDropDown: () => dispatch(toggleDropDown())
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
