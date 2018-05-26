import React, { Component } from 'react';

const kittyRequests = new Map();
const getKittySvg = (id) => {
  if (kittyRequests.has(id)) {
    return kittyRequests.get(id);
  }

  let promise;
  const item = localStorage.getItem(`kitty-${id}.svg`);
  if (item) {
    promise = Promise.resolve(item);
  } else {
    promise = fetch(`https://api.cryptokitties.co/kitties/${id}`)
      .then((res) => res.json())
      .then((kitty) => fetch(`https://cors-anywhere.herokuapp.com/${kitty.image_url_cdn}`))
      .then((res) => res.text())
      .then((svg) => {
        localStorage.setItem(`kitty-${id}.svg`, svg);
        return svg;
      });
  }
  kittyRequests.set(id, promise);
  return promise;
};

class Kitty extends Component {
  state = {
    svg: '',
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    const { id } = this.props;
    getKittySvg(id).then((svg) => {
      this.setState({ svg });
    });
  };

  onRef = (ref) => {
    this.ref = ref;
  };

  render() {
    const { className, style } = this.props;
    const { svg } = this.state;
    return (
      <div ref={this.onRef} className={className} style={{ position: 'relative', ...style }}>
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
    );
  }
}

export default Kitty;