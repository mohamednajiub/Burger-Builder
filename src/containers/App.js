import React, { Component } from 'react';
import './App.css';
import Layout from '../hoc/Layout/Layout'
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import { Route } from 'react-router-dom';
import Orders from './Orders/Orders';
import Auth from './Auth/Auth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/auth" component={Auth}/>
        </Layout>
      </div>
    );
  }
}

export default App;
