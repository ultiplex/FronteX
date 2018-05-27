import React, { Component } from 'react';

import SkilledKitty from './SkilledKitty';

class ShowSkill extends Component {
  render() {
    const { kittyId, skillHash } = this.props.match.params;
    return <SkilledKitty kittyId={kittyId} skillHash={skillHash} />;
  }
}

export default ShowSkill;
