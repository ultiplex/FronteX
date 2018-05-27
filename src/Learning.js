import React from 'react';

import Kitty from './Kitty';

const Learning = ({ kittyId }) => (
  <div className="container" style={{ paddingTop: '10rem' }}>
    <div className="columns">
      <div className="column is-4 is-offset-4" style={{ position: 'relative' }}>
        <img
          style={{ position: 'absolute', zIndex: 999, top: '-50px', left: '-50px', width: '40%', height: 'auto' }}
          src="img/learning-1.gif"
        />
        <img
          style={{ position: 'absolute', zIndex: 999, bottom: '-50px', left: '-50px', width: '30%', height: 'auto' }}
          src="img/learning-2.gif"
        />
        <img style={{ position: 'absolute', zIndex: 999, bottom: '-50px', right: '-50px' }} src="img/learning-3.gif" />
        <div className="preview">
          <Kitty id={kittyId} />
        </div>
      </div>
    </div>
  </div>
);

export default Learning;
