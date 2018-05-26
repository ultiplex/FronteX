import React, { Component } from 'react';

import { Web3Context, IdentitiesContext } from './Context';
import Kitty from './Kitty';

class CreateSkill extends Component {
  ipfs = null;
  state = {
    ipfsLoaded: false,
    uploading: false,
    ipfsHash: '',
    isDropdownOpened: false,
    file: null,
    title: '',
    selectedKitty: null,
  };

  componentDidMount(props) {
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
          this.setState({ ipfsHash });
          console.log('ipfsHash', ipfsHash);
        })
        .catch((e) => console.error(e))
        .then(() => this.setState({ uploading: false }));
    };
    reader.readAsArrayBuffer(this.state.file);
  };

  selectKitty = (selectedKitty) => () => {
    this.setState({ selectedKitty });
  };

  render() {
    const { ipfsLoaded, uploading, ipfsHash, isDropdownOpened, file, title, selectedKitty } = this.state;
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
                                  <Kitty id={3} />
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
                    onInput={(e) => this.setState({ title: e.target.value })}
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
                    className={`button is-generate ${!file || !title || !selectedKitty ? 'disabled' : ''}`}
                    onClick={this.generate}
                  >
                    Generate skill
                  </a>
                </div>
              </div>
            </div>
          )}
        </Web3Context.Consumer>
      </section>
    );
  }
}

export default CreateSkill;
