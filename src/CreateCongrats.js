import React, { Component } from 'react';

import web3 from './web3';
import SkilledKitty from './SkilledKitty';
import { skilleXAbi, skilleXAddress } from './contracts';

class Congrats extends Component {
  state = { price: '', submited: false };

  startTeaching = async () => {
    const { skillId } = this.props.location.state;
    const { price } = this.state;

    const web3Instance = await web3;
    const [from] = await web3Instance.eth.getAccounts();
    const skilleX = new web3Instance.eth.Contract(skilleXAbi, skilleXAddress);
    const priceInWei = web3Instance.utils.toWei(price);
    const promise = skilleX.methods.offerTeach(skillId, priceInWei).send({ from });
    promise.on('transactionHash', () => this.setState({ submited: true }));
  };

  render() {
    const { kittyId, skillHash } = this.props.location.state;
    const { price, submited } = this.state;

    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-4 is-offset-4">
              <h1 className="title">Congrats!</h1>
              <div className="preview">
                <div className="label-description">
                  <p>Genesis meme</p>
                </div>
                <SkilledKitty kittyId={kittyId} skillHash={skillHash} />
              </div>
              {!submited ? (
                <React.Fragment>
                  <p className="label">Price</p>
                  <input
                    className="input is-large"
                    type="text"
                    placeholder="Text input"
                    value={price}
                    onChange={(e) => this.setState({ price: e.target.value })}
                  />
                  <a className={`button is-generate ${!price && 'disabled'}`} onClick={this.startTeaching}>
                    Start teaching
                  </a>
                </React.Fragment>
              ) : (
                <p>Teaching for {price} ETH</p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Congrats;
