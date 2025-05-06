$(document).ready(function () {
  let message = [];

  $('#place-config').click(() => {
    selectLocal(message);
  });
});

function selectLocal(message) {
  const localIndex = $('#options').prop('selectedIndex');
  if (localIndex !== 3) {
    message.push($('#options').val());
    $('#place').addClass('d-none');
    $('#date').removeClass('d-none');
    formatDate();
    setDate(message);
  } else {
    $('#place').addClass('d-none');
    $('#outer').removeClass('d-none');
    outerOption(message);
  }
}

function outerOption(message) {
  $('#outer-config').click(() => {
    const outer = $('#outerPlace').val();
    if (outer === '') {
      $('#warningPlace').text('Campo vazio');
      setTimeout(() => {
        $('#warningPlace').text('');
      }, 2000);
    } else {
      message.push(outer);
      $('#outer').addClass('d-none');
      $('#date').removeClass('d-none');
      formatDate();
      setDate(message);
    }
  });
}

function formatDate() {
  flatpickr('#date-input', {
    dateFormat: 'd/m/Y',
    minDate: '17/05/2025'
  });
}

function setDate(message) {
  $('#date-config').click(() => {
    const date = $('#date-input').val();
    if (date === '') {
      $('#warningDate').text('Campo vazio');
      setTimeout(() => {
        $('#warningDate').text('');
      }, 2000);
    } else {
      message.push(date);
      $('#date').addClass('d-none');
      $('#time').removeClass('d-none');
      setTime(message);
    }
  });
}

function setTime(message) {
  $('#time-config').click(() => {
    const time = $('#time-input').val();
    if (time === '') {
      $('#warningTime').text('Campo vazio');
      setTimeout(() => {
        $('#warningTime').text('');
      }, 2000);
    } else {
      message.push(time);
      $('#time').addClass('d-none');
      $('#confirm').removeClass('d-none');
      infoConfirm(message);
    }
  });
}

function infoConfirm(message) {
  let counter = 5;
  $('#confirmPlace').text(`Local: ${message[0]}`);
  $('#confirmDate').text(`Data: ${message[1]}`);
  $('#confirmTime').text(`Horário: ${message[2]}`);

  $('#confirm-btn').click(function() {
    $(this).addClass('d-none');
    const interval = setInterval(() => {
      counter--;
      $('#confirmed').html(
        `<p>Pronto! Agora é só confirmar oficialmente... Vou fazer isso em ${counter} segundos :)<br>com a API do Whatsapp, porque fiquei com preguiça de construir a minha</p>`
      );
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      const URL = `https://wa.me/5516994307583?text=Olá,%20meu%20lindo.%20Gostaria%20de%20confirmar%20o%20encontro%20para:%20${message[0]};%20data:%20${message[1]};%20horário:%20${message[2]}`;
      window.location.href = URL;
    }, 5000);
  });
}
