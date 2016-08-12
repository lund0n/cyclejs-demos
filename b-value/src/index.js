import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { div, h1, input, makeDOMDriver } from '@cycle/dom';

const main = ({ DOM, Time }) => {
  // A stream that increments by 1, every second.
  const a$ = Time;

  // A stream that uses the range input element for input.
  // To use this stream:
  // 1. comment out the definition of a$ above
  // 2. uncomment this definition, along with the later operators.
  // 3. uncomment the range input below.
  // const a$ = DOM.select('.a').events('input')
  //   .map(ev => ev.target.value)
  //   .startWith(5);
  const b$ = a$.map(a => a * 5);

  const vdom$ = xs.combine(a$, b$)
  .map(([a, b]) =>
    div([
      h1('What is B?'),
      // input('.a', { attrs: { type: 'range', min: 1, max: 10 } }),
      div(`A is ${a}`),
      div(`B is ${b}`),
    ]),
  );
  return {
    DOM: vdom$,
  };
};

const drivers = {
  DOM: makeDOMDriver('#app'),
  Time: () => xs.periodic(1000), // a simple time driver
};

run(main, drivers);
