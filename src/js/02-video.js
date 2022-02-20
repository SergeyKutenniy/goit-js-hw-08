// Воспроизвидение видео с того момента с которого остановилось (сохранение паузы в localStorage)

const iframe = document.querySelector('iframe');

const player = new Vimeo.Player(iframe); // инициализация плеера

import throttle from 'lodash.throttle'; // отслеживание текущего времени воспроизвидения каждую 1с.

const currentTime = 'videoplayer-current-time'; // переменная хранения текущего времени в localStorage

const key = localStorage.getItem(currentTime); // сохраняем текущее время в localStorage

if (key) {
  player.setCurrentTime(key); // получаем значение текущего времени
}

player.on(
  'timeupdate',
  throttle(data => {
    localStorage.setItem(currentTime, data.seconds.toString());
  }, 1000),
);
