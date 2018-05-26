import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import { Web3Context } from './Context';

class CreateSkill extends Component {
  ipfs = null;
  state = {
    ipfsLoaded: false,
    uploading: false,
    ipfsHash: '',
  };

  componentDidMount(props) {
    import('ipfs-api').then((Ipfs) => {
      this.ipfs = new Ipfs('ipfs.infura.io', { protocol: 'https', port: 5001 });
      this.setState({ ipfsLoaded: true });
    });
  }

  onDrop = ([file]) => {
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
    reader.readAsArrayBuffer(file);
  };

  render() {
    const { ipfsLoaded, uploading, ipfsHash } = this.state;
    return (
      <div>
        <p>CreateSkill</p>
        <Web3Context.Consumer>
          {({ available, unlock, account }) => (
            <React.Fragment>
              <p>
                available {JSON.stringify(available)} unlock {JSON.stringify(unlock)} address {JSON.stringify(account)}
              </p>
              {uploading && <p>uploading to ipfs</p>}
              {ipfsLoaded && <Dropzone onDrop={this.onDrop} multiple={false} disabled={!unlock || uploading} />}
              {!uploading &&
                ipfsHash && (
                  <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank">
                    ipfsHash
                  </a>
                )}
            </React.Fragment>
          )}
        </Web3Context.Consumer>
      </div>
    );
  }
}

export default CreateSkill;
