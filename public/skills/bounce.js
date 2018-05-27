const run = ($container) => {
  const skillPrefix = `dance-skill-${Date.now().toString(16)}`;
  $container.classList.add(skillPrefix);
  $container.appendChild(getCanon());
  $container.appendChild(getStyles(skillPrefix));
};

const getCanon = () => {
  const $div = document.createElement('div');
  $div.classList.add('cannon');

  $div.innerHTML = `
    <div class="cannon__path cannon__path--sm cannon__path--angle-2">
      <div class="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
      <div class="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-1"></div>
      <div class="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-2"></div>
      <div class="cannon__confetti cannon__confetti--flake cannon__confetti--color-1"></div>
      <div class="cannon__confetti-spacer"></div>
    </div>
    <div class="cannon__path cannon__path--md cannon__path--angle-1">
      <div class="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-2"></div>
      <div class="cannon__confetti cannon__confetti--flake cannon__confetti--color-2"></div>
      <div class="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
      <div class="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-1"></div>
      <div class="cannon__confetti cannon__confetti--flake cannon__confetti--color-4"></div>
      <div class="cannon__confetti-spacer"></div>
    </div>
    <div class="cannon__path cannon__path--lg cannon__path--angle0">
      <div class="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-1"></div>
      <div class="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-4"></div>
      <div class="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-2"></div>
      <div class="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
      <div class="cannon__confetti-spacer"></div>
    </div>
    <div class="cannon__path cannon__path--md cannon__path--angle1">
      <div class="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
      <div class="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-1"></div>
      <div class="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-4"></div>
      <div class="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
      <div class="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-2"></div>
      <div class="cannon__confetti-spacer"></div>
    </div>
    <div class="cannon__path cannon__path--sm cannon__path--angle2">
      <div class="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-2"></div>
      <div class="cannon__confetti cannon__confetti--flake cannon__confetti--color-3"></div>
      <div class="cannon__confetti cannon__confetti--flake cannon__confetti--color-4"></div>
      <div class="cannon__confetti cannon__confetti--ribbon cannon__confetti--color-1"></div>
      <div class="cannon__confetti-spacer"></div>
    </div>
  `;
  return $div;
};

const getStyles = (prefix) => {
  const $style = document.createElement('style');
  $style.innerText = `
    .${prefix} .cannon {
      height: 100%;
      width: 3px;
      position: relative;
      transform-origin: 50% 50%;
      animation: ${prefix}-cannon-explosion 1.2s cubic-bezier(0.17, 0.67, 0.34, 0.92) both;
      animation-iteration-count: infinite;
      /* Paths */
      /* Confettis */
    }

    @keyframes ${prefix}-cannon-explosion {
      0% {
        transform: scale(0);
      }
      80% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    .${prefix} .cannon__path {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      transform-origin: 50% 100%;
      padding-bottom: 30%;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: space-around;
      align-items: center;
    }

    .${prefix} .cannon__path--lg {
      height: 100%;
    }

    .${prefix} .cannon__path--md {
      height: 95%;
    }

    .${prefix} .cannon__path--sm {
      height: 90%;
    }

    .${prefix} .cannon__path--angle-2 {
      transform: rotate(-30deg);
    }

    .${prefix} .cannon__path--angle-1 {
      transform: rotate(-15deg);
    }

    .${prefix} .cannon__path--angle1 {
      transform: rotate(15deg);
    }

    .${prefix} .cannon__path--angle2 {
      transform: rotate(30deg);
    }

    .${prefix} .cannon__confetti {
      flex: 0 1 auto;
      animation-duration: 1.2s;
      animation-timing-function: ease-out;
      animation-fill-mode: both;
      animation-iteration-count: infinite;
    }

    .${prefix} .cannon__confetti:nth-child(even) {
      animation-name: ${prefix}-confetti-rotate-l;
    }

    @keyframes ${prefix}-confetti-rotate-l {
      0% {
        transform: rotate(0) scaleY(1);
      }
      50% {
        transform: rotate(2turn) scaleY(1.5);
      }
      100% {
        transform: rotate(2.05turn) scaleY(1);
      }
    }

    .${prefix} .cannon__confetti:nth-child(odd) {
      animation-name: confetti-rotate-r;
    }



    @keyframes ${prefix}-confetti-rotate-r {
      0% {
        transform: rotate(0) scaleY(1);
      }
      50% {
        transform: rotate(-2turn) scaleY(1.5);
      }
      100% {
        transform: rotate(-2.05turn) scaleY(1);
      }
    }

    .${prefix} .cannon__confetti--ribbon {
      height: 2em;
      width: 1em;
      border-radius: 0.2em;
    }

    .${prefix} .cannon__confetti--flake {
      height: 1em;
      width: 1em;
      border-radius: 50%;
    }

    .${prefix} .cannon__confetti--color-1 {
      background-color: #feb535;
    }

    .${prefix} .cannon__confetti--color-2 {
      background-color: #bea4ff;
    }

    .${prefix} .cannon__confetti--color-3 {
      background-color: #ff6e83;
    }

    .${prefix} .cannon__confetti--color-4 {
      background-color: #58cafe;
    }

    .${prefix} .cannon {
      position: absolute;
      bottom: 5vh;
      left: 50%;
    }

    .${prefix} svg {
      z-index: 1;
      position: relative;
    }

    .${prefix} .dancingKitty {
      width: 100vw;
      height: 100vh;
      background-color: #cdf5d5;
    }

    .${prefix} .circle {
      position: absolute;
      bottom: 17%;
      left: 25%;
      width: 50%;
      height: 70px;
      background: #9ad8a5;
      border-radius: 50%;
      animation: ${prefix}-bouncingCircle 1s cubic-bezier(0.17, 0.67, 0.34, 0.92) infinite;
    }

    @keyframes ${prefix}-bouncingCircle {
      0% {
        transform: scale(0.97, 1) translateY(0);
      }
      50% {
        transform: scale(1.05, 1.05) translateY(-10px);
      }
      100% {
        transform: scale(0.97, 1) translateY(0);
      }
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
