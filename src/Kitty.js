import React, { Component } from 'react';

const travers = (nodes, postfix) => {
  Array.from(nodes).forEach(($elm) => {
    if ($elm.nodeName === 'clipPath' && $elm.id) {
      $elm.id += postfix;
    } else if ($elm.getAttribute('clip-path')) {
      const clipPath = $elm.getAttribute('clip-path');
      const reg = /url\(#(.+)\)/;
      const res = reg.exec(clipPath);
      if (res[1]) {
        $elm.setAttribute('clip-path', `url(#${res[1]}${postfix})`);
      }
    } else {
      travers($elm.children, postfix);
    }
  });
};

const scopeSvg = (svg) => {
  const $svg = new DOMParser().parseFromString(svg, 'image/svg+xml').firstChild;
  const randomPostfix = Math.ceil(Math.random() * Date.now()).toString(16);
  travers($svg.children, randomPostfix);

  return $svg.outerHTML;
};

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
        const scopedSvg = scopeSvg(svg);
        localStorage.setItem(`kitty-${id}.svg`, scopedSvg);
        return scopedSvg;
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
    this.fetch(this.props.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.id !== newProps.id) {
      this.fetch(newProps.id);
    }
  }

  fetch = async (id) => {
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
        {/* <SVGInline svg={svg} /> */}
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
    );
  }
}

export default Kitty;
