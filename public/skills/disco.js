const run = ($container) => {
  const skillPrefix = `dance-skill-${Math.ceil(Math.random() * Date.now()).toString(16)}`;
  $container.classList.add(skillPrefix);
  $container.appendChild(getDiscoBall());
  $container.appendChild(getStyles(skillPrefix));
};

const getDiscoBall = () => {
  const $img = document.createElement('img');
  $img.classList.add('disco');
  $img.src = 'https://ipfs.io/ipfs/QmeM9zPCC5FUqbn6iVqH1RTvHpzgyXrGHAz4n2zHJqGijP';

  return $img;
};

const getStyles = (prefix) => {
  const $style = document.createElement('style');
  const transitionTime = '0.3s';
  const transitionFunction = 'cubic-bezier(0.1, 0.9, 0.3, 0.8)';

  $style.innerText = `
    .${prefix} .disco {
      width: 20%;
      height: 20%;
      position: absolute;
      top: 0;
      left: 40%;
    }

    .${prefix} svg {
      z-index: 1;
      position: relative;
    }

    @keyframes ${prefix}-bouncingTail {
      0% {
        transform: rotateX(0);
      }
      50% {
        transform: rotateX(10deg);
      }
      100% {
        transform: rotateX(0);
      }
    }

    @keyframes ${prefix}-bouncingMouth {
      0% {
        transform: rotate(-3deg);
      }
      50% {
        transform: rotate(3deg);
      }
      100% {
        transform: rotate(-3deg);
      }
    }

    @keyframes ${prefix}-bouncingEyes {
      0% {
        transform: translateY(-20px);
      }
      50% {
        transform: translateY(20px);
      }
      100% {
        transform: translateY(-20px);
      }
    }

    @keyframes ${prefix}-bouncingBody {
      0% {
        transform: scale(1, 1);
      }
      50% {
        transform: scale(1, 0.93);
      }
      100% {
        transform: scale(1);
      }
    }

    .${prefix} #eye {
      animation: ${prefix}-bouncingEyes ${transitionTime} ${transitionFunction} infinite;
    }

    .${prefix} #mouth {
      transform-origin: 50% 50%;
      animation: ${prefix}-bouncingMouth ${transitionTime} ${transitionFunction} infinite;
    }

    .${prefix} #body,
    .${prefix} #bodyFur,
    .${prefix} #highlight,
    .${prefix} #shadow {
      transform-origin: 0% 50%;
      animation: ${prefix}-bouncingBody ${transitionTime} ${transitionFunction} infinite;
    }

    .${prefix} #tail,
    .${prefix} #tailFur,
    .${prefix} #tailShadow {
      animation: ${prefix}-bouncingTail ${transitionTime} ${transitionFunction} infinite;
    }
  `;

  return $style;
};
