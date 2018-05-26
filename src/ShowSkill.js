import React, { Component } from 'react';

import Kitty from './Kitty';

class ShowSkill extends Component {
  kittyRef = null;
  state = {
    skillLoading: false,
    skillLoadingError: null,
  };

  componentDidMount() {
    this.fetchAndRunSkill();
  }

  fetchAndRunSkill = async () => {
    const { skillHash } = this.props.match.params;
    try {
      this.setState({ skillLoading: true });
      const skill = await fetch(`https://ipfs.io/ipfs/${skillHash}`).then((res) => res.text());
      eval(`${skill}; window['skill${skillHash}'] = run`);
      window[`skill${skillHash}`](this.kittyRef.ref);
      this.setState({ skillLoading: false });
    } catch (e) {
      this.setState({ skillLoadingError: true });
    }
  };

  onKittyRef = (kittyRef) => {
    this.kittyRef = kittyRef;
  };

  render() {
    const { kittyId } = this.props.match.params;
    const { skillLoading } = this.state;
    return (
      <div>
        <p>ShowSkill</p>
        {skillLoading && <p>Loading skill from ipfs...</p>}
        <Kitty id={kittyId} style={{ width: '300px' }} ref={this.onKittyRef} />
      </div>
    );
  }
}

export default ShowSkill;
