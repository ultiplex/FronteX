import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import web3 from './web3';
import Kitty from './Kitty';
import Learning from './Learning';
import SkilledKitty from './SkilledKitty';
import { IdentitiesContext } from './Context';
import { skilleXAbi, skilleXAddress } from './contracts';

const KittyAddress = '0x373fbbb20551121e0a24a41d14c48b8ee0599d89';

class Learn extends Component {
  state = { isDropdownOpened: false, selectedKitty: null, offers: [], learning: false };

  componentDidMount() {
    this.getOffers();
  }

  getOffers = async () => {
    const web3Instance = await web3;
    const skilleX = new web3Instance.eth.Contract(skilleXAbi, skilleXAddress);

    const passEvents = await skilleX.getPastEvents('OfferCreated', { fromBlock: 0 });
    const offers = await Promise.all(
      passEvents.map(
        async ({ returnValues: { generation, offerId, price, skillId, skillName, teacherErc721, teacherTokenId } }) => {
          const skillHash = await skilleX.methods.getIpfsHash(skillId).call();
          return {
            generation,
            offerId,
            price,
            priceEth: web3Instance.utils.fromWei(price),
            skillId,
            skillHash,
            skillName,
            teacherErc721,
            teacherTokenId,
          };
        },
      ),
    );
    this.setState({ offers });
    const events = skilleX.events.OfferCreated({ fromBlock: 0, toBlock: 'latest' });
    events.on('data', (e, d) => {
      console.log('data', e, d);
    });
  };

  selectKitty = (selectedKitty) => () => {
    this.setState({ selectedKitty });
  };

  learn = async (offerId, price, ipfsHash) => {
    this.setState({ learning: true });
    const { selectedKitty } = this.state;
    const web3Instance = await web3;
    const [from] = await web3Instance.eth.getAccounts();
    const skilleX = new web3Instance.eth.Contract(skilleXAbi, skilleXAddress);
    const receipt = await skilleX.methods.learn(offerId, KittyAddress, selectedKitty).send({ from, value: price });

    const eventTransfer = receipt.events[0];
    this.props.history.push('/create-congrats', {
      kittyId: selectedKitty,
      skillHash: ipfsHash,
      skillId: parseInt(eventTransfer.raw.data, 16),
    });
  };

  render() {
    const { isDropdownOpened, selectedKitty, offers, learning } = this.state;

    if (learning) {
      return <Learning kittyId={selectedKitty} />;
    }

    return (
      <section className="section">
        <Link to="/create">Create a skill</Link>
        <div className="container">
          <div className="columns">
            <div className="column is-4 is-offset-4">
              <IdentitiesContext.Consumer>
                {(tokens) => (
                  <div
                    className={`dropdown ${isDropdownOpened && 'is-active'} ${tokens.length === 0 && 'disabled'}`}
                    onClick={() =>
                      this.setState(({ isDropdownOpened }) => ({
                        isDropdownOpened: tokens.length > 0 && !isDropdownOpened,
                      }))
                    }
                  >
                    <div className="dropdown-trigger">
                      <button className="button is-large" aria-haspopup="true" aria-controls="dropdown-menu3">
                        {selectedKitty ? (
                          <React.Fragment>
                            <div className="profile-picture">
                              <Kitty id={selectedKitty} />
                            </div>
                            <span>Kitty #{selectedKitty}</span>
                            <span className="icon is-small">
                              <i className="fas fa-angle-down" aria-hidden="true" />
                            </span>
                          </React.Fragment>
                        ) : (
                          <span>
                            {tokens.length > 0 ? (
                              <React.Fragment>
                                Select Kitty{' '}
                                <span className="icon is-small">
                                  <i className="fas fa-angle-down" aria-hidden="true" />
                                </span>
                              </React.Fragment>
                            ) : (
                              'No kitty found'
                            )}
                          </span>
                        )}
                      </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                      <div className="dropdown-content">
                        {tokens.map(({ token }) => (
                          <a className="dropdown-item" key={token} onClick={this.selectKitty(token)}>
                            Kitty #{token}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </IdentitiesContext.Consumer>
              {offers.map((offer) => (
                <Tile key={offer.offerId} {...offer} disabled={!selectedKitty} onClick={this.learn} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Learn;

const Tile = ({
  generation,
  offerId,
  price,
  priceEth,
  skillId,
  skillHash,
  skillName,
  teacherErc721,
  teacherTokenId,
  onClick,
  disabled,
}) => (
  <div className="tile is-parent">
    <article className="tile is-child">
      <figure className="skill-preview">
        <div className="label-description">
          <p>Genesis meme</p>
        </div>
        <SkilledKitty kittyId={teacherTokenId} skillHash={skillHash} />
      </figure>
      <figure className="skill-description">
        <p className="skill-name">{skillName}</p>
        <div className="columns">
          <div className="column">
            <p className="skilled-title">Kitty #{teacherTokenId}</p>
          </div>
          <div className="column">
            <p className="skilled-title">Generation</p>
            <p className="skilled-number">{generation}</p>
          </div>
        </div>
        <a
          className={`button is-generate ${disabled && 'disabled'}`}
          style={{ marginTop: 0 }}
          onClick={() => onClick(offerId, price, skillHash)}
        >
          Learn for {priceEth} ETH
        </a>
      </figure>
    </article>
  </div>
);
