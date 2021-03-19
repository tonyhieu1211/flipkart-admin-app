import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './containers/Home';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, isUserLoggedIn } from './actions';
import Categories from './containers/Categories';
import { getInitialData } from './actions/initialData.action';
import NewPage from './containers/NewPage';

function App() {

  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();
  //make token,state to global
   useEffect(() => {
      if(!auth.authenticated){
        dispatch(isUserLoggedIn());
      }
      if(auth.authenticated){
        dispatch(getInitialData());
      } 
      
   }, [auth.authenticated]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/page" component={NewPage} />
          <PrivateRoute path="/categories" component={Categories} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/orders" component={Orders} />
          

          <Route path="/sign-in" component={Signin} />
          <Route path="/sign-up" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
