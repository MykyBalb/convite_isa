$(document).ready(() => {
  $('#reload').submit(function (e) {
    e.preventDefault();
    const response = $('#inputReject').val();
    if (response === '') {
      $('#warningResponse').text('Campo vazio');
      setTimeout(() => {
        $('#warningResponse').text('');
      }, 2000);
    } else {
      redirect(response);
    }
  });
});

const redirect = (message) => {
  counter = 4;
  $('#reload').addClass('d-none');

  const interval = setInterval(() => {
    counter--;
    $('#reject').html(
      `<p>Calma aí ${counter} segundos<br>Tô com a API do Whatsapp, porque fiquei com preguiça de construir a minha</p>`
    );
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    const URL = `https://wa.me/5516994307583?text=Você%20é%20muito%20perfeito,%20mas%20não%20quero%20sair%20contigo%20pq%20${message}.%0AMas%20também%20porque%20eu%20estou%20confusa%20e%20quero%20focar%20nos%20meus%20estudos,%20sabe%3F`;
    window.location.href = URL;
  }, 3000);
};
