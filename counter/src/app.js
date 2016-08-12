import xs from 'xstream';
import { div, button, h1, span } from '@cycle/dom';

const app = ({ DOM, Keys, Time }) => {
  const action$ = xs.merge(
    DOM.select('.increment').events('click').mapTo(1),
    DOM.select('.decrement').events('click').mapTo(-1),
    // Decrement by 5 every time the left arrow is pressed.
    // Keys.down('left').mapTo(-5),
    // Increment by 5 every time the right arrow is pressed.
    // Keys.down('right').mapTo(5),
    // Increment by 10 every second.
    // Time.mapTo(10),
  );

  const count$ = action$.fold((counter, delta) => counter + delta, 0);
  const vdom$ = count$
  .map(count =>
    div([
      h1('Counter Demo'),
      div([
        span('Value:'),
        span('.counter', String(count)),
      ]),
      div('.controls', [
        button('.increment', '+'),
        button('.decrement', '-'),
      ]),
    ]),
  );
  return {
    DOM: vdom$,
  };
};

export default app;
