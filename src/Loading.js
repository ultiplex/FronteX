import React from 'react';

const Loading = ({ message }) => (
  <div className="container" style={{ paddingTop: '10rem' }}>
    <div className="columns">
      <div className="column is-4 is-offset-4">
        <img src="img/generating.gif" />
        <div className="description">
          <p className="IPFS">{message}</p>
          <p className="ERC721">{message}</p>
        </div>
      </div>
    </div>
  </div>
);

export default Loading;
