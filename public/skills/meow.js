const run = ($container) => {
  const $script = document.createElement('script');
  $script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pizzicato/0.6.1/Pizzicato.min.js';

  let loaded = false;
  $script.onload = () => {
    loaded = true;
  };
  $container.appendChild($script);

  const $speaker = document.createElement('div');
  $speaker.innerHTML = '🔊';
  $speaker.style.cursor = 'pointer';
  $speaker.style.fontSize = '40px';
  $speaker.style.position = 'absolute';
  $speaker.style.bottom = '0';
  $speaker.style.right = '0';

  $container.appendChild($speaker);

  $speaker.addEventListener('click', () => {
    if (!loaded) {
      console.log('Lib not loaded yet');
    }

    var meow = new Pizzicato.Sound('https://raw.githubusercontent.com/patrykadas/FAQ-LE/master/meow.wav', function() {
      // Sound loaded!
      var flanger = new Pizzicato.Effects.Flanger({
        time: 1,
        speed: 0.1,
        depth: 0.2,
        feedback: 0.01,
        mix: 1,
      });

      var reverb = new Pizzicato.Effects.Reverb({
        time: 0.9,
        decay: 0.01,
        reverse: false,
        mix: 0.5,
      });
      meow.addEffect(reverb);
      meow.addEffect(flanger);
      meow.play();
    });
  });
};
