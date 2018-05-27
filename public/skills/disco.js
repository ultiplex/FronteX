const run = ($container) => {
  const skillPrefix = `dance-skill-${Date.now().toString(16)}`;
  $container.classList.add(skillPrefix);
  $container.appendChild(getDiscoBall());
  $container.appendChild(getStyles(skillPrefix));
};

const getDiscoBall = () => {
  const $div = document.createElement('div');
  $div.classList.add('cannon');

  $div.innerHTML = `

  `;
  return $div;
};

const getStyles = (prefix) => {
  const $style = document.createElement('style');
  $style.innerText = `
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
      animation: ${prefix}-bouncingEyes 1s cubic-bezier(0.17, 0.67, 0.34, 0.92) infinite;
    }

    .${prefix} #mouth {
      transform-origin: 50% 50%;
      animation: ${prefix}-bouncingMouth 1s cubic-bezier(0.17, 0.67, 0.34, 0.92) infinite;
    }

    .${prefix} #body,
    #bodyFur,
    #highlight,
    #shadow {
      transform-origin: 0% 50%;
      animation: ${prefix}-bouncingBody 1s cubic-bezier(0.17, 0.67, 0.34, 0.92) infinite;
    }

    .${prefix} #tail,
    #tailFur,
    #tailShadow {
      animation: ${prefix}-bouncingTail 1s cubic-bezier(0.17, 0.67, 0.34, 0.92) infinite;
    }
  `;

  return $style;
};
