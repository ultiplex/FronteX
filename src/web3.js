const setProvider = (web3) => {
  if (window.web3) {
    web3.setProvider(window.web3.currentProvider);
  }
};

const web3 = import('web3').then(
  (Web3) =>
    new Promise((resolve) => {
      const web3 = new Web3();
      if (document.readyState === 'complete') {
        setProvider(web3);
        resolve(web3);
      } else {
        window.addEventListener('load', () => {
          setProvider(web3);
          resolve(web3);
        });
      }
    }),
);

export default web3;
