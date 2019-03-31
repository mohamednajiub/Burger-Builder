import React, { Component } from 'react';
import './App.css';
import Layout from '../hoc/Layout/Layout'
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" exact component={Checkout}/>
        </Layout>
      </div>
    );
  }
}

export default App;
