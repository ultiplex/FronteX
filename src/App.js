import React, { Component } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

import web3 from './web3';
import Home from './Home';
import CreateSkill from './CreateSkill';
import { Web3Context } from './Context';
import './App.css';

class App extends Component {
  state = {
    web3State: { available: false, unlock: false, account: null },
  };

  componentDidMount() {
    this.observeWeb3();
  }

  observeWeb3 = async () => {
    const web3Instance = await web3;
    const available = web3Instance.currentProvider !== null;
    const [account] = !available ? [] : await web3Instance.eth.getAccounts();
    const unlock = !!account;
    this.setState({ web3State: { available, account, unlock } });
    setTimeout(this.observeWeb3, 5000);
  };

  render() {
    const { web3State } = this.state;
    return (
      <Web3Context.Provider value={web3State}>
        <HashRouter>
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/create" exacat component={CreateSkill} />
          </div>
        </HashRouter>
      </Web3Context.Provider>
    );
  }
}

export default App;
