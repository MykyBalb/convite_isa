$(document).ready(function () {
  const $btnFail = $('#btn-fail');
  const $btnSuccess = $('#btn-success');
  const $imgGif = $('#img-gif');
  const maxScale = 5;
  let fatorScale = 1;

  $btnFail.click(() => {
    randomButton();
    growButton();
  });

  $btnSuccess.click(() => {
    redirect();
  });

  function randomButton() {
    const maxX = $(window).width() - $btnFail.outerWidth();
    const maxY = $(window).height() - $btnFail.outerHeight();

    const randomX = getRandom(0, maxX);
    const randomY = getRandom(0, maxY);

    $btnFail.css({
      transition: 'transform 0.2s',
      position: 'absolute',
      left: randomX + 'px',
      top: randomY + 'px',
    });
  }

  function growButton() {
    if (fatorScale < maxScale) {
      changeGif('resources/gif/sad.gif', 'resources/gif/cute.gif', 800);
      fatorScale += 1;
      $btnSuccess.css('transform', `scale(${fatorScale})`);
    } else if (fatorScale === maxScale) {
      popUp();
      fatorScale = 1;
    }
  }

  function changeGif(initialSrc, finalSrc, delay) {
    $imgGif.attr('src', initialSrc);
    setTimeout(() => {
      $imgGif.attr('src', finalSrc);
    }, delay);
  }

  function popUp() {
    reset();
    $('.scale').css('transform', 'translateY(-50%) translateX(-50%) scale(1)');
    rejectedOptions();
    acceptedOptions();
  }

  function reset() {
    $btnSuccess.css({
      transform: 'scale(1)',
      transition: 'transform 0.2s',
    });
    $btnFail.css({
      position: 'relative',
      left: '0',
      top: '0',
      transition: 'transform 0.2s',
    });
  }

  function rejectedOptions() {
    const opcoes = [
      'Nem um jantar?',
      'Nem um passeio?',
      'Nem um sorvete?',
      'Nem um café?',
      'Nem um piquenique?',
      'Nem um cinema?'
    ];
    let count = [];
    let counter = 6;

    $('#rejected').click(() => {
      let randomIndex = getUniqueIndex(opcoes.length, count);
      count.push(randomIndex);
      $('#option-two').text(opcoes[randomIndex]);

      if (count.length === opcoes.length) {
        endOptions(counter);
      }
    });
  }

  function acceptedOptions() {
    $('#accepted').click(() => {
      $('#option-two').text('Tá bom, vamos de novo...');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }

  function getUniqueIndex(max, usedIndexes) {
    let index;
    do {
      index = Math.floor(Math.random() * max);
    } while (usedIndexes.includes(index));
    return index;
  }

  function endOptions(initialCounter) {
    $('#rejected, #accepted').fadeOut();
    let counter = initialCounter;

    const interval = setInterval(() => {
      counter--;
      $('#option-two').text(
        `Você não quer nada? Tudo bem, eu entendo. Você será redirecionada em ${counter} segundos :(`
      );
    }, 1000);
    
    setTimeout(() => {
      clearInterval(interval);
      window.location.href = 'html/reject.html';
    }, 5000);
  }

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function redirect() {
    let counter = 6;
    $('#section').addClass('d-none');
    $('#divAccepted').removeClass('d-none');
    const interval = setInterval(() => {
      counter--;
      $('#option').text(
        `Você aceitou o convite! Vamos combinar melhor em ${counter} segundos :)`
      );
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      window.location.href = 'html/accept.html';
    }, 5000);
  }
});
