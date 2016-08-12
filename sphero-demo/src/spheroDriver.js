/* global io */
import xs from 'xstream';

export const makeSpheroDriver = () => {
  const socket = io();

  function spheroDriver(color$) {
    color$.addListener({
      next: color => {
        socket.emit('color', color);
      },
      error: () => {},
      complete: () => {},
    });

    return xs.create({
      start: listener => {
        socket.on('collision', () => {
          listener.next('bang');
        });
      },
      stop: () => {},
    });
  }

  return spheroDriver;
};
