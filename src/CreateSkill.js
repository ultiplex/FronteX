import React, { Component } from 'react';

import web3 from './web3';
import Kitty from './Kitty';
import Loading from './Loading';
import { Web3Context, IdentitiesContext } from './Context';
import { skilleXAbi, skilleXAddress } from './contracts';

const KittyAddress = '0x373fbbb20551121e0a24a41d14c48b8ee0599d89';

class CreateSkill extends Component {
  ipfs = null;
  state = {
    ipfsLoaded: false,
    uploading: false,
    transaction: false,
    isDropdownOpened: false,
    file: null,
    title: '',
    selectedKitty: null,
  };

  componentDidMount() {
    import('ipfs-api').then((Ipfs) => {
      this.ipfs = new Ipfs('ipfs.infura.io', { protocol: 'https', port: 5001 });
      this.setState({ ipfsLoaded: true });
    });
  }

  onFile = (event) => {
    const [file] = event.target.files;
    this.setState({ file });
  };

  generate = () => {
    this.setState({ uploading: true });
    const reader = new FileReader();
    reader.onload = () => {
      this.ipfs.files
        .add(Buffer.from(reader.result))
        .then(([{ hash: ipfsHash }]) => {
          console.log('ipfsHash', ipfsHash);
          this.setState({ ipfsHash });
          this.registerSkill(ipfsHash);
        })
        .catch((e) => console.error(e))
        .then(() => this.setState({ uploading: false }));
    };
    reader.readAsArrayBuffer(this.state.file);
  };

  registerSkill = async (ipfsHash) => {
    this.setState({ transaction: true });
    const { title, selectedKitty } = this.state;
    const web3Instance = await web3;
    const [from] = await web3Instance.eth.getAccounts();
    const skilleX = new web3Instance.eth.Contract(skilleXAbi, skilleXAddress);
    const receipt = await skilleX.methods.createSkill(title, ipfsHash, KittyAddress, selectedKitty).send({ from });

    const eventTransfer = receipt.events[0];
    this.props.history.push('/create-congrats', {
      kittyId: selectedKitty,
      skillHash: ipfsHash,
      skillId: parseInt(eventTransfer.raw.data, 16),
    });
  };

  selectKitty = (selectedKitty) => () => {
    this.setState({ selectedKitty });
  };

  render() {
    const { ipfsLoaded, uploading, transaction, ipfsHash, isDropdownOpened, file, title, selectedKitty } = this.state;

    if (uploading) {
      return <Loading message="Uploading on IPFS" />;
    }

    if (transaction) {
      return <Loading message="Generating ERC721" />;
    }

    return (
      <section className="section">
        <Web3Context.Consumer>
          {({ available, unlock, account }) => (
            <div className="container">
              <div className="columns">
                <div className="column is-4 is-offset-4">
                  <h1 className="title">Add a skill</h1>
                  <p className="label">Avatar</p>
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
                  <p className="label">Title</p>
                  <input
                    className="input is-large"
                    type="text"
                    placeholder="Text input"
                    value={title}
                    onChange={(e) => this.setState({ title: e.target.value })}
                  />

                  <p className="label">Files</p>
                  <div className="file is-boxed">
                    <label className="file-label">
                      <input className="file-input" type="file" onChange={this.onFile} />
                      <span className="file-cta">
                        {!file && (
                          <span className="file-icon">
                            <img src="img/upload.svg" />
                          </span>
                        )}
                        <span className="file-label">{file ? file.name : 'Upload files!'}</span>
                      </span>
                    </label>
                  </div>
                  <a
                    className={`button is-generate ${
                      !file || !title || !selectedKitty || !ipfsLoaded ? 'disabled' : ''
                    }`}
                    onClick={this.generate}
                  >
                    Generate skill
                  </a>
                </div>
              </div>
            </div>
          )}
        </Web3Context.Consumer>
        {!ipfsLoaded && <span>Loading ipfs lib</span>}
      </section>
    );
  }
}

export default CreateSkill;
