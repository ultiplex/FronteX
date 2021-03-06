import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import web3 from './web3';
import Home from './Home';
import Learn from './Learn';
import ShowSkill from './ShowSkill';
import CreateSkill from './CreateSkill';
import CreateCongrats from './CreateCongrats';
import { Web3Context, IdentitiesContext } from './Context';

const KittyAddress = '0x373fbbb20551121e0a24a41d14c48b8ee0599d89';

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
      `https://api.userfeeds.io/ranking/experimental_tokens;identity=${account.toLowerCase()};asset=kovan:${KittyAddress}/`,
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
          {/* <BrowserRouter basename="/"> */}
          <BrowserRouter basename="/FronteX">
            <div>
              <Route path="/" exact component={Learn} />
              <Route path="/create" component={CreateSkill} />
              <Route path="/create-congrats" component={CreateCongrats} />
              <Route path="/show/:kittyId/:skillHash" component={ShowSkill} />
            </div>
          </BrowserRouter>
        </IdentitiesContext.Provider>
      </Web3Context.Provider>
    );
  }
}

export default App;
