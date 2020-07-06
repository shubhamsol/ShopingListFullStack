import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavBar from './components/AppNavBar'
import React, { Component } from 'react';
import ShopingList from './components/ShopingList'
import ItemModel from './components/itemModal'
import { Container } from 'reactstrap'

import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar />
          <Container>
            <ItemModel />
            <ShopingList />
          </Container>

        </div>
      </Provider>

    )
  }
}

export default App;