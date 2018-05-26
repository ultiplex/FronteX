import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import web3 from './web3';
import Home from './Home';
import CreateSkill from './CreateSkill';
import ShowSkill from './ShowSkill';
import { Web3Context, IdentitiesContext } from './Context';

class App extends Component {
  state = {
    web3State: { available: false, unlock: false, account: null },
    tokens: [],
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
    if (account) {
      this.getIdentities(account);
    }
    setTimeout(this.observeWeb3, 5000);
  };

  getIdentities = async (account) => {
    fetch(
      `https://api.userfeeds.io/ranking/experimental_tokens;identity=${account.toLowerCase()};asset=kovan:0x373fbbb20551121e0a24a41d14c48b8ee0599d89/`,
    )
      .then((res) => res.json())
      .then((d) => {
        this.setState({ tokens: d.items });
      });
  };

  render() {
    const { web3State, tokens } = this.state;
    return (
      <Web3Context.Provider value={web3State}>
        <IdentitiesContext.Provider value={tokens}>
          <HashRouter>
            <div>
              <Route path="/" exact component={Home} />
              <Route path="/create" exacat component={CreateSkill} />
              <Route path="/show/:kittyId/:skillHash" exacat component={ShowSkill} />
            </div>
          </HashRouter>
        </IdentitiesContext.Provider>
      </Web3Context.Provider>
    );
  }
}

export default App;
