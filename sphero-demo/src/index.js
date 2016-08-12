import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { div, br, h1, input, label, makeDOMDriver } from '@cycle/dom';
import { makeSpheroDriver } from './spheroDriver';
import getRandomColor from './getRandomColor';

const main = ({ DOM, Sphero }) => {
  const color$ = xs.merge(
    DOM.select('.color').events('input').map(ev => ev.target.value),
    Sphero.map(() => getRandomColor()),
  ).startWith('#ff0000');

  const vdom$ = color$
  .map(color =>
    div([
      h1('Sphero Demo'),
      label([
        'Color:',
        input('.color', {
          attrs: { type: 'text', value: color },
          hook: {
            update: (old, { elm }) => {
              elm.value = color;
            },
          },
        }),
      ]),
      br(),
      div({
        style: {
          margin: '10px',
          width: '300px',
          height: '300px',
          backgroundColor: color,
        },
      }),
    ]),
  );
  return {
    DOM: vdom$,
    Sphero: color$,
  };
};

const drivers = {
  DOM: makeDOMDriver('#app'),
  Sphero: makeSpheroDriver(),
};

run(main, drivers);
